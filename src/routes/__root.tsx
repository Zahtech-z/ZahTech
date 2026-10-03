import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { LanguageProvider } from "@/lib/i18n";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { BackToTop } from "@/components/site/BackToTop";

const DESCRIPTION =
  "ZahTech LLC is a Maryland-based tech consulting company delivering custom app development, cloud & DevOps, AI-powered build, and MVP launch services. Get a quote in 24h.";
const OG_IMAGE = "https://zahtech.org/og-image.png";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: ({ matches }) => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ZahTech" },
      { name: "description", content: DESCRIPTION },
      { name: "author", content: "ZahTech" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "theme-color", content: "#f5f2eb" },
      { property: "og:title", content: "ZahTech" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "ZahTech" },
      { property: "og:locale", content: "en_US" },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "ZahTech LLC: Tech for businesses. Built fast, shipped right." },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: OG_IMAGE },
      { name: "twitter:site", content: "@ZahTech_z" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      {
        rel: "stylesheet",
        href: appCss,
      },
      // Work routes provide their own canonical URL.
      ...(matches.some((match) => match.pathname === "/work" || match.pathname.startsWith("/work/"))
        ? []
        : [{ rel: "canonical", href: "https://zahtech.org/" }]),
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <LanguageProvider>
      <Outlet />
      <BackToTop />
      <WhatsAppButton />
    </LanguageProvider>
  );
}
