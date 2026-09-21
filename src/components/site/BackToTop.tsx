import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useLang } from "@/lib/i18n";

export function BackToTop() {
  const { t } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 800);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={t.ui.backToTop}
      title={t.ui.backToTop}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-5 right-24 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/80 text-foreground backdrop-blur transition-all hover:border-primary/60 hover:text-primary md:bottom-6 md:right-28 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
}
