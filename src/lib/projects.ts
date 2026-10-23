import type { Lang } from "./i18n";

export type CapabilityId =
  "matches" | "predictions" | "tickets" | "leagues" | "training" | "record" | "account" | "pricing";
export type ViewId =
  "landing" | "matches" | "tickets" | "leagues" | "training" | "record" | "pricing";
export type EngineeringLayer = "frontend" | "services" | "data" | "gateway" | "delivery";
export type ProjectId = "onzscore";

export type ProjectImage = {
  src: string;
  width: number;
  height: number;
  alt: Record<Lang, string>;
};

export type PortfolioProject = {
  slug: ProjectId;
  name: string;
  category?: "football-intelligence";
  status?: "production-preparation";
  role?: "product-design-and-engineering";
  capabilities: readonly CapabilityId[];
  engineering: readonly { id: EngineeringLayer; items: readonly string[] }[];
  featuredTechnologies: readonly string[];
  views: readonly { id: ViewId; image?: ProjectImage }[];
  externalUrl?: string;
  repository?: { visibility: "public" | "private"; url?: string };
};

// Engineering facts retained from the owner’s product audit; screenshots supplied in October 2026.
// Screenshots do not establish deployment status or verified payment processing.
export const onzScore: PortfolioProject = {
  slug: "onzscore",
  name: "OnzScore",
  category: "football-intelligence",
  status: "production-preparation",
  role: "product-design-and-engineering",
  capabilities: [
    "matches",
    "predictions",
    "tickets",
    "leagues",
    "training",
    "record",
    "account",
    "pricing",
  ],
  engineering: [
    {
      id: "frontend",
      items: ["Next.js", "TypeScript"],
    },
    {
      id: "services",
      items: ["Auth", "Match", "Prediction", "Notification"],
    },
    {
      id: "data",
      items: ["PostgreSQL", "Redis"],
    },
    {
      id: "gateway",
      items: ["Nginx"],
    },
    {
      id: "delivery",
      items: ["Docker", "Docker Compose", "GitHub Actions CI"],
    },
  ],
  featuredTechnologies: ["Next.js", "TypeScript", "PostgreSQL"],
  views: [
    {
      id: "landing",
      image: {
        src: "/images/onzscore/onzscore-landing.webp",
        width: 1888,
        height: 988,
        alt: {
          en: "OnzScore — Landing / OnzScore identity.",
          fr: "OnzScore — Accueil / identité OnzScore.",
          es: "OnzScore — Inicio / identidad OnzScore.",
        },
      },
    },
    {
      id: "matches",
      image: {
        src: "/images/onzscore/onzscore-matches.webp",
        width: 1894,
        height: 1005,
        alt: {
          en: "OnzScore — Matches / probabilities.",
          fr: "OnzScore — Matchs / probabilités.",
          es: "OnzScore — Partidos / probabilidades.",
        },
      },
    },
    {
      id: "tickets",
      image: {
        src: "/images/onzscore/onzscore-tickets.webp",
        width: 1894,
        height: 1026,
        alt: {
          en: "OnzScore — Coupons / four profiles.",
          fr: "OnzScore — Coupons / quatre profils.",
          es: "OnzScore — Cupones / cuatro perfiles.",
        },
      },
    },
    {
      id: "leagues",
      image: {
        src: "/images/onzscore/onzscore-leagues.webp",
        width: 1848,
        height: 1014,
        alt: {
          en: "OnzScore — Competitions / tables and brackets.",
          fr: "OnzScore — Compétitions / classements et tableaux.",
          es: "OnzScore — Competiciones / clasificaciones y cuadros.",
        },
      },
    },
    {
      id: "training",
      image: {
        src: "/images/onzscore/onzscore-training.webp",
        width: 1441,
        height: 772,
        alt: {
          en: "OnzScore — Training / personal predictions.",
          fr: "OnzScore — Entraînement / pronostics personnels.",
          es: "OnzScore — Práctica / pronósticos personales.",
        },
      },
    },
    {
      id: "record",
      image: {
        src: "/images/onzscore/onzscore-record.webp",
        width: 1468,
        height: 978,
        alt: {
          en: "OnzScore — Track record / published results.",
          fr: "OnzScore — Historique / résultats publiés.",
          es: "OnzScore — Historial / resultados publicados.",
        },
      },
    },
    {
      id: "pricing",
      image: {
        src: "/images/onzscore/onzscore-pricing.webp",
        width: 1909,
        height: 951,
        alt: {
          en: "OnzScore — Free and VIP / displayed offer.",
          fr: "OnzScore — Gratuit et VIP / offre affichée.",
          es: "OnzScore — Gratis y VIP / oferta mostrada.",
        },
      },
    },
  ],
};

export const projects = [onzScore] as const;
