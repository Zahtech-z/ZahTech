import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { useLang } from "@/lib/i18n";
import "./brand-sculpture.css";
import { brandMarkPaths } from "@/lib/brand-mark";

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
          x1="5"
          y1="4"
          x2="28"
          y2="28"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#ffc2a1" />
          <stop offset="0.32" stopColor="#ff5a36" />
          <stop offset="0.72" stopColor="#ac2511" />
          <stop offset="1" stopColor="#ff754c" />
        </linearGradient>
        <linearGradient
          id="zahtech-sculpture-ivory"
          x1="5"
          y1="4"
          x2="28"
          y2="28"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fffaf0" />
          <stop offset="0.5" stopColor="#f5f2eb" />
          <stop offset="1" stopColor="#a9a397" />
        </linearGradient>
      </defs>
      <g transform="translate(108 108) scale(12)">
        <path d={brandMarkPaths[0]} transform="translate(.6 .6)" fill="#62594e" />
        <path d={brandMarkPaths[1]} transform="translate(.6 .6)" fill="#8f2d1b" />
        <path
          data-brand-mark="primary"
          d={brandMarkPaths[0]}
          fill="url(#zahtech-sculpture-ivory)"
        />
        <path
          data-brand-mark="accent"
          d={brandMarkPaths[1]}
          fill="url(#zahtech-sculpture-orange)"
        />
      </g>
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
          aria-label={paused ? controls[lang].resume : controls[lang].pause}
          title={paused ? controls[lang].resume : controls[lang].pause}
          onClick={() => setPaused((value) => !value)}
        >
          {paused ? (
            <Play size={16} strokeWidth={1.5} aria-hidden="true" />
          ) : (
            <Pause size={16} strokeWidth={1.5} aria-hidden="true" />
          )}
        </button>
      )}
    </div>
  );
}
