import type { Lang } from "./i18n";

export type CapabilityId = "matches" | "predictions" | "tickets" | "leagues" | "account";
export type ViewId = "landing" | "matches" | "predictions" | "tickets";
export type EngineeringLayer = "frontend" | "services" | "data" | "gateway" | "delivery";
export type ProjectId = "matchwise";

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

// Facts supplied by the owner after a separate product-repository audit.
// Deployment, commercial results, external URLs and screenshots are not inferred.
export const matchWise: PortfolioProject = {
  slug: "matchwise",
  name: "MatchWise",
  category: "football-intelligence",
  status: "production-preparation",
  role: "product-design-and-engineering",
  capabilities: ["matches", "predictions", "tickets", "leagues", "account"],
  engineering: [
    { id: "frontend", items: ["Next.js", "TypeScript"] },
    { id: "services", items: ["Auth", "Match", "Prediction", "Notification"] },
    { id: "data", items: ["PostgreSQL", "Redis"] },
    { id: "gateway", items: ["Nginx"] },
    { id: "delivery", items: ["Docker", "Docker Compose", "GitHub Actions CI"] },
  ],
  featuredTechnologies: ["Next.js", "TypeScript", "PostgreSQL"],
  views: [
    {
      id: "landing",
      image: {
        src: "/images/matchwise/matchwise-landing.png",
        width: 1903,
        height: 913,
        alt: {
          en: "MatchWise landing page with ?Understand the match? headline and football product imagery.",
          fr: "Page d?accueil MatchWise avec le titre ? Understand the match ? et des visuels du produit d?di? au football.",
          es: "P?gina de inicio de MatchWise con el t?tulo ?Understand the match? e im?genes del producto de f?tbol.",
        },
      },
    },
    {
      id: "matches",
      image: {
        src: "/images/matchwise/matchwise-matches.png",
        width: 1902,
        height: 910,
        alt: {
          en: "MatchWise matches workspace with date and league filters and a populated football fixture board.",
          fr: "Espace matchs de MatchWise avec filtres de date et de ligue et tableau de rencontres de football renseign?.",
          es: "Espacio de partidos de MatchWise con filtros de fecha y liga y un tablero de encuentros de f?tbol con datos.",
        },
      },
    },
    {
      id: "predictions",
      image: {
        src: "/images/matchwise/matchwise-predictions.png",
        width: 1897,
        height: 765,
        alt: {
          en: "MatchWise Predictions workspace with confidence filters and the empty state ?No predictions published yet?.",
          fr: "Espace Predictions de MatchWise avec filtres de confiance et ?tat vide indiquant qu?aucune pr?diction n?est encore publi?e.",
          es: "Espacio Predictions de MatchWise con filtros de confianza y un estado vac?o que indica que a?n no hay predicciones publicadas.",
        },
      },
    },
    {
      id: "tickets",
      image: {
        src: "/images/matchwise/matchwise-signal-sets.png",
        width: 1885,
        height: 846,
        alt: {
          en: "MatchWise Picks workspace with signal-set profiles and an empty state indicating no signal sets are available for the selected level.",
          fr: "Espace Picks de MatchWise avec profils de signaux et ?tat vide indiquant qu?aucun ensemble de signaux n?est disponible pour le niveau s?lectionn?.",
          es: "Espacio Picks de MatchWise con perfiles de se?ales y un estado vac?o que indica que no hay conjuntos de se?ales disponibles para el nivel seleccionado.",
        },
      },
    },
  ],
};

// The portfolio can grow without duplicating project records in page components.
export const projects = [matchWise] as const;
