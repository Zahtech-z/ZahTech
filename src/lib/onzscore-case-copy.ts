import type { Lang } from "./i18n";

export function onzScreen(id: string, lang: Lang) {
  return `/images/onzscore/live/${id}-${lang === "fr" ? "fr" : "en"}.webp`;
}

type CaseCopy = {
  label: string;
  headline: string;
  introduction: string;
  visit: string;
  explore: string;
  role: string;
  roleValue: string;
  platform: string;
  platformValue: string;
  status: string;
  briefLabel: string;
  briefTitle: string;
  briefBody: string;
  responseTitle: string;
  responseBody: string;
  experienceLabel: string;
  experienceTitle: string;
  experienceBody: string;
  screens: {
    id: "matches" | "match" | "streaks" | "vip";
    title: string;
    body: string;
    alt: string;
  }[];
  imageNote: string;
  enlarge: string;
  mobileLabel: string;
  mobileTitle: string;
  mobileBody: string;
  mobileDetails: [string, string];
  engineeringLabel: string;
  engineeringTitle: string;
  engineeringBody: string;
  architecture: [string, string, string, string];
  architectureNote: string;
  outcomeLabel: string;
  outcomeTitle: string;
  outcomeBody: string;
  record: string;
  next: string;
  project: string;
};

export const onzscoreCaseCopy: Record<Lang, CaseCopy> = {
  en: {
    label: "OnzScore · Product design & engineering",
    headline: "The game.\nA clearer perspective.",
    introduction:
      "From the first screen to the analysis behind a match. A live football product, designed and built by ZahTech.",
    visit: "Visit OnzScore",
    explore: "Explore the case study",
    role: "Our role",
    roleValue: "Product design & engineering",
    platform: "Experience",
    platformValue: "Web · Mobile · English / French",
    status: "Live at onzscore.com",
    briefLabel: "01 / The brief",
    briefTitle: "Make the numbers\npart of the game.",
    briefBody:
      "Football data is dense. Probabilities, form and match statistics need context before they become useful. The challenge: bring them into a product people can understand, explore and return to on matchday.",
    responseTitle: "One connected product",
    responseBody:
      "ZahTech shaped the public website, the application experience and the engineering behind it. A consistent journey connects discovery, match exploration, detailed analysis and account access.",
    experienceLabel: "02 / The experience",
    experienceTitle: "From the overview\nto the detail.",
    experienceBody:
      "Four views of the same product. Each has a clear job, with football at the centre and the data within reach.",
    screens: [
      {
        id: "matches",
        title: "Read the matchday",
        body: "Find a match, scan its probabilities and move into the analysis. Dates, competitions and search give the information a familiar structure.",
        alt: "Current OnzScore match-list interface with illustrative football data",
      },
      {
        id: "match",
        title: "Understand the context",
        body: "A dedicated match view brings form, head-to-heads and goal statistics together, so the analysis has something concrete behind it.",
        alt: "Current OnzScore detailed match-analysis interface with illustrative data",
      },
      {
        id: "streaks",
        title: "See the bigger picture",
        body: "Team streaks put recent performance in perspective. A compact, consistent visual language makes teams and trends easy to compare.",
        alt: "Current OnzScore team-streaks interface with illustrative data",
      },
      {
        id: "vip",
        title: "Make access clear",
        body: "Free access and VIP have distinct roles. The product explains what is included before a visitor chooses to go further.",
        alt: "Current OnzScore VIP interface and plans with illustrative match data",
      },
    ],
    imageNote: "Official interface previews · illustrative match data",
    enlarge: "Open the full-size preview",
    mobileLabel: "03 / Made for matchday",
    mobileTitle: "A whole product.\nWithin reach.",
    mobileBody:
      "A browser experience that feels at home on a phone. Match navigation, saved selections and analysis share one interface, with English and French throughout.",
    mobileDetails: ["Responsive by design", "Installable from the browser"],
    engineeringLabel: "04 / Behind the interface",
    engineeringTitle: "The experience above.\nThe system underneath.",
    engineeringBody:
      "Product design and engineering meet in one delivery. A Next.js interface connects to dedicated services, with a shared data and delivery foundation.",
    architecture: ["Interface", "Dedicated services", "Data foundation", "Delivery"],
    architectureNote:
      "High-level engineering overview · technologies documented in the product audit",
    outcomeLabel: "05 / In the real world",
    outcomeTitle: "Designed. Built.\nNow live.",
    outcomeBody:
      "OnzScore is available at onzscore.com. Explore the current product and its public model record. The interface treats probabilities as information, with both hits and misses visible, never as a guaranteed result.",
    record: "View the public record",
    next: "Have a product\nworth building?",
    project: "Start your project",
  },
  fr: {
    label: "OnzScore · Design produit & ingénierie",
    headline: "Le jeu.\nUne autre lecture.",
    introduction:
      "Du premier écran à l’analyse d’un match. Un produit de football en ligne, conçu et développé par ZahTech.",
    visit: "Découvrir OnzScore",
    explore: "Explorer l’étude de cas",
    role: "Notre rôle",
    roleValue: "Design produit & ingénierie",
    platform: "Expérience",
    platformValue: "Web · Mobile · Français / Anglais",
    status: "En ligne sur onzscore.com",
    briefLabel: "01 / Le défi",
    briefTitle: "Donner du sens\naux chiffres du jeu.",
    briefBody:
      "Les données du football sont denses. Probabilités, forme et statistiques ont besoin de contexte pour devenir utiles. Le défi : les réunir dans un produit que l’on comprend, que l’on explore et que l’on retrouve les jours de match.",
    responseTitle: "Un produit cohérent",
    responseBody:
      "ZahTech a conçu le site public, l’expérience de l’application et son socle technique. Un même parcours relie la découverte du produit, l’exploration des matchs, les analyses détaillées et l’accès au compte.",
    experienceLabel: "02 / L’expérience",
    experienceTitle: "De la vue d’ensemble\nau détail du match.",
    experienceBody:
      "Quatre vues d’un même produit. Chacune a un rôle précis, avec le football au centre et les données à portée de main.",
    screens: [
      {
        id: "matches",
        title: "Lire la journée",
        body: "Trouver un match, consulter ses probabilités et ouvrir son analyse. Les dates, les compétitions et la recherche structurent l’information dans des repères familiers.",
        alt: "Interface actuelle de la liste des matchs OnzScore, avec données de football illustratives",
      },
      {
        id: "match",
        title: "Comprendre le contexte",
        body: "Une vue dédiée au match réunit forme récente, confrontations et statistiques de buts pour donner un fondement concret à l’analyse.",
        alt: "Interface actuelle d’analyse détaillée d’un match OnzScore, avec données illustratives",
      },
      {
        id: "streaks",
        title: "Prendre du recul",
        body: "Les séries d’équipes mettent les performances récentes en perspective. Un langage visuel compact et cohérent facilite la comparaison des équipes et des tendances.",
        alt: "Interface actuelle des séries d’équipes OnzScore, avec données illustratives",
      },
      {
        id: "vip",
        title: "Clarifier les accès",
        body: "L’accès gratuit et VIP ont des rôles distincts. Le produit explique ce qui est inclus avant que le visiteur choisisse d’aller plus loin.",
        alt: "Interface actuelle de l’offre VIP OnzScore, avec données de matchs illustratives",
      },
    ],
    imageNote: "Aperçus officiels de l’interface · données de matchs illustratives",
    enlarge: "Ouvrir l’aperçu en taille réelle",
    mobileLabel: "03 / Les jours de match",
    mobileTitle: "Tout un produit.\nÀ portée de main.",
    mobileBody:
      "Une expérience web pensée aussi pour le téléphone. Navigation entre les matchs, sélections enregistrées et analyses partagent la même interface, en français et en anglais.",
    mobileDetails: ["Conçu pour tous les écrans", "Installable depuis le navigateur"],
    engineeringLabel: "04 / Derrière l’interface",
    engineeringTitle: "L’expérience visible.\nLe système derrière.",
    engineeringBody:
      "Design produit et ingénierie se rejoignent dans une même réalisation. Une interface Next.js s’appuie sur des services dédiés, avec un socle commun pour les données et la livraison.",
    architecture: ["Interface", "Services dédiés", "Socle de données", "Livraison"],
    architectureNote:
      "Vue d’ensemble de l’ingénierie · technologies documentées dans l’audit du produit",
    outcomeLabel: "05 / Dans le réel",
    outcomeTitle: "Conçu. Développé.\nDésormais en ligne.",
    outcomeBody:
      "OnzScore est accessible sur onzscore.com. Découvrez le produit actuel et l’historique public du modèle. Les probabilités y sont présentées comme une information, avec les réussites et les échecs visibles, sans résultat garanti.",
    record: "Consulter l’historique public",
    next: "Un produit\nà concrétiser ?",
    project: "Démarrer votre projet",
  },
  es: {
    label: "OnzScore · Diseño de producto e ingeniería",
    headline: "El juego.\nOtra perspectiva.",
    introduction:
      "De la primera pantalla al análisis de un partido. Un producto de fútbol en línea, diseñado y desarrollado por ZahTech.",
    visit: "Descubrir OnzScore",
    explore: "Explorar el caso de estudio",
    role: "Nuestro papel",
    roleValue: "Diseño de producto e ingeniería",
    platform: "Experiencia",
    platformValue: "Web · Móvil · Inglés / Francés",
    status: "En línea en onzscore.com",
    briefLabel: "01 / El reto",
    briefTitle: "Dar sentido\na los datos del juego.",
    briefBody:
      "Los datos del fútbol son densos. Las probabilidades, la forma y las estadísticas necesitan contexto para resultar útiles. El reto: reunirlos en un producto que se pueda entender, explorar y volver a consultar cada jornada.",
    responseTitle: "Un producto conectado",
    responseBody:
      "ZahTech diseñó el sitio público, la experiencia de la aplicación y su base técnica. Un recorrido coherente conecta el descubrimiento, la exploración de partidos, el análisis detallado y el acceso a la cuenta.",
    experienceLabel: "02 / La experiencia",
    experienceTitle: "De la vista general\nal detalle.",
    experienceBody:
      "Cuatro vistas de un mismo producto. Cada una cumple un propósito, con el fútbol en el centro y los datos al alcance.",
    screens: [
      {
        id: "matches",
        title: "Leer la jornada",
        body: "Encontrar un partido, consultar sus probabilidades y abrir el análisis. Fechas, competiciones y búsqueda organizan la información con referencias familiares.",
        alt: "Interfaz actual de partidos de OnzScore con datos de fútbol ilustrativos, en inglés",
      },
      {
        id: "match",
        title: "Entender el contexto",
        body: "Una vista del partido reúne la forma reciente, los enfrentamientos y las estadísticas de goles para dar una base concreta al análisis.",
        alt: "Interfaz actual de análisis detallado de OnzScore con datos ilustrativos, en inglés",
      },
      {
        id: "streaks",
        title: "Ampliar la perspectiva",
        body: "Las rachas de los equipos ponen el rendimiento reciente en contexto. Un lenguaje visual compacto facilita la comparación de equipos y tendencias.",
        alt: "Interfaz actual de rachas de equipos de OnzScore con datos ilustrativos, en inglés",
      },
      {
        id: "vip",
        title: "Aclarar el acceso",
        body: "El acceso gratuito y VIP tienen funciones distintas. El producto explica qué incluye cada uno antes de que el visitante decida avanzar.",
        alt: "Interfaz actual de planes VIP de OnzScore con datos ilustrativos, en inglés",
      },
    ],
    imageNote:
      "Vistas oficiales de la interfaz · datos de partidos ilustrativos · interfaz en inglés",
    enlarge: "Abrir la vista a tamaño completo",
    mobileLabel: "03 / Para cada jornada",
    mobileTitle: "Todo un producto.\nSiempre a mano.",
    mobileBody:
      "Una experiencia web pensada también para el teléfono. Partidos, selecciones guardadas y análisis comparten una interfaz en inglés y francés.",
    mobileDetails: ["Diseño adaptable", "Instalable desde el navegador"],
    engineeringLabel: "04 / Detrás de la interfaz",
    engineeringTitle: "La experiencia visible.\nEl sistema detrás.",
    engineeringBody:
      "El diseño de producto y la ingeniería se unen en una misma entrega. Una interfaz Next.js conecta con servicios dedicados y una base compartida de datos y entrega.",
    architecture: ["Interfaz", "Servicios dedicados", "Base de datos", "Entrega"],
    architectureNote:
      "Vista general de ingeniería · tecnologías documentadas en la auditoría del producto",
    outcomeLabel: "05 / En el mundo real",
    outcomeTitle: "Diseñado. Desarrollado.\nYa disponible.",
    outcomeBody:
      "OnzScore está disponible en onzscore.com. Explora el producto actual y el historial público del modelo. Las probabilidades se presentan como información, con aciertos y fallos visibles, sin resultados garantizados.",
    record: "Ver el historial público",
    next: "¿Un producto\npor construir?",
    project: "Empezar tu proyecto",
  },
};
