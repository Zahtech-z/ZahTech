import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

// Falls back to contact@zahtech.net; overridden by CONTACT_TO_EMAIL (e.g. while
// zahtech.net isn't yet verified in Resend and can only deliver to the account owner).
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "contact@zahtech.net";

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
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

        const from = process.env.CONTACT_FROM_EMAIL || "ZahTech Website <onboarding@resend.dev>";
        const rows: [string, string][] = [
          ["Name", d.name],
          ["Email", d.email],
          ["Services", d.services || "-"],
          ["Budget", d.budget || "-"],
          ["Timeline", d.timeline || "-"],
        ];

        const html = `
<div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:600px;margin:0 auto;color:#111">
  <div style="background:#000;padding:20px 24px;border-radius:12px 12px 0 0">
    <h1 style="margin:0;font-size:18px;color:#fff">New quote request <span style="color:#818cf8">&bull;</span> <span style="color:#22d3ee">ZahTech</span></h1>
  </div>
  <div style="border:1px solid #e5e7eb;border-top:0;border-radius:0 0 12px 12px;padding:24px">
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:8px 12px 8px 0;color:#6b7280;width:110px;vertical-align:top">${k}</td><td style="padding:8px 0;font-weight:500">${esc(v)}</td></tr>`,
        )
        .join("")}
    </table>
    <h2 style="font-size:13px;text-transform:uppercase;letter-spacing:.08em;color:#6b7280;margin:20px 0 8px">Project description</h2>
    <p style="margin:0;font-size:14px;line-height:1.6;white-space:pre-wrap">${esc(d.description)}</p>
    <p style="margin:24px 0 0;font-size:12px;color:#9ca3af">Reply to this email to respond directly to ${esc(d.name)}.</p>
  </div>
</div>`;

        const text =
          rows.map(([k, v]) => `${k}: ${v}`).join("\n") +
          `\n\nProject description:\n${d.description}\n`;

        try {
          const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
            body: JSON.stringify({
              from,
              to: [TO_EMAIL],
              reply_to: d.email,
              subject: `New quote request from ${oneLine(d.name)}`,
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
