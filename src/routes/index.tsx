import { createFileRoute } from "@tanstack/react-router";
import { SkipLink } from "@/components/site/SkipLink";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { SelectedWork } from "@/components/site/SelectedWork";
import { Services } from "@/components/site/Services";
import { TechnicalProof } from "@/components/site/TechnicalProof";
import { Process } from "@/components/site/Process";
import { Contact } from "@/components/site/Contact";
import { HomeFooter } from "@/components/site/HomeFooter";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Custom Software Development & AI Solutions | ZahTech" },
      {
        name: "description",
        content:
          "ZahTech LLC is a Maryland-based tech consulting company delivering custom app development, cloud & DevOps, AI-powered build, and MVP launch services.",
      },
      { property: "og:title", content: "Custom Software Development & AI Solutions | ZahTech" },
      {
        property: "og:description",
        content:
          "ZahTech LLC is a Maryland-based tech consulting company delivering custom app development, cloud & DevOps, AI-powered build, and MVP launch services.",
      },
      { property: "og:url", content: "https://zahtech.org/" },
      { name: "twitter:title", content: "Custom Software Development & AI Solutions | ZahTech" },
      {
        name: "twitter:description",
        content: "Maryland-based tech consulting: custom apps, cloud & DevOps, AI-powered build and MVP launch.",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": "https://zahtech.org/#organization",
          name: "ZahTech LLC",
          url: "https://zahtech.org",
          email: "contact@zahtech.net",
          image: "https://zahtech.org/og-image.png",
          foundingDate: "2026",
          address: {
            "@type": "PostalAddress",
            addressRegion: "MD",
            addressCountry: "US",
          },
          description:
            "Maryland-based tech consulting company delivering custom app development, cloud & DevOps, AI-powered build, and MVP launch services.",
          founder: { "@id": "https://zahtech.org/#anicet-hermann-zie" },
          areaServed: [
            { "@type": "AdministrativeArea", name: "Washington DC metropolitan area" },
            { "@type": "Country", name: "United States" },
            "Worldwide",
          ],
          knowsAbout: ["Custom software development", "Web application development", "AI solutions", "Cloud and DevOps", "MVP development"],
          sameAs: ["https://github.com/Zahtech-z", "https://x.com/ZahTech_z"],
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "sales",
            email: "contact@zahtech.net",
            areaServed: "Worldwide",
            availableLanguage: ["English", "French", "Spanish"],
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Custom Software Development",
          provider: { "@id": "https://zahtech.org/#organization" },
          url: "https://zahtech.org/#services",
          serviceType: ["Custom web application development", "MVP development", "Cloud and DevOps", "AI-powered software development"],
          areaServed: "Worldwide",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "@id": "https://zahtech.org/#anicet-hermann-zie",
          name: "Anicet Hermann Zie",
          jobTitle: "Founder and CEO",
          worksFor: { "@id": "https://zahtech.org/#organization" },
          url: "https://zahtech.org/",
          sameAs: ["https://linkedin.com/in/anicetzt"],
          knowsAbout: ["Custom software development", "AI solutions", "Cloud and DevOps", "Technology consulting"],
        }),
      },
    ],
  }),
});

function Index() {
  return (
    <>
      <SkipLink />
      <Nav />
      <main className="min-h-screen bg-background text-foreground">
        <Hero />
        <SelectedWork />
        <Services />
        <TechnicalProof />
        <Process />
        <Contact />
      </main>
      <HomeFooter />
    </>
  );
}
