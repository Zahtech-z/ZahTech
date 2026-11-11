import { useLang } from "@/lib/i18n";
import { homeCopy } from "@/lib/home-copy";
import "./home-engineering.css";

export function TechnicalProof() {
  const { lang } = useLang();
  const copy = homeCopy[lang];
  return (
    <section id="stack" aria-labelledby="engineering-heading" className="home-engineering">
      <div className="home-engineering__container">
        <p className="home-engineering__eyebrow">
          <span aria-hidden="true" />
          {copy.engineering}
        </p>
        <header className="home-engineering__header">
          <h2 id="engineering-heading">{copy.engineeringTitle}</h2>
          <p>{copy.engineeringIntro}</p>
        </header>
        <ol className="home-engineering__layers">
          {copy.layers.map((layer, index) => (
            <li className="home-engineering__layer" key={layer}>
              <span className="home-engineering__number" aria-hidden="true">
                0{index + 1}
              </span>
              <h3>{layer}</h3>
              <p>{copy.layerDetails[index]}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
