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
  galleryNote: string;
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
  projects: { onzscore: ProjectPresentation };
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
      "Explore ZahTech-built software products and the product engineering behind OnzScore, a football intelligence and match analysis product.",
    caseStudySeo: "Product Engineering Case Study",
    projects: {
      onzscore: {
        category: "Football intelligence & match analysis",
        shortDescription:
          "Match probabilities, detailed analysis and team trends in a live, bilingual football product.",
        longDescription:
          "OnzScore brings football probabilities, detailed match analysis and team streaks into one English/French experience. It works in the browser and can be installed like an app. Its public model record includes hits and misses. OnzScore is a statistical analysis tool, not a betting service, and no result is guaranteed.",
        role: "ZahTech designed and built the product experience and its engineering system, from the public landing and account flows to the application frontend and backend services.",
        status: "Live at onzscore.com",
        stageDescription: "The product is publicly available at onzscore.com.",
        capabilities: {
          matches: {
            title: "Match intelligence",
            description: "Fixtures, date and league filters, scores and outcome probabilities.",
          },
          predictions: {
            title: "Daily free pick",
            description: "One fully analysed match each day, available without an account.",
          },
          tickets: {
            title: "Ready-made and personal coupons",
            description:
              "Steady, Balanced, Bold and Long Shot profiles, combined probabilities and tools to edit, copy, share and save.",
          },
          leagues: {
            title: "Competitions",
            description:
              "League tables and knockout brackets for club and international competitions.",
          },
          training: {
            title: "Training mode",
            description:
              "Make your own picks, earn points with no monetary value and compare your results with the model.",
          },
          record: {
            title: "Transparent track record",
            description:
              "Predictions locked at kick-off, results recorded after matches, and public accuracy and calibration views.",
          },
          account: {
            title: "Account and access",
            description:
              "English/French interface, saved coupons, referral rewards and WhatsApp support.",
          },
          pricing: {
            title: "Free and VIP",
            description:
              "The displayed offer includes a free tier and VIP at US$9.99/month with all 18 markets. Mobile Money and card payments are advertised.",
          },
        },
        views: {
          landing: "OnzScore / The live experience",
          matches: "Matches / probabilities",
          tickets: "Coupons / four profiles",
          leagues: "Competitions / tables and brackets",
          training: "Training / personal predictions",
          record: "Track record / published results",
          pricing: "Free and VIP / displayed offer",
        },
        seoDescription:
          "How ZahTech designed and built OnzScore, a live football product with match analysis, a bilingual mobile experience and dedicated backend services.",
        galleryNote:
          "Current official interface previews from onzscore.com. Match data is illustrative.",
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
      "Découvrez les produits logiciels créés par ZahTech et l’ingénierie d’OnzScore, un produit d’analyse de matchs de football.",
    caseStudySeo: "Étude de cas en ingénierie produit",
    projects: {
      onzscore: {
        category: "Données football & analyse de matchs",
        shortDescription:
          "Probabilités des matchs, analyses détaillées et tendances d’équipes dans un produit de football bilingue en ligne.",
        longDescription:
          "OnzScore réunit probabilités de football, analyses détaillées et séries d’équipes dans une expérience en français et en anglais. Le produit fonctionne dans le navigateur et peut s’installer comme une application. L’historique public du modèle présente réussites et échecs. OnzScore est un outil d’analyse statistique, pas un service de paris, et aucun résultat n’est garanti.",
        role: "ZahTech a conçu et développé l’expérience produit et son système logiciel, de la page publique et des parcours de compte à l’interface applicative et aux services backend.",
        status: "En ligne sur onzscore.com",
        stageDescription: "Le produit est accessible publiquement sur onzscore.com.",
        capabilities: {
          matches: {
            title: "Analyse des matchs",
            description:
              "Rencontres, filtres par date et par ligue, scores et probabilités des résultats.",
          },
          predictions: {
            title: "Pronostic gratuit quotidien",
            description: "Un match analysé chaque jour, accessible sans créer de compte.",
          },
          tickets: {
            title: "Coupons préparés et personnels",
            description:
              "Profils Steady, Balanced, Bold et Long Shot, probabilités combinées et outils pour modifier, copier, partager et enregistrer.",
          },
          leagues: {
            title: "Compétitions",
            description:
              "Classements des ligues et tableaux à élimination directe pour les clubs et les sélections nationales.",
          },
          training: {
            title: "Mode entraînement",
            description:
              "Faire ses propres pronostics, gagner des points sans valeur monétaire et comparer ses résultats à ceux du modèle.",
          },
          record: {
            title: "Historique transparent",
            description:
              "Pronostics figés au coup d’envoi, résultats enregistrés après les matchs et suivi public de la précision et de la calibration.",
          },
          account: {
            title: "Compte et accès",
            description:
              "Interface français/anglais, coupons enregistrés, récompenses de parrainage et assistance WhatsApp.",
          },
          pricing: {
            title: "Gratuit et VIP",
            description:
              "L’offre affichée comprend une formule gratuite et le VIP à 9,99 $ US/mois avec les 18 marchés. Les paiements Mobile Money et par carte sont annoncés.",
          },
        },
        views: {
          landing: "OnzScore / L’expérience en ligne",
          matches: "Matchs / probabilités",
          tickets: "Coupons / quatre profils",
          leagues: "Compétitions / classements et tableaux",
          training: "Entraînement / pronostics personnels",
          record: "Historique / résultats publiés",
          pricing: "Gratuit et VIP / offre affichée",
        },
        seoDescription:
          "Comment ZahTech a conçu et développé OnzScore, un produit de football en ligne avec analyses de matchs, expérience mobile bilingue et services backend dédiés.",
        galleryNote:
          "Aperçus officiels de l’interface actuelle issus d’onzscore.com. Les données de matchs sont illustratives.",
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
      "Explora los productos de software creados por ZahTech y la ingeniería de OnzScore, un producto de inteligencia y análisis de partidos de fútbol.",
    caseStudySeo: "Caso de estudio de ingeniería de producto",
    projects: {
      onzscore: {
        category: "Inteligencia de fútbol y análisis de partidos",
        shortDescription:
          "Probabilidades, análisis detallado y tendencias de equipos en un producto de fútbol bilingüe en línea.",
        longDescription:
          "OnzScore reúne probabilidades de fútbol, análisis detallado y rachas de equipos en una experiencia en inglés y francés. Funciona en el navegador y puede instalarse como una aplicación. El historial público incluye aciertos y fallos. OnzScore es una herramienta de análisis estadístico, no un servicio de apuestas, y ningún resultado está garantizado.",
        role: "ZahTech diseñó y desarrolló la experiencia del producto y su sistema de software, desde la página pública y los flujos de cuenta hasta la interfaz de la aplicación y los servicios backend.",
        status: "En línea en onzscore.com",
        stageDescription: "El producto está disponible públicamente en onzscore.com.",
        capabilities: {
          matches: {
            title: "Análisis de partidos",
            description:
              "Encuentros, filtros por fecha y liga, marcadores y probabilidades de resultados.",
          },
          predictions: {
            title: "Pronóstico diario gratuito",
            description: "Un partido analizado cada día, accesible sin cuenta.",
          },
          tickets: {
            title: "Cupones preparados y personales",
            description:
              "Perfiles Steady, Balanced, Bold y Long Shot, probabilidades combinadas y opciones para editar, copiar, compartir y guardar.",
          },
          leagues: {
            title: "Competiciones",
            description:
              "Clasificaciones y cuadros eliminatorios de competiciones de clubes y selecciones.",
          },
          training: {
            title: "Modo de práctica",
            description:
              "Haz tus pronósticos, gana puntos sin valor monetario y compara tus resultados con el modelo.",
          },
          record: {
            title: "Historial transparente",
            description:
              "Pronósticos fijados al inicio, resultados registrados tras los partidos y vistas públicas de precisión y calibración.",
          },
          account: {
            title: "Cuenta y acceso",
            description:
              "Interfaz en inglés y francés, cupones guardados, recompensas por referidos y asistencia por WhatsApp.",
          },
          pricing: {
            title: "Gratis y VIP",
            description:
              "La oferta mostrada incluye un nivel gratuito y VIP por US$9,99/mes con los 18 mercados. Se anuncian pagos por Mobile Money y tarjeta.",
          },
        },
        views: {
          landing: "OnzScore / La experiencia en línea",
          matches: "Partidos / probabilidades",
          tickets: "Cupones / cuatro perfiles",
          leagues: "Competiciones / clasificaciones y cuadros",
          training: "Práctica / pronósticos personales",
          record: "Historial / resultados publicados",
          pricing: "Gratis y VIP / oferta mostrada",
        },
        seoDescription:
          "Cómo ZahTech diseñó y desarrolló OnzScore, un producto de fútbol en línea con análisis de partidos, experiencia móvil bilingüe y servicios backend dedicados.",
        galleryNote:
          "Vistas oficiales de la interfaz actual de onzscore.com. Los datos de partidos son ilustrativos.",
      },
    },
  },
};
