import { useLang } from "@/lib/i18n";

export function WhatsAppButton() {
  const { t } = useLang();
  return (
    <div className="group fixed bottom-5 right-5 z-50 md:bottom-6 md:right-6">
      <span
        role="tooltip"
        className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-md border border-border bg-background px-3 py-1.5 text-xs text-foreground opacity-0 shadow-lg transition-opacity group-focus-within:opacity-100 group-hover:opacity-100"
      >
        {t.ui.whatsapp}
      </span>
      <a
        href="https://wa.me/12406651472"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.ui.whatsapp}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/40 transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
      >
        <span aria-hidden className="wa-pulse absolute inset-0 rounded-full bg-[#25D366]" />
        <svg viewBox="0 0 32 32" className="relative h-7 w-7 fill-current" aria-hidden>
          <path d="M16.04 3C9.4 3 4 8.36 4 14.96c0 2.3.65 4.53 1.88 6.46L4 29l7.77-1.83a12.1 12.1 0 0 0 4.27.78C22.68 27.95 28 22.6 28 16c0-3.2-1.25-6.2-3.53-8.46A11.9 11.9 0 0 0 16.04 3Zm0 22.9c-1.3 0-2.58-.26-3.77-.76l-.54-.23-4.6 1.08 1.1-4.4-.35-.56A9.9 9.9 0 0 1 6.1 15c0-5.44 4.46-9.87 9.94-9.87 2.66 0 5.15 1.03 7.03 2.9A9.8 9.8 0 0 1 26 15c0 5.44-4.46 9.9-9.96 9.9Zm5.46-7.4c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.78.97-.95 1.17-.18.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.78-1.49-1.75-1.66-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.57-.49-.5-.67-.5h-.58c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.48.7.3 1.26.48 1.7.62.72.23 1.37.2 1.88.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
        </svg>
      </a>
    </div>
  );
}
