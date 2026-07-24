import { useLang } from "@/lib/i18n";

export function SkipLink() {
  const { t } = useLang();

  return (
    <a
      href="#main-content"
      className="sr-only z-[100] rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
    >
      {t.a11y.skipToContent}
    </a>
  );
}
