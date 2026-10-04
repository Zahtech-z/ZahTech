import type { Lang } from "./i18n";

type BlogCopy = {
  eyebrow: string;
  heading: string;
  introduction: string;
  statusHeading: string;
  statusBody: string;
  statusNote: string;
  topicsHeading: string;
  topics: readonly { title: string; description: string }[];
  cta: string;
  seoTitle: string;
  seoDescription: string;
};

export const blogCopy: Record<Lang, BlogCopy> = {
  en: {
    eyebrow: "Insights",
    heading: "Notes on building software.",
    introduction:
      "Engineering decisions, product thinking, cloud infrastructure, AI, and lessons from building digital products at ZahTech.",
    statusHeading: "Writing in progress.",
    statusBody:
      "We’re preparing practical notes on product development, infrastructure, AI, and the engineering decisions behind the products we build.",
    statusNote: "New writing will appear here as it is published.",
    topicsHeading: "Topics",
    topics: [
      {
        title: "Product",
        description:
          "Product decisions, UX, architecture, and the path from idea to working software.",
      },
      {
        title: "Engineering",
        description:
          "Application development, systems, APIs, reliability, and technical tradeoffs.",
      },
      {
        title: "Cloud & DevOps",
        description:
          "Infrastructure, containers, deployment pipelines, automation, and production operations.",
      },
      {
        title: "Applied AI",
        description: "Practical uses of AI inside products, workflows, and engineering.",
      },
    ],
    cta: "Have a product to build?",
    seoTitle: "Blog | ZahTech",
    seoDescription: "Engineering, product, cloud, DevOps, and applied AI notes from ZahTech.",
  },
  fr: {
    eyebrow: "Perspectives",
    heading: "Notes sur la création de logiciels.",
    introduction:
      "Décisions d’ingénierie, réflexion produit, infrastructure cloud, IA et enseignements tirés de la création de produits numériques chez ZahTech.",
    statusHeading: "Écriture en cours.",
    statusBody:
      "Nous préparons des notes pratiques sur le développement produit, l’infrastructure, l’IA et les décisions d’ingénierie qui façonnent les produits que nous créons.",
    statusNote: "Nos articles paraîtront ici au fil de leur publication.",
    topicsHeading: "Thématiques",
    topics: [
      {
        title: "Produit",
        description:
          "Choix produit, UX, architecture et passage de l’idée à un logiciel fonctionnel.",
      },
      {
        title: "Ingénierie",
        description:
          "Développement d’applications, systèmes, API, fiabilité et compromis techniques.",
      },
      {
        title: "Cloud & DevOps",
        description:
          "Infrastructure, conteneurs, pipelines de déploiement, automatisation et exploitation en production.",
      },
      {
        title: "IA appliquée",
        description:
          "Usages concrets de l’IA dans les produits, les processus de travail et l’ingénierie.",
      },
    ],
    cta: "Un produit à créer ?",
    seoTitle: "Blog | ZahTech",
    seoDescription:
      "Notes de ZahTech sur l’ingénierie, le produit, le cloud, le DevOps et l’IA appliquée.",
  },
  es: {
    eyebrow: "Perspectivas",
    heading: "Notas sobre cómo construimos software.",
    introduction:
      "Decisiones de ingeniería, producto, infraestructura cloud, IA y aprendizajes obtenidos al crear productos digitales en ZahTech.",
    statusHeading: "Estamos escribiendo.",
    statusBody:
      "Estamos preparando notas prácticas sobre desarrollo de producto, infraestructura, IA y las decisiones de ingeniería detrás de los productos que construimos.",
    statusNote: "Los nuevos artículos aparecerán aquí a medida que se publiquen.",
    topicsHeading: "Temas",
    topics: [
      {
        title: "Producto",
        description:
          "Decisiones de producto, UX, arquitectura y el camino desde una idea hasta un software funcional.",
      },
      {
        title: "Ingeniería",
        description:
          "Desarrollo de aplicaciones, sistemas, APIs, fiabilidad y decisiones entre alternativas técnicas.",
      },
      {
        title: "Cloud y DevOps",
        description:
          "Infraestructura, contenedores, pipelines de despliegue, automatización y operaciones en producción.",
      },
      {
        title: "IA aplicada",
        description: "Usos prácticos de la IA en productos, flujos de trabajo e ingeniería.",
      },
    ],
    cta: "¿Tienes un producto en mente?",
    seoTitle: "Blog | ZahTech",
    seoDescription: "Notas de ZahTech sobre ingeniería, producto, cloud, DevOps e IA aplicada.",
  },
};
