import type { Lang } from "./i18n";

export const homeCopy = {
  en: {
    capabilities: "Capabilities",
    servicesLink: "View all services",
    services: "The right expertise, at every stage.",
    servicesIntro: "From a focused first release to the systems that keep it running.",
    serviceDescriptions: [
      "Web applications and digital products, from interface to backend.",
      "Cloud infrastructure, deployment pipelines, and production environments that support repeatable releases and day-to-day operation.",
      "Architecture reviews, technical direction, and practical delivery plans.",
      "AI-assisted development and AI features shaped around your product needs.",
      "Monitoring, security updates, and ongoing infrastructure maintenance.",
      "A focused first release, with a clear scope and a path to production.",
    ],
    engineering: "Engineering",
    engineeringTitle: "Built as a system. Delivered as a product.",
    engineeringIntro:
      "The interface is only one part. We connect application code, data, and infrastructure so the product can be deployed and maintained.",
    layers: ["Interface", "Application", "Data", "Infrastructure"],
    layerDetails: ["React / Next.js", "Node.js / APIs", "PostgreSQL", "AWS / Docker / CI/CD"],
    process: "How we work",
    processTitle: "A clear path from brief to release.",
    contactHeading: "Have a project in mind?",
    contactIntro:
      "Tell us about the product, application, cloud infrastructure, or AI-powered build you want to create.",
    contactEmail: "Prefer email?",
    footerLine: "Software, AI, and cloud. Built with care.",
  },
  fr: {
    capabilities: "Expertises",
    servicesLink: "Voir tous les services",
    services: "La bonne expertise, à chaque étape.",
    servicesIntro: "D'une première version ciblée aux systèmes qui la font fonctionner.",
    serviceDescriptions: [
      "Applications web et produits numériques, de l'interface au backend.",
      "Infrastructure cloud, chaînes de déploiement et environnements de production qui favorisent des mises en production reproductibles et l’exploitation au quotidien.",
      "Revues d'architecture, orientation technique et plans de réalisation concrets.",
      "Développement assisté par IA et fonctionnalités adaptées aux besoins du produit.",
      "Surveillance, mises à jour de sécurité et maintenance de l'infrastructure.",
      "Une première version ciblée, un périmètre clair et un chemin vers la production.",
    ],
    engineering: "Ingénierie",
    engineeringTitle: "Pensé comme un système. Livré comme un produit.",
    engineeringIntro:
      "L'interface n'est qu'une partie du produit. Nous relions le code, les données et l'infrastructure pour le déployer et le maintenir.",
    layers: ["Interface", "Application", "Données", "Infrastructure"],
    layerDetails: ["React / Next.js", "Node.js / API", "PostgreSQL", "AWS / Docker / CI/CD"],
    process: "Notre méthode",
    processTitle: "Un parcours clair, du brief à la livraison.",
    contactHeading: "Un projet en tête ?",
    contactIntro:
      "Parlez-nous du produit, de l’application, de l’infrastructure cloud ou de la solution enrichie par l’IA que vous souhaitez créer.",
    contactEmail: "Vous préférez écrire ?",
    footerLine: "Logiciel, IA et cloud. Conçus avec soin.",
  },
  es: {
    capabilities: "Especialidades",
    servicesLink: "Ver todos los servicios",
    services: "La experiencia adecuada en cada etapa.",
    servicesIntro:
      "Desde una primera versión bien definida hasta los sistemas que la mantienen en marcha.",
    serviceDescriptions: [
      "Aplicaciones web y productos digitales, desde la interfaz hasta el backend.",
      "Infraestructura cloud, procesos de despliegue y entornos de producción que favorecen lanzamientos repetibles y la operación diaria.",
      "Revisiones de arquitectura, dirección técnica y planes de desarrollo prácticos.",
      "Desarrollo asistido por IA y funciones adaptadas a las necesidades del producto.",
      "Supervisión, actualizaciones de seguridad y mantenimiento de infraestructura.",
      "Una primera versión enfocada, con un alcance claro y una ruta a producción.",
    ],
    engineering: "Ingeniería",
    engineeringTitle: "Pensado como un sistema. Entregado como un producto.",
    engineeringIntro:
      "La interfaz es solo una parte. Conectamos código, datos e infraestructura para que el producto pueda desplegarse y mantenerse.",
    layers: ["Interfaz", "Aplicación", "Datos", "Infraestructura"],
    layerDetails: ["React / Next.js", "Node.js / API", "PostgreSQL", "AWS / Docker / CI/CD"],
    process: "Cómo trabajamos",
    processTitle: "Un camino claro, del brief al lanzamiento.",
    contactHeading: "¿Tienes un proyecto en mente?",
    contactIntro:
      "Cuéntanos sobre el producto, la aplicación, la infraestructura cloud o la solución con IA que quieres crear.",
    contactEmail: "¿Prefieres escribirnos?",
    footerLine: "Software, IA y cloud. Creados con cuidado.",
  },
} satisfies Record<
  Lang,
  {
    capabilities: string;
    servicesLink: string;
    services: string;
    servicesIntro: string;
    serviceDescriptions: string[];
    engineering: string;
    engineeringTitle: string;
    engineeringIntro: string;
    layers: string[];
    layerDetails: string[];
    process: string;
    processTitle: string;
    contactHeading: string;
    contactIntro: string;
    contactEmail: string;
    footerLine: string;
  }
>;
