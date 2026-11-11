import { useLang } from "@/lib/i18n";
import { homeCopy } from "@/lib/home-copy";
import "./home-process.css";

export function Process() {
  const { t, lang } = useLang();
  const copy = homeCopy[lang];
  return (
    <section id="process" aria-labelledby="process-heading" className="home-process">
      <div className="home-process__container">
        <header className="home-process__header">
          <p className="home-process__eyebrow">
            <span aria-hidden="true" />
            {copy.process}
          </p>
          <h2 id="process-heading">{copy.processTitle}</h2>
        </header>
        <ol className="home-process__steps">
          {t.process.steps.map((step, index) => (
            <li className="home-process__step" key={step.title}>
              <span className="home-process__number" aria-hidden="true">
                0{index + 1}
              </span>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
