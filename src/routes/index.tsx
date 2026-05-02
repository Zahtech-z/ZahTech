import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { TrustedStack } from "@/components/site/TrustedStack";
import { Services } from "@/components/site/Services";
import { Experience } from "@/components/site/Experience";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "ZahTech — Tech for businesses that ship" },
      { name: "description", content: "ZahTech assembles modern software, cloud, and AI into products your customers love. Web, mobile, DevOps, and security." },
      { property: "og:title", content: "ZahTech — Tech for businesses that ship" },
      { property: "og:description", content: "Engineering excellence, delivered. Web, cloud, AI, mobile, security, and data services." },
    ],
  }),
});

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <TrustedStack />
      <Services />
      <Experience />
      <Contact />
      <Footer />
    </main>
  );
}
