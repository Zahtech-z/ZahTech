import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent, type ReactNode } from "react";
import { Nav } from "@/components/site/Nav";
import { HomeFooter } from "@/components/site/HomeFooter";
import { SkipLink } from "@/components/site/SkipLink";
import { useLang } from "@/lib/i18n";
import { contactCopy } from "@/lib/contact-copy";
import { serviceIds, servicesCopy } from "@/lib/services-copy";
import { privacyCopy } from "@/lib/privacy-copy";
import { HomepageReveal } from "@/components/site/HomepageReveal";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: contactCopy.en.seoTitle },
      { name: "description", content: contactCopy.en.seoDescription },
      { property: "og:title", content: contactCopy.en.seoTitle },
      { property: "og:description", content: contactCopy.en.seoDescription },
      { property: "og:url", content: "https://zahtech.org/contact" },
    ],
    links: [{ rel: "canonical", href: "https://zahtech.org/contact" }],
  }),
});

const controlClass =
  "min-h-12 min-w-0 w-full rounded-md border border-input bg-input-background px-3 py-3 text-base text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

function ContactPage() {
  const { lang } = useLang();
  const copy = contactCopy[lang];
  const privacy = privacyCopy[lang];
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending" || state === "success") return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    for (const name of ["name", "description"]) {
      if (!String(fields.get(name) || "").trim()) {
        const control = form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement;
        control.setCustomValidity(copy.requiredError);
        control.reportValidity();
        return;
      }
    }
    const service = serviceIds.find((id) => id === fields.get("services"));
    const stage = String(fields.get("stage") || "");
    const budget = String(fields.get("budget") || "");
    const payload = {
      ...Object.fromEntries(fields.entries()),
      services: service ? servicesCopy.en.services[service].title : contactCopy.en.unsure,
      stage: stage === "" ? "" : contactCopy.en.stages[Number(stage)],
      budget: budget === "" ? "" : contactCopy.en.budgets[Number(budget)],
    };
    setState("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) throw new Error("Inquiry failed");
      setState("success");
    } catch {
      setState("error");
    }
  }

  return (
    <>
      <SkipLink />
      <Nav />
      <main
        id="main-content"
        tabIndex={-1}
        className="border-b border-border bg-background pb-14 pt-28 text-foreground sm:pb-20 sm:pt-36"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <HomepageReveal as="header" className="pb-12 sm:pb-16" entrance>
            <p className="mb-5 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.12em] text-secondary-foreground">
              <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 bg-primary" />
              {copy.eyebrow}
            </p>
            <h1 className="max-w-4xl text-balance font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              {copy.heading}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {copy.introduction}
            </p>
          </HomepageReveal>
          <HomepageReveal className="grid items-start gap-10 border-t border-border pt-10 sm:pt-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] lg:gap-16">
            <section aria-labelledby="direct-contact-heading" className="min-w-0">
              <h2 id="direct-contact-heading" className="font-display text-2xl font-semibold">
                {copy.preferEmail}
              </h2>
              <a
                href="mailto:contact@zahtech.net"
                className="mt-3 inline-flex min-h-11 max-w-full items-center break-all text-base underline underline-offset-4"
              >
                contact@zahtech.net
              </a>
              <p className="mt-5 max-w-sm text-base leading-relaxed text-muted-foreground">
                {copy.location}
              </p>
            </section>
            <form
              onSubmit={submit}
              aria-labelledby="inquiry-heading"
              aria-describedby="required-note"
              aria-busy={state === "sending"}
              onChange={() => {
                if (state !== "sending") setState("idle");
              }}
              onInvalid={(event) => {
                const control = event.target as HTMLInputElement;
                control.setCustomValidity("");
                if (control.validity.valueMissing) control.setCustomValidity(copy.requiredError);
                else if (control.validity.typeMismatch) control.setCustomValidity(copy.emailError);
              }}
              onInput={(event) => (event.target as HTMLInputElement).setCustomValidity("")}
              className="min-w-0"
            >
              <h2 id="inquiry-heading" className="font-display text-2xl font-semibold">
                {copy.formHeading}
              </h2>
              <p id="required-note" className="mb-7 mt-3 text-sm text-muted-foreground">
                {copy.required}
              </p>
              <fieldset disabled={state === "sending"} className="grid min-w-0 gap-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field id="inquiry-name" label={copy.name + " *"}>
                    <input
                      id="inquiry-name"
                      name="name"
                      required
                      maxLength={120}
                      autoComplete="name"
                      className={controlClass}
                    />
                  </Field>
                  <Field id="inquiry-email" label={copy.email + " *"}>
                    <input
                      id="inquiry-email"
                      name="email"
                      required
                      type="email"
                      maxLength={200}
                      autoComplete="email"
                      className={controlClass}
                    />
                  </Field>
                </div>
                <Field id="inquiry-company" label={`${copy.company} (${copy.optional})`}>
                  <input
                    id="inquiry-company"
                    name="company"
                    maxLength={200}
                    autoComplete="organization"
                    className={controlClass}
                  />
                </Field>
                <Field id="inquiry-description" label={copy.description + " *"}>
                  <textarea
                    id="inquiry-description"
                    name="description"
                    required
                    maxLength={5000}
                    rows={5}
                    className={controlClass + " resize-y"}
                  />
                </Field>
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field id="inquiry-service" label={copy.service}>
                    <select
                      id="inquiry-service"
                      name="services"
                      defaultValue=""
                      className={controlClass}
                    >
                      <option value="">{copy.unsure}</option>
                      {serviceIds.map((id) => (
                        <option key={id} value={id}>
                          {servicesCopy[lang].services[id].title}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field id="inquiry-stage" label={`${copy.stage} (${copy.optional})`}>
                    <select
                      id="inquiry-stage"
                      name="stage"
                      defaultValue=""
                      className={controlClass}
                    >
                      <option value="">{copy.choose}</option>
                      {copy.stages.map((stage, index) => (
                        <option key={index} value={index}>
                          {stage}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>
                <Field id="inquiry-budget" label={`${copy.budget} (${copy.optional})`}>
                  <select
                    id="inquiry-budget"
                    name="budget"
                    defaultValue="0"
                    className={controlClass}
                  >
                    {copy.budgets.map((budget, index) => (
                      <option key={index} value={index}>
                        {budget}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field id="inquiry-additional" label={`${copy.additional} (${copy.optional})`}>
                  <textarea
                    id="inquiry-additional"
                    name="additional"
                    maxLength={2000}
                    rows={2}
                    className={controlClass + " resize-y"}
                  />
                </Field>
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />
                <p className="text-sm leading-relaxed text-muted-foreground">{copy.note}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {privacy.contactDisclosure}{" "}
                  <Link
                    to="/privacy"
                    className="underline underline-offset-4 hover:text-foreground"
                  >
                    {privacy.contactLink}
                  </Link>
                </p>
                <button
                  type="submit"
                  disabled={state === "sending" || state === "success"}
                  className="inline-flex min-h-12 items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60 sm:justify-self-start"
                >
                  {state === "sending" ? copy.sending : copy.send}
                </button>
              </fieldset>
              <div role="status" aria-live="polite" className="mt-5 text-base leading-relaxed">
                {state === "success" ? copy.success : ""}
              </div>
              {state === "error" && (
                <p role="alert" className="mt-3 text-base leading-relaxed text-destructive">
                  {copy.error}
                </p>
              )}
            </form>
          </HomepageReveal>
        </div>
      </main>
      <HomeFooter />
    </>
  );
}

function Field({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      {children}
    </div>
  );
}
