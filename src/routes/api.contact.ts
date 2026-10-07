import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

// Falls back to the current ZahTech inbox; overridden by CONTACT_TO_EMAIL.
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "contact@zahtech.net";

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  company: z.string().trim().max(200).optional().default(""),
  stage: z.string().trim().max(100).optional().default(""),
  additional: z.string().trim().max(2000).optional().default(""),
  services: z.string().trim().max(500).optional().default(""),
  budget: z.string().trim().max(100).optional().default(""),
  timeline: z.string().trim().max(100).optional().default(""),
  description: z.string().trim().min(1).max(5000),
  // Honeypot: real users never see or fill this field.
  website: z.string().optional().default(""),
});

const esc = (v: string) =>
  v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const oneLine = (v: string) => v.replace(/[\r\n]+/g, " ");

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let raw: unknown;
        try {
          raw = await request.json();
        } catch {
          return json({ ok: false, error: "Invalid request body" }, 400);
        }

        const parsed = schema.safeParse(raw);
        if (!parsed.success) {
          return json({ ok: false, error: "Please check the form fields and try again." }, 400);
        }
        const d = parsed.data;

        // Bots fill the honeypot; pretend success so they don't retry.
        if (d.website) return json({ ok: true });

        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
          console.error("[contact] RESEND_API_KEY is not set");
          return json({ ok: false, error: "Email service is not configured." }, 500);
        }

        const from = process.env.CONTACT_FROM_EMAIL;
        if (!from) {
          console.error("[contact] CONTACT_FROM_EMAIL is not set");
          return json({ ok: false, error: "Email service is not configured." }, 500);
        }
        const rows: [string, string][] = [
          ["Name", d.name],
          ["Email", d.email],
          ...(d.company ? [["Company", d.company] as [string, string]] : []),
          ...(d.stage ? [["Project stage", d.stage] as [string, string]] : []),
          ["Services", d.services || "-"],
          ["Budget", d.budget || "-"],
          ["Timeline", d.timeline || "-"],
        ];

        const html = `
<div style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;max-width:600px;margin:0 auto;color:#0a0a0a;background:#f5f2eb">
  <div style="background:#0a0a0a;padding:20px 24px;border-radius:12px 12px 0 0">
    <h1 style="margin:0;font-size:18px;color:#f5f2eb">New project inquiry <span style="color:#ff5a36">&bull;</span> ZahTech</h1>
  </div>
  <div style="border:1px solid #d5d0c6;border-top:0;border-radius:0 0 12px 12px;padding:24px;background:#fffdf8">
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:8px 12px 8px 0;color:#625e57;width:110px;vertical-align:top">${k}</td><td style="padding:8px 0;font-weight:500">${esc(v)}</td></tr>`,
        )
        .join("")}
    </table>
    <h2 style="font-size:13px;text-transform:uppercase;letter-spacing:.08em;color:#625e57;margin:20px 0 8px">Project description</h2>
    <p style="margin:0;font-size:14px;line-height:1.6;white-space:pre-wrap">${esc(d.description)}</p>
    ${d.additional ? `<h2 style="font-size:13px;margin:20px 0 8px">Additional details</h2><p style="white-space:pre-wrap">${esc(d.additional)}</p>` : ""}
    <p style="margin:24px 0 0;font-size:12px;color:#625e57">Reply to this email to respond directly to ${esc(d.name)}.</p>
  </div>
</div>`;

        const text =
          rows.map(([k, v]) => `${k}: ${v}`).join("\n") +
          `\n\nProject description:\n${d.description}\n` +
          (d.additional ? `\nAdditional details:\n${d.additional}\n` : "");

        try {
          const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
            body: JSON.stringify({
              from,
              to: [TO_EMAIL],
              reply_to: d.email,
              subject: `New project inquiry from ${oneLine(d.name)}`,
              html,
              text,
            }),
          });
          if (!res.ok) {
            console.error("[contact] Resend error", res.status, await res.text());
            return json({ ok: false, error: "Could not send your message." }, 502);
          }
          return json({ ok: true });
        } catch (err) {
          console.error("[contact] Resend request failed", err);
          return json({ ok: false, error: "Could not send your message." }, 502);
        }
      },
    },
  },
});
