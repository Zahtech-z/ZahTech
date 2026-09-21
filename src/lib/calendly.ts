export const CALENDLY_URL = "https://calendly.com/contact-zahtech";

declare global {
  interface Window {
    Calendly?: { initPopupWidget: (opts: { url: string }) => void };
  }
}

let loading: Promise<void> | null = null;

function loadCalendly(): Promise<void> {
  if (window.Calendly) return Promise.resolve();
  if (loading) return loading;
  loading = new Promise<void>((resolve, reject) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      loading = null;
      reject(new Error("Calendly failed to load"));
    };
    document.body.appendChild(script);
  });
  return loading;
}

/** Opens the Calendly popup; falls back to a new tab if the widget can't load. */
export async function openCalendly() {
  try {
    await loadCalendly();
    window.Calendly!.initPopupWidget({ url: CALENDLY_URL });
  } catch {
    window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
  }
}
