import { createFileRoute } from "@tanstack/react-router";
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
import { Testimonial } from "@/components/site/Testimonial";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Custom Software Development & AI Solutions | ZahTech" },
      {
        name: "description",
        content:
          "ZahTech LLC is a Maryland-based tech consulting company delivering custom app development, cloud & DevOps, AI-powered build, and MVP launch services. Get a quote in 24h.",
      },
      { property: "og:title", content: "Custom Software Development & AI Solutions | ZahTech" },
      {
        property: "og:description",
        content:
          "ZahTech LLC is a Maryland-based tech consulting company delivering custom app development, cloud & DevOps, AI-powered build, and MVP launch services. Get a quote in 24h.",
      },
      { property: "og:url", content: "https://zahtech.org/" },
      { name: "twitter:title", content: "Custom Software Development & AI Solutions | ZahTech" },
      {
        name: "twitter:description",
        content: "Maryland-based tech consulting: custom apps, cloud & DevOps, AI-powered build and MVP launch. Get a quote in 24h.",
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
          telephone: "+12406651472",
          image: "https://zahtech.org/og-image.png",
          foundingDate: "2026",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Germantown",
            addressRegion: "MD",
            postalCode: "20874",
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
          sameAs: ["https://github.com/Zahtech-z", "https://x.com/ZahTech_z", "https://linkedin.com/in/anicetzt"],
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
        <Testimonial />
        <Process />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
