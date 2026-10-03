import type { Lang } from "./i18n";
import type { CapabilityId, EngineeringLayer, ViewId } from "./projects";

type ProjectPresentation = {
  category: string;
  shortDescription: string;
  longDescription: string;
  role: string;
  status: string;
  stageDescription: string;
  capabilities: Record<CapabilityId, { title: string; description: string }>;
  views: Record<ViewId, string>;
  seoDescription: string;
};

type WorkCopy = {
  title: string;
  intro: string;
  ownership: string;
  caseStudy: string;
  back: string;
  product: string;
  capabilities: string;
  role: string;
  engineering: string;
  engineeringIntro: string;
  layers: Record<EngineeringLayer, string>;
  gallery: string;
  pendingImage: string;
  stage: string;
  cta: string;
  seoTitle: string;
  seoDescription: string;
  caseStudySeo: string;
  projects: { matchwise: ProjectPresentation };
};

// Presentation copy is separate from the language-independent project facts.
export const workCopy: Record<Lang, WorkCopy> = {
  en: {
    title: "Selected Work",
    intro:
      "Products designed and built by ZahTech. A closer look at the software and the engineering behind it.",
    ownership: "A ZahTech-built product",
    caseStudy: "View case study",
    back: "Back to work",
    product: "The product",
    capabilities: "Product capabilities",
    role: "ZahTech’s role",
    engineering: "Engineering",
    engineeringIntro:
      "A Next.js frontend connected to dedicated backend services, with a shared data and delivery foundation.",
    layers: {
      frontend: "Frontend",
      services: "Services",
      data: "Data",
      gateway: "Gateway",
      delivery: "Delivery",
    },
    gallery: "Product views",
    pendingImage: "Product screenshot pending",
    stage: "Current stage",
    cta: "Have a product to build?",
    seoTitle: "Selected Work | ZahTech",
    seoDescription:
      "Explore ZahTech-built software products and the product engineering behind MatchWise, a football intelligence and match analysis product.",
    caseStudySeo: "Product Engineering Case Study",
    projects: {
      matchwise: {
        category: "Football intelligence & match analysis",
        shortDescription:
          "Match intelligence, prediction analysis and ticket tools in one football product.",
        longDescription:
          "Football analysis brings together fixtures, league context and prediction data. MatchWise connects these views with match analysis, smart picks and ticket intelligence, giving people a place to explore the information together.",
        role: "ZahTech designed and built the product experience and its engineering system, from the public landing and account flows to the application frontend and backend services.",
        status: "Preparing for production",
        stageDescription:
          "Product development continues with production hardening and deployment preparation.",
        capabilities: {
          matches: {
            title: "Match intelligence",
            description: "Football fixtures, match data and analysis.",
          },
          predictions: {
            title: "Prediction analysis",
            description: "Predictions and analysis across multiple market categories.",
          },
          tickets: {
            title: "Ticket intelligence",
            description: "Ticket construction, model signals and analysis tools.",
          },
          leagues: {
            title: "League context",
            description: "Leagues, statistics, standings and odds-related data.",
          },
          account: {
            title: "Account experience",
            description: "Registration, authentication, profile and an authenticated dashboard.",
          },
        },
        views: {
          landing: "Landing / product identity",
          matches: "Match intelligence",
          predictions: "Prediction & market analysis",
          tickets: "Ticket intelligence / signals",
        },
        seoDescription:
          "How ZahTech designed and built MatchWise: football intelligence, match analysis and software engineering across a Next.js frontend and backend services. Preparing for production.",
      },
    },
  },
  fr: {
    title: "Réalisations choisies",
    intro:
      "Des produits conçus et développés par ZahTech. Découvrez les logiciels et l’ingénierie qui les rend possibles.",
    ownership: "Un produit créé par ZahTech",
    caseStudy: "Voir l’étude de cas",
    back: "Retour aux réalisations",
    product: "Le produit",
    capabilities: "Fonctionnalités du produit",
    role: "Le rôle de ZahTech",
    engineering: "Ingénierie",
    engineeringIntro:
      "Une interface Next.js reliée à des services backend dédiés, avec un socle commun pour les données et la livraison.",
    layers: {
      frontend: "Frontend",
      services: "Services",
      data: "Données",
      gateway: "Passerelle",
      delivery: "Livraison",
    },
    gallery: "Vues du produit",
    pendingImage: "Capture du produit à venir",
    stage: "Étape actuelle",
    cta: "Un produit à développer ?",
    seoTitle: "Réalisations choisies | ZahTech",
    seoDescription:
      "Découvrez les produits logiciels créés par ZahTech et l’ingénierie de MatchWise, un produit d’analyse de matchs de football.",
    caseStudySeo: "Étude de cas en ingénierie produit",
    projects: {
      matchwise: {
        category: "Données football & analyse de matchs",
        shortDescription:
          "Données de matchs, analyse de prédictions et outils de composition de tickets dans un même produit dédié au football.",
        longDescription:
          "L’analyse du football rassemble calendriers de matchs, contexte des ligues et données de prédiction. MatchWise relie ces vues à l’analyse de matchs, aux sélections guidées par des signaux et aux outils de tickets pour explorer ces informations ensemble.",
        role: "ZahTech a conçu et développé l’expérience produit et son système logiciel, de la page publique et des parcours de compte à l’interface applicative et aux services backend.",
        status: "Préparation à la production",
        stageDescription:
          "Le développement se poursuit avec la consolidation du produit et la préparation de son déploiement en production.",
        capabilities: {
          matches: {
            title: "Analyse de matchs",
            description: "Calendriers, données et analyse des matchs de football.",
          },
          predictions: {
            title: "Analyse des prédictions",
            description: "Prédictions et analyses couvrant plusieurs catégories de marchés.",
          },
          tickets: {
            title: "Analyse des tickets",
            description: "Composition de tickets, signaux du modèle et outils d’analyse.",
          },
          leagues: {
            title: "Contexte des ligues",
            description: "Ligues, statistiques, classements et données de cotes.",
          },
          account: {
            title: "Espace personnel",
            description: "Inscription, authentification, profil et tableau de bord connecté.",
          },
        },
        views: {
          landing: "Accueil / identité du produit",
          matches: "Analyse de matchs",
          predictions: "Prédictions & analyse des marchés",
          tickets: "Analyse des tickets / signaux",
        },
        seoDescription:
          "Comment ZahTech a conçu et développé MatchWise : analyse de football, données de matchs et ingénierie logicielle avec Next.js et des services backend. Préparation à la production.",
      },
    },
  },
  es: {
    title: "Proyectos destacados",
    intro:
      "Productos diseñados y desarrollados por ZahTech. Una mirada al software y a la ingeniería que lo hace posible.",
    ownership: "Un producto creado por ZahTech",
    caseStudy: "Ver caso de estudio",
    back: "Volver a proyectos",
    product: "El producto",
    capabilities: "Funciones del producto",
    role: "El papel de ZahTech",
    engineering: "Ingeniería",
    engineeringIntro:
      "Una interfaz Next.js conectada a servicios backend dedicados, con una base compartida de datos y entrega.",
    layers: {
      frontend: "Frontend",
      services: "Servicios",
      data: "Datos",
      gateway: "Puerta de enlace",
      delivery: "Entrega",
    },
    gallery: "Vistas del producto",
    pendingImage: "Captura del producto pendiente",
    stage: "Etapa actual",
    cta: "¿Tienes un producto que desarrollar?",
    seoTitle: "Proyectos destacados | ZahTech",
    seoDescription:
      "Explora los productos de software creados por ZahTech y la ingeniería de MatchWise, un producto de inteligencia y análisis de partidos de fútbol.",
    caseStudySeo: "Caso de estudio de ingeniería de producto",
    projects: {
      matchwise: {
        category: "Inteligencia de fútbol y análisis de partidos",
        shortDescription:
          "Información de partidos, análisis de predicciones y herramientas de tickets en un solo producto de fútbol.",
        longDescription:
          "El análisis del fútbol reúne calendarios de partidos, contexto de ligas y datos de predicción. MatchWise conecta estas vistas con análisis de partidos, selecciones basadas en señales y herramientas de tickets para explorar la información en conjunto.",
        role: "ZahTech diseñó y desarrolló la experiencia del producto y su sistema de software, desde la página pública y los flujos de cuenta hasta la interfaz de la aplicación y los servicios backend.",
        status: "Preparación para producción",
        stageDescription:
          "El desarrollo continúa con el refuerzo del producto y la preparación de su despliegue en producción.",
        capabilities: {
          matches: {
            title: "Inteligencia de partidos",
            description: "Calendarios, datos y análisis de partidos de fútbol.",
          },
          predictions: {
            title: "Análisis de predicciones",
            description: "Predicciones y análisis en varias categorías de mercados.",
          },
          tickets: {
            title: "Inteligencia de tickets",
            description: "Construcción de tickets, señales del modelo y herramientas de análisis.",
          },
          leagues: {
            title: "Contexto de ligas",
            description: "Ligas, estadísticas, clasificaciones y datos de cuotas.",
          },
          account: {
            title: "Experiencia de cuenta",
            description: "Registro, autenticación, perfil y panel para usuarios autenticados.",
          },
        },
        views: {
          landing: "Inicio / identidad del producto",
          matches: "Inteligencia de partidos",
          predictions: "Predicciones y análisis de mercados",
          tickets: "Inteligencia de tickets / señales",
        },
        seoDescription:
          "Cómo ZahTech diseñó y desarrolló MatchWise: inteligencia de fútbol, análisis de partidos e ingeniería de software con Next.js y servicios backend. En preparación para producción.",
      },
    },
  },
};
