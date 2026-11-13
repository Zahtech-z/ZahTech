import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { useLang } from "@/lib/i18n";
import "./brand-sculpture.css";

const Scene = lazy(() => import("./BrandSculptureScene"));
const controls = {
  en: { pause: "Pause animation", resume: "Resume animation" },
  fr: { pause: "Mettre en pause", resume: "Reprendre l’animation" },
  es: { pause: "Pausar animación", resume: "Reanudar animación" },
};

/** Decorative scene failures never replace the accessible hero content. */
class SceneBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function Poster() {
  return (
    <svg className="brand-sculpture__poster" viewBox="0 0 600 600" fill="none" aria-hidden="true">
      <defs>
        <linearGradient
          id="zahtech-sculpture-orange"
          x1="150"
          y1="130"
          x2="410"
          y2="460"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#ffc2a1" />
          <stop offset="0.32" stopColor="#ff5a36" />
          <stop offset="0.72" stopColor="#ac2511" />
          <stop offset="1" stopColor="#ff754c" />
        </linearGradient>
        <radialGradient id="zahtech-sculpture-core">
          <stop stopColor="#ffd5bf" />
          <stop offset="0.45" stopColor="#ff8b59" />
          <stop offset="1" stopColor="#ff5a36" />
        </radialGradient>
      </defs>
      <circle cx="300" cy="300" r="238" stroke="#f5f2eb" strokeOpacity=".1" />
      <ellipse
        cx="300"
        cy="300"
        rx="253"
        ry="105"
        stroke="#f5f2eb"
        strokeOpacity=".15"
        transform="rotate(-30 300 300)"
      />
      <circle cx="300" cy="300" r="71" fill="url(#zahtech-sculpture-core)" />
      <g stroke="url(#zahtech-sculpture-orange)" strokeWidth="32">
        <ellipse cx="300" cy="300" rx="155" ry="83" transform="rotate(-38 300 300)" />
        <ellipse cx="300" cy="300" rx="155" ry="83" transform="rotate(65 300 300)" />
      </g>
      <circle cx="505" cy="191" r="6" fill="#f5f2eb" />
      <circle cx="101" cy="423" r="5" fill="#ff5a36" />
    </svg>
  );
}

export function BrandSculpture() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.05 });
  const reduced = useReducedMotion();
  const { lang } = useLang();
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const [paused, setPaused] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    const update = () => setPageVisible(document.visibilityState !== "hidden");
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  useEffect(() => {
    if (reduced !== false || !visible || enabled || unavailable) return;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection;
    if (connection?.saveData) return;
    // Check support before importing the renderer; the SVG remains the fallback.
    const timer = window.setTimeout(() => {
      try {
        const canvas = document.createElement("canvas");
        const gl = canvas.getContext("webgl2");
        if (!gl) {
          setUnavailable(true);
          return;
        }
        gl.getExtension("WEBGL_lose_context")?.loseContext();
        setEnabled(true);
      } catch {
        setUnavailable(true);
      }
    }, 250);
    return () => window.clearTimeout(timer);
  }, [enabled, reduced, unavailable, visible]);

  const active = visible && pageVisible && !paused && reduced === false;
  const showScene = enabled && !unavailable && reduced === false;
  return (
    <div
      ref={ref}
      className="brand-sculpture"
      data-scene-state={showScene && ready ? "ready" : "poster"}
      data-scene-active={showScene && active}
    >
      <div className="brand-sculpture__art" aria-hidden="true">
        <Poster />
        {showScene && (
          <SceneBoundary
            onError={() => {
              setUnavailable(true);
              setReady(false);
            }}
          >
            <Suspense fallback={null}>
              <Scene
                active={active}
                onReady={() => setReady(true)}
                onUnavailable={() => {
                  setUnavailable(true);
                  setReady(false);
                }}
              />
            </Suspense>
          </SceneBoundary>
        )}
      </div>
      {showScene && ready && (
        <button
          type="button"
          className="brand-sculpture__control"
          aria-pressed={paused}
          onClick={() => setPaused((value) => !value)}
        >
          {paused ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}
          {paused ? controls[lang].resume : controls[lang].pause}
        </button>
      )}
    </div>
  );
}
