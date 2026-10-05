import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Code2, Cloud, Compass, Sparkles, ShieldCheck, Rocket, Check, Loader2 } from "lucide-react";
import { openCalendly } from "@/lib/calendly";
import { heroCopy } from "@/lib/hero-copy";
import { homeCopy } from "@/lib/home-copy";
import { useLang } from "@/lib/i18n";
import { privacyCopy } from "@/lib/privacy-copy";

const serviceIcons = [Code2, Cloud, Compass, Sparkles, ShieldCheck, Rocket];
export function Contact() {
  const { t, lang } = useLang();
  const copy = homeCopy[lang];
  const privacy = privacyCopy[lang];
  const [picked, setPicked] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const toggle = (label: string) =>
    setPicked((p) => (p.includes(label) ? p.filter((x) => x !== label) : [...p, label]));

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(false);
    const fd = new FormData(e.currentTarget);
    const payload = {
      ...Object.fromEntries(fd.entries()),
      services: picked.join(", "),
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="border-b border-border py-14 sm:py-20"
    >
      <div className="mx-auto grid max-w-7xl items-start gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <div>
          <h2
            id="contact-heading"
            className="text-balance font-display text-3xl font-semibold sm:text-4xl"
          >
            {heroCopy[lang].project}
          </h2>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-muted-foreground">
            {copy.contactIntro}
          </p>
          <div className="mt-6 text-sm">
            <p className="text-muted-foreground">{copy.contactEmail}</p>
            <a
              href="mailto:contact@zahtech.net"
              className="inline-flex min-h-11 items-center underline underline-offset-4"
            >
              contact@zahtech.net
            </a>
          </div>
          <button
            type="button"
            onClick={openCalendly}
            className="mt-2 inline-flex min-h-11 items-center text-sm underline underline-offset-4 hover:text-primary-text"
          >
            {t.contact.bookCall}
          </button>
        </div>

        {submitted ? (
          <div
            role="status"
            aria-live="polite"
            className="rounded-md border border-border bg-surface p-6 text-center"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Check className="h-5 w-5" strokeWidth={3} />
            </div>
            <h3 className="font-display text-2xl font-bold">{t.contact.successTitle}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{t.contact.successDesc}</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="relative grid min-w-0 grid-cols-1 gap-5 rounded-md border border-border bg-surface p-4 sm:p-6"
          >
            {error && (
              <div
                role="alert"
                aria-live="assertive"
                className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
              >
                <p className="font-medium">{t.contact.errorTitle}</p>
                <p className="mt-1 text-destructive/80">{t.contact.errorDesc}</p>
              </div>
            )}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label={t.contact.nameLabel}>
                <input
                  required
                  name="name"
                  className={inputCls}
                  placeholder={t.contact.namePlaceholder}
                />
              </Field>
              <Field label={t.contact.emailLabel}>
                <input
                  required
                  type="email"
                  name="email"
                  className={inputCls}
                  placeholder={t.contact.emailPlaceholder}
                />
              </Field>
            </div>

            <fieldset className="min-w-0">
              <legend className="mb-2 text-sm font-medium text-secondary-foreground">
                {t.contact.servicesLabel}
              </legend>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                {t.services.items.map(({ title }, i) => {
                  const Icon = serviceIcons[i];
                  const on = picked.includes(title);
                  return (
                    <button
                      type="button"
                      key={title}
                      onClick={() => toggle(title)}
                      aria-pressed={on}
                      className={`flex min-h-11 items-center gap-2 rounded-md border px-2 py-3 text-left text-xs transition-colors motion-reduce:transition-none ${
                        on
                          ? "border-ring bg-background text-foreground"
                          : "border-input bg-background text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={1.6} />
                      {title}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label={t.contact.budgetLabel}>
                <select name="budget" className={inputCls} defaultValue="">
                  <option value="" disabled>
                    {t.contact.budgetDefault}
                  </option>
                  {t.landing.contactOptions.budgets.map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
              </Field>
              <Field label={t.contact.timelineLabel}>
                <select name="timeline" className={inputCls} defaultValue="">
                  <option value="" disabled>
                    {t.contact.timelineDefault}
                  </option>
                  {t.landing.contactOptions.timelines.map((timeline) => (
                    <option key={timeline}>{timeline}</option>
                  ))}
                </select>
              </Field>
            </div>

            {/* Honeypot: hidden from people, tempting to bots */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
            />

            <Field label={t.contact.descLabel}>
              <textarea
                required
                name="description"
                rows={4}
                placeholder={t.contact.descPlaceholder}
                className={inputCls + " resize-y"}
              />
            </Field>

            <button
              type="submit"
              disabled={submitting}
              aria-busy={submitting}
              className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none"
            >
              {submitting && (
                <Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden />
              )}
              {submitting ? t.contact.submitting : error ? t.contact.retry : heroCopy[lang].project}
            </button>
            <p className="text-center text-xs text-muted-foreground">{t.contact.note}</p>
            <p className="text-center text-xs leading-relaxed text-muted-foreground">
              {privacy.contactDisclosure}{" "}
              <Link to="/privacy" className="underline underline-offset-4 hover:text-foreground">
                {privacy.contactLink}
              </Link>
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

const inputCls =
  "min-h-11 min-w-0 w-full rounded-md border border-input bg-input-background px-3 py-2.5 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
