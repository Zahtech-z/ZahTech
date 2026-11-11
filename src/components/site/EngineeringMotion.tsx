import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

export function EngineeringMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 35%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 28 });
  return (
    <div className="engineering-motion" ref={ref}>
      <motion.span
        aria-hidden="true"
        className="engineering-motion__horizontal"
        style={{ opacity: mounted ? 1 : 0, scaleX: mounted && !reduced ? progress : 1 }}
      />
      <motion.span
        aria-hidden="true"
        className="engineering-motion__vertical"
        style={{ opacity: mounted ? 1 : 0, scaleY: mounted && !reduced ? progress : 1 }}
      />
      {children}
    </div>
  );
}
