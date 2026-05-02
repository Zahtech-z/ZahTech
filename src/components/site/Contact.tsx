import { useState } from "react";
import { motion } from "framer-motion";
import { Code2, Cloud, Compass, Sparkles, ShieldCheck, Rocket, Check } from "lucide-react";
import { useLang } from "@/lib/i18n";

const serviceIcons = [Code2, Cloud, Compass, Sparkles, ShieldCheck, Rocket];
const budgets = ["< $5k", "$5k – $15k", "$15k – $40k", "$40k+", "Not sure"];
const timelines = ["ASAP", "2 – 4 weeks", "1 – 2 months", "3+ months", "Flexible"];

export function Contact() {
  const { t } = useLang();
  const [picked, setPicked] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const toggle = (label: string) =>
    setPicked((p) => (p.includes(label) ? p.filter((x) => x !== label) : [...p, label]));

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    fd.set("services", picked.join(", "));
    try {
      await fetch("https://formspree.io/f/meenovry", {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" },
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="border-b border-border py-24">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-balance font-display text-4xl font-bold md:text-5xl">
            {t.contact.heading}
          </h2>
          <p className="mt-4 text-muted-foreground">{t.contact.sub}</p>
        </motion.div>

        {submitted ? (
          <div className="rounded-2xl border border-primary/40 bg-[#0a0a0e] p-10 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Check className="h-5 w-5" strokeWidth={3} />
            </div>
            <h3 className="font-display text-2xl font-bold">{t.contact.successTitle}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{t.contact.successDesc}</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-5 rounded-2xl border border-border bg-[#0a0a0e] p-6 md:p-8"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label={t.contact.nameLabel}>
                <input required name="name" className={inputCls} placeholder={t.contact.namePlaceholder} />
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

            <div>
              <span className="mb-2 block text-xs font-medium text-muted-foreground">
                {t.contact.servicesLabel}
              </span>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                {t.services.items.map(({ title }, i) => {
                  const Icon = serviceIcons[i];
                  const on = picked.includes(title);
                  return (
                    <button
                      type="button"
                      key={title}
                      onClick={() => toggle(title)}
                      className={`flex items-center gap-2 rounded-md border px-3 py-2.5 text-left text-xs transition-all ${
                        on
                          ? "border-primary/60 bg-primary/10 text-foreground"
                          : "border-border bg-background/40 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={1.6} />
                      {title}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label={t.contact.budgetLabel}>
                <select name="budget" className={inputCls + " appearance-none"} defaultValue="">
                  <option value="" disabled>{t.contact.budgetDefault}</option>
                  {budgets.map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
              </Field>
              <Field label={t.contact.timelineLabel}>
                <select name="timeline" className={inputCls + " appearance-none"} defaultValue="">
                  <option value="" disabled>{t.contact.timelineDefault}</option>
                  {timelines.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label={t.contact.descLabel}>
              <textarea
                required
                name="description"
                rows={5}
                placeholder={t.contact.descPlaceholder}
                className={inputCls + " resize-none"}
              />
            </Field>

            <button
              type="submit"
              disabled={submitting}
              className="mt-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {submitting ? t.contact.submitting : t.contact.submit}
            </button>
            <p className="text-center text-xs text-muted-foreground">{t.contact.note}</p>
          </form>
        )}
      </div>
    </section>
  );
}

const inputCls =
  "w-full rounded-md border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
