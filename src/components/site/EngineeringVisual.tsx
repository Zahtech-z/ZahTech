import { useLang } from "@/lib/i18n";
import { heroCopy } from "@/lib/hero-copy";

/** Four static stages assembled from the logo's diagonal geometry. */
export function EngineeringVisual() {
  const { lang } = useLang();
  const copy = heroCopy[lang];
  return (
    <figure className="engineering-assembly min-w-0 border-b border-border pb-5 lg:pb-6">
      <figcaption className="flex items-center justify-between gap-4 text-xs font-medium text-secondary-foreground">
        <span>{copy.progression}</span>
        <span aria-hidden="true" className="font-mono text-muted-foreground">
          01 — 04
        </span>
      </figcaption>
      <svg
        viewBox="0 0 440 360"
        aria-hidden="true"
        focusable="false"
        className="my-3 h-auto max-h-44 w-full text-secondary-foreground sm:max-h-64 lg:my-5 lg:max-h-80"
      >
        <g fill="none" stroke="currentColor" strokeWidth="1" opacity="0.08">
          <path d="M20 80H420M20 160H420M20 240H420M20 320H420M60 30V340M140 30V340M220 30V340M300 30V340M380 30V340" />
        </g>
        <path
          id="engineering-connector-1"
          className="engineering-connector engineering-connector-1"
          d="M60 280H140V220"
          pathLength="1"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          id="engineering-connector-2"
          className="engineering-connector engineering-connector-2"
          d="M140 220H220V140"
          pathLength="1"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          id="engineering-connector-3"
          className="engineering-connector engineering-connector-3"
          d="M220 140H300V80H380"
          pathLength="1"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          className="engineering-connector engineering-connector-accent"
          d="M220 220V140H300V80"
          pathLength="1"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="3"
        />
        <g aria-hidden="true" fill="none" pointerEvents="none">
          <use
            href="#engineering-connector-1"
            className="engineering-signal-segment engineering-signal-segment-1"
            opacity="0"
          />
          <use
            href="#engineering-connector-2"
            className="engineering-signal-segment engineering-signal-segment-2"
            opacity="0"
          />
          <use
            href="#engineering-connector-3"
            className="engineering-signal-segment engineering-signal-segment-3"
            opacity="0"
          />
        </g>
        <g
          className="engineering-stage engineering-stage-1"
          fill="var(--background)"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M32 252H88V280L60 308H32Z" />
        </g>
        <g
          className="engineering-stage engineering-stage-2"
          fill="var(--background)"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M112 192H168V220L140 248H112Z" />
        </g>
        <path
          className="engineering-stage engineering-stage-2"
          d="M116 196H164V216L144 236H128L148 216H116Z"
          fill="currentColor"
        />
        <g className="engineering-stage engineering-stage-3" fill="currentColor">
          <path d="M184 106H256V124L224 156H200L232 124H184Z" />
          <path d="M184 174H256V186H184Z" fill="var(--primary)" />
        </g>
        <g className="engineering-stage engineering-stage-4" fill="currentColor">
          <path d="M278 56H340V68L310 98H294L324 68H278Z" />
          <path d="M294 104H356V116H294Z" />
        </g>
        <circle
          className="engineering-stage engineering-stage-1"
          cx="60"
          cy="280"
          r="4"
          fill="currentColor"
        />
        <circle
          className="engineering-stage engineering-stage-4"
          cx="380"
          cy="80"
          r="5"
          fill="var(--primary)"
        />
        <g fill="currentColor" fontFamily="monospace" fontSize="11">
          <text className="engineering-stage engineering-stage-1" x="32" y="332">
            01
          </text>
          <text className="engineering-stage engineering-stage-2" x="112" y="272">
            02
          </text>
          <text className="engineering-stage engineering-stage-3" x="190" y="202">
            03
          </text>
          <text className="engineering-stage engineering-stage-4" x="276" y="132">
            04
          </text>
        </g>
      </svg>
      <ol className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs text-secondary-foreground sm:grid-cols-4">
        {copy.stages.map((stage, i) => (
          <li
            key={i}
            className={`engineering-stage engineering-stage-${i + 1} flex min-w-0 items-baseline gap-2`}
          >
            <span className="font-mono text-muted-foreground">0{i + 1}</span>
            <span>{stage}</span>
          </li>
        ))}
      </ol>
    </figure>
  );
}
