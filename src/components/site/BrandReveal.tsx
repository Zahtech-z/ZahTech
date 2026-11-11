import { stagger, useAnimate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, type ReactNode } from "react";

/** Visible SSR fallback; motion starts when the content enters the viewport. */
export function BrandReveal({
  children,
  id,
  as: Tag = "div",
  className,
  selector,
  ariaLabelledby,
}: {
  children: ReactNode;
  id?: string;
  as?: "div" | "header" | "section" | "li";
  className?: string;
  selector?: string;
  ariaLabelledby?: string;
}) {
  const [scope, animate] = useAnimate<HTMLElement>();
  const inView = useInView(scope, { once: true, margin: "0px 0px -6% 0px" });
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    const element = scope.current;
    if (!element) return;
    const matches = selector ? Array.from(element.querySelectorAll<HTMLElement>(selector)) : [];
    const targets = matches.length ? matches : [element];
    if (reducedMotion) {
      element.dataset.motionState = "static";
      const reset = animate(targets, { opacity: 1, y: 0 }, { duration: 0 });
      return () => reset.stop();
    }
    if (!inView) return;
    if (element.contains(document.activeElement)) {
      element.dataset.motionState = "static";
      return;
    }
    element.dataset.motionState = "playing";
    const controls = animate(
      targets,
      { opacity: [0, 1], y: [32, 0] },
      {
        duration: 0.7,
        delay: stagger(0.075),
        ease: [0.22, 1, 0.36, 1],
      },
    );
    const finishForFocus = () => {
      controls.stop();
      void animate(targets, { opacity: 1, y: 0 }, { duration: 0 });
      element.dataset.motionState = "complete";
    };
    element.addEventListener("focusin", finishForFocus);
    let cancelled = false;
    void Promise.resolve(controls).then(() => {
      if (!cancelled) element.dataset.motionState = "complete";
    });
    return () => {
      cancelled = true;
      element.removeEventListener("focusin", finishForFocus);
      controls.stop();
    };
  }, [animate, inView, reducedMotion, scope, selector]);
  return (
    <Tag
      ref={scope as never}
      id={id}
      className={className}
      data-motion-state="idle"
      aria-labelledby={ariaLabelledby}
    >
      {children}
    </Tag>
  );
}
