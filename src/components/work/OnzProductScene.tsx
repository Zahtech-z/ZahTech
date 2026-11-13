import { useLang } from "@/lib/i18n";
import { onzscoreCaseCopy, onzScreen } from "@/lib/onzscore-case-copy";

/** The artwork uses the live product's official previews, never invented UI. */
export function OnzProductScene({ mobile = false }: { mobile?: boolean }) {
  const { lang } = useLang();
  const copy = onzscoreCaseCopy[lang];
  return (
    <figure className={`onz-scene${mobile ? " onz-scene--mobile" : ""}`}>
      <div className="onz-scene__art" data-onz-artwork>
        <svg className="onz-scene__pitch" viewBox="0 0 800 600" fill="none" aria-hidden="true">
          <path d="M80 70H720V530H80Z M400 70V530 M80 190H190V410H80 M720 190H610V410H720" />
          <circle cx="400" cy="300" r="76" />
          <circle cx="400" cy="300" r="3" fill="currentColor" stroke="none" />
        </svg>
        <span className="onz-scene__word" aria-hidden="true">
          OnzScore
        </span>
        <div className="onz-scene__devices">
          <div className="onz-device onz-device--back">
            <img
              src={onzScreen(mobile ? "streaks" : "match", lang)}
              width={390}
              height={844}
              alt={copy.screens[mobile ? 2 : 1].alt}
              loading={mobile ? "lazy" : "eager"}
              decoding="async"
            />
          </div>
          <div className="onz-device onz-device--front">
            <img
              src={onzScreen("matches", lang)}
              width={390}
              height={844}
              alt={copy.screens[0].alt}
              loading={mobile ? "lazy" : "eager"}
              decoding="async"
              fetchPriority={mobile ? "auto" : "high"}
            />
          </div>
        </div>
        <div className="onz-scene__signature" aria-hidden="true">
          <span>OnzScore</span>
          <span>ZahTech / {mobile ? "Mobile" : "Product engineering"}</span>
        </div>
      </div>
      <figcaption>{copy.imageNote}</figcaption>
    </figure>
  );
}
