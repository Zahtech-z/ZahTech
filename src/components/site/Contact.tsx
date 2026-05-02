import { useState } from "react";

const services = ["Web Development", "Cloud & DevOps", "AI Integration", "Mobile Apps", "Security Audits", "Data & Analytics"];

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" className="border-b border-border py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-primary">Contact</p>
          <h2 className="text-balance text-4xl font-bold md:text-5xl">Let's build something.</h2>
          <p className="mt-4 text-muted-foreground">Tell us about your project. We reply within one business day.</p>
        </div>

        {submitted ? (
          <div className="rounded-2xl border border-primary/40 bg-surface-elevated p-10 text-center animate-float-in">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">✓</div>
            <h3 className="font-display text-2xl font-bold">Message received</h3>
            <p className="mt-2 text-sm text-muted-foreground">We'll be in touch shortly.</p>
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
            className="grid grid-cols-1 gap-4 rounded-2xl border border-border bg-card p-6 md:p-8"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="Name">
                <input required type="text" placeholder="Jane Doe" className={inputCls} />
              </Field>
              <Field label="Email">
                <input required type="email" placeholder="jane@company.com" className={inputCls} />
              </Field>
            </div>
            <Field label="Service">
              <select required className={inputCls + " appearance-none"}>
                <option value="">Select a service…</option>
                {services.map(s => <option key={s}>{s}</option>)}
              </select>
            </Field>
            <Field label="Project description">
              <textarea required rows={5} placeholder="Tell us about goals, timeline, and stack…" className={inputCls + " resize-none"} />
            </Field>
            <button type="submit" className="mt-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
              Send message
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

const inputCls = "w-full rounded-md border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
