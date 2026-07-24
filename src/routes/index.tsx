import { createFileRoute } from "@tanstack/react-router";
import { LanguageProvider } from "@/lib/i18n";
import { SkipLink } from "@/components/site/SkipLink";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { TrustedStack } from "@/components/site/TrustedStack";
import { CodeTabs } from "@/components/site/CodeTabs";
import { Experience } from "@/components/site/Experience";
import { Features } from "@/components/site/Features";
import { CodePreview } from "@/components/site/CodePreview";
import { Brief } from "@/components/site/Brief";
import { Services } from "@/components/site/Services";
import { Process } from "@/components/site/Process";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "ZahTech: Tech for businesses" },
      {
        name: "description",
        content:
          "The best way to build, deploy and scale your digital product. From MVP to enterprise, delivered fast.",
      },
      { property: "og:title", content: "ZahTech: Tech for businesses" },
      {
        property: "og:description",
        content: "Build, deploy and scale your digital product with ZahTech.",
      },
    ],
  }),
});

function Index() {
  return (
    <LanguageProvider>
      <SkipLink />
      <main className="min-h-screen bg-background text-foreground">
        <Nav />
        <Hero />
        <TrustedStack />
        <CodeTabs />
        <Experience />
        <Features />
        <CodePreview />
        <Brief />
        <Services />
        <Process />
        <Contact />
        <Footer />
      </main>
    </LanguageProvider>
  );
}
