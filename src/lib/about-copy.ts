import type { Lang } from "./i18n";

type Row = { title: string; description: string };
type FounderCopy = { eyebrow: string; name: string; role: string; description: string };
type AboutCopy = {
  eyebrow: string;
  heading: [string, string];
  introduction: string;
  statement: string;
  founder: FounderCopy;
  thinking: string;
  principles: [Row, Row, Row];
  disciplinesHeading: [string, string];
  disciplinesIntro: string;
  disciplines: [Row, Row, Row, Row];
  locationHeading: [string, string];
  location: string;
  cta: string;
  seoTitle: string;
  seoDescription: string;
};

export const aboutCopy: Record<Lang, AboutCopy> = {
  en: {
    eyebrow: "Company",
    heading: ["We build software", "to move ideas forward."],
    introduction:
      "ZahTech is a Maryland-based software company designing, building, and deploying digital products for businesses and founders.",
    statement:
      "We work across product development, cloud infrastructure, AI, and technical operations — connecting the pieces required to move from an idea to a working product.",
    founder: {
      eyebrow: "Founder-led",
      name: "Anicet Hermann Zie",
      role: "Founder & CEO, ZahTech LLC",
      description:
        "ZahTech is founder-led, with Anicet directly involved in designing, building, and delivering practical digital products across app development, cloud & DevOps, and AI-powered builds.",
    },
    thinking: "How we think.",
    principles: [
      {
        title: "Build with purpose",
        description:
          "Technology should solve a real problem. We begin with the product, the people using it, and what the software needs to accomplish.",
      },
      {
        title: "Engineer for reality",
        description:
          "A product has to work beyond the interface. Application code, infrastructure, data, deployment, and operations are treated as one engineering system.",
      },
      {
        title: "Keep moving",
        description:
          "We favor focused releases, practical decisions, and systems that can evolve as the product grows.",
      },
    ],
    disciplinesHeading: ["One product.", "Connected disciplines."],
    disciplinesIntro:
      "Building software requires more than writing application code. ZahTech connects product thinking and engineering across the software lifecycle.",
    disciplines: [
      {
        title: "Product",
        description: "Product direction, user experience, and application development.",
      },
      {
        title: "Infrastructure",
        description: "Cloud environments, deployment systems, containers, and operations.",
      },
      {
        title: "Intelligence",
        description:
          "Practical AI capabilities, data, and automation integrated where they create value.",
      },
      {
        title: "Production",
        description:
          "Release preparation, monitoring, maintenance, and continued technical support.",
      },
    ],
    locationHeading: ["Based in Maryland.", "Building worldwide."],
    location:
      "ZahTech is based in Maryland and builds digital products for businesses and founders wherever they operate.",
    cta: "Have a product to build?",
    seoTitle: "About ZahTech | Software, AI & Cloud Engineering",
    seoDescription:
      "Learn how ZahTech approaches product development, cloud engineering, AI, and software delivery from idea to production.",
  },
  fr: {
    eyebrow: "Entreprise",
    heading: ["Nous créons des logiciels", "pour faire avancer les idées."],
    introduction:
      "ZahTech est une entreprise de logiciels basée dans le Maryland. Nous concevons, développons et déployons des produits numériques pour les entreprises et les entrepreneurs.",
    statement:
      "Développement produit, infrastructure cloud, IA et exploitation technique : nous relions les compétences nécessaires pour passer d’une idée à un produit fonctionnel.",
    founder: {
      eyebrow: "Dirigée par son fondateur",
      name: "Anicet Hermann Zie",
      role: "Founder & CEO, ZahTech LLC",
      description:
        "ZahTech est dirigée par son fondateur, Anicet, directement impliqué dans la conception, la création et la livraison de produits numériques concrets en développement d’applications, cloud & DevOps et solutions enrichies par l’IA.",
    },
    thinking: "Notre approche.",
    principles: [
      {
        title: "Construire avec un objectif clair",
        description:
          "La technologie doit répondre à un problème concret. Nous partons du produit, des personnes qui l’utilisent et de ce que le logiciel doit accomplir.",
      },
      {
        title: "Concevoir pour le réel",
        description:
          "Un produit doit fonctionner au-delà de son interface. Code applicatif, infrastructure, données, déploiement et exploitation forment un seul système d’ingénierie.",
      },
      {
        title: "Continuer à avancer",
        description:
          "Nous privilégions des versions ciblées, des décisions pragmatiques et des systèmes capables d’évoluer avec le produit.",
      },
    ],
    disciplinesHeading: ["Un produit.", "Des disciplines reliées."],
    disciplinesIntro:
      "Créer un logiciel ne se limite pas au code applicatif. ZahTech relie réflexion produit et ingénierie tout au long du cycle de vie du logiciel.",
    disciplines: [
      {
        title: "Produit",
        description: "Orientation produit, expérience utilisateur et développement d’applications.",
      },
      {
        title: "Infrastructure",
        description: "Environnements cloud, systèmes de déploiement, conteneurs et exploitation.",
      },
      {
        title: "Intelligence",
        description:
          "IA appliquée, données et automatisation intégrées là où elles apportent de la valeur.",
      },
      {
        title: "Production",
        description:
          "Préparation des mises en production, supervision, maintenance et accompagnement technique dans la durée.",
      },
    ],
    locationHeading: ["Basés dans le Maryland.", "Des projets sans frontières."],
    location:
      "ZahTech est basée dans le Maryland et crée des produits numériques pour les entreprises et les entrepreneurs, où qu’ils exercent leur activité.",
    cta: "Un produit à créer ?",
    seoTitle: "À propos de ZahTech | Logiciels, IA et ingénierie cloud",
    seoDescription:
      "Découvrez l’approche de ZahTech en développement produit, ingénierie cloud, IA et réalisation de logiciels, de l’idée à la production.",
  },
  es: {
    eyebrow: "Empresa",
    heading: ["Creamos software", "para impulsar las ideas."],
    introduction:
      "ZahTech es una empresa de software con sede en Maryland que diseña, desarrolla y despliega productos digitales para empresas y emprendedores.",
    statement:
      "Trabajamos en desarrollo de producto, infraestructura cloud, IA y operaciones técnicas, conectando las piezas necesarias para convertir una idea en un producto funcional.",
    founder: {
      eyebrow: "Liderada por su fundador",
      name: "Anicet Hermann Zie",
      role: "Founder & CEO, ZahTech LLC",
      description:
        "ZahTech está liderada por su fundador, Anicet, quien participa directamente en el diseño, la creación y la entrega de productos digitales prácticos de desarrollo de aplicaciones, cloud y DevOps, y soluciones con IA.",
    },
    thinking: "Nuestra forma de pensar.",
    principles: [
      {
        title: "Construir con propósito",
        description:
          "La tecnología debe resolver un problema real. Partimos del producto, de las personas que lo utilizan y de lo que el software debe lograr.",
      },
      {
        title: "Diseñar para la realidad",
        description:
          "Un producto debe funcionar más allá de la interfaz. El código, la infraestructura, los datos, el despliegue y las operaciones se abordan como un único sistema de ingeniería.",
      },
      {
        title: "Seguir avanzando",
        description:
          "Priorizamos entregas de alcance definido, decisiones prácticas y sistemas capaces de evolucionar a medida que crece el producto.",
      },
    ],
    disciplinesHeading: ["Un producto.", "Disciplinas conectadas."],
    disciplinesIntro:
      "Crear software exige más que escribir código. ZahTech conecta la visión de producto y la ingeniería durante todo el ciclo de vida del software.",
    disciplines: [
      {
        title: "Producto",
        description: "Dirección de producto, experiencia de usuario y desarrollo de aplicaciones.",
      },
      {
        title: "Infraestructura",
        description: "Entornos cloud, sistemas de despliegue, contenedores y operaciones.",
      },
      {
        title: "Inteligencia",
        description:
          "Funciones prácticas de IA, datos y automatización integrados donde aportan valor.",
      },
      {
        title: "Producción",
        description:
          "Preparación de lanzamientos, supervisión, mantenimiento y soporte técnico continuo.",
      },
    ],
    locationHeading: ["Desde Maryland.", "Para todo el mundo."],
    location:
      "ZahTech tiene su sede en Maryland y desarrolla productos digitales para empresas y emprendedores, dondequiera que operen.",
    cta: "¿Tienes un producto en mente?",
    seoTitle: "Acerca de ZahTech | Software, IA e ingeniería cloud",
    seoDescription:
      "Conoce cómo ZahTech aborda el desarrollo de producto, la ingeniería cloud, la IA y la entrega de software, desde la idea hasta la producción.",
  },
};
