import type { Lang } from "./i18n";

/** Copy scoped to the V2 navigation and hero; other sections retain their copy. */
export const heroCopy = {
  en: {
    eyebrow: "SOFTWARE · AI · CLOUD",
    heading1: "We turn ambitious ideas",
    heading2: "into working software.",
    description:
      "ZahTech designs, builds, and deploys digital products for businesses and founders from the first idea to production.",
    project: "Start a project",
    work: "Explore our work",
    location: "Based in Maryland. Building worldwide.",
    progression: "From idea to production",
    stages: ["Idea", "Build", "Deploy", "Scale"],
    navigation: "Main navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
  },
  fr: {
    eyebrow: "LOGICIEL · IA · CLOUD",
    heading1: "Vos idées ambitieuses,",
    heading2: "des logiciels concrets.",
    description:
      "ZahTech conçoit, développe et déploie des produits numériques pour les entreprises et les entrepreneurs de la première idée à la mise en production.",
    project: "Démarrer un projet",
    work: "Voir nos réalisations",
    location: "Basés dans le Maryland. Nous construisons pour le monde entier.",
    progression: "De l’idée à la production",
    stages: ["Idée", "Création", "Déploiement", "Évolution"],
    navigation: "Navigation principale",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    language: "Langue",
  },
  es: {
    eyebrow: "SOFTWARE · IA · CLOUD",
    heading1: "Convertimos ideas ambiciosas",
    heading2: "en software que funciona.",
    description:
      "ZahTech diseña, desarrolla y despliega productos digitales para empresas y emprendedores desde la primera idea hasta la producción.",
    project: "Iniciar un proyecto",
    work: "Explora nuestro trabajo",
    location: "Desde Maryland. Construimos para todo el mundo.",
    progression: "De la idea a la producción",
    stages: ["Idea", "Desarrollo", "Despliegue", "Escala"],
    navigation: "Navegación principal",
    openMenu: "Abrir el menú",
    closeMenu: "Cerrar el menú",
    language: "Idioma",
  },
} satisfies Record<
  Lang,
  {
    eyebrow: string;
    heading1: string;
    heading2: string;
    description: string;
    project: string;
    work: string;
    location: string;
    progression: string;
    stages: [string, string, string, string];
    navigation: string;
    openMenu: string;
    closeMenu: string;
    language: string;
  }
>;

/** First-screen proposal only; shared calls to action elsewhere remain unchanged. */
export const homeHeroCopy = {
  en: {
    eyebrow: "Websites · Applications · Cloud",
    heading1: "Your next idea.",
    heading2: "Built to",
    headingAccent: "work.",
    description:
      "We design and build websites, applications, and cloud solutions that help your business move forward.",
    project: "Start Your Project",
    work: "Explore Our Work",
    location: "Based in Maryland. Building worldwide.",
    discover: "Discover our work",
  },
  fr: {
    eyebrow: "Sites web · Applications · Cloud",
    heading1: "Votre prochaine idée.",
    heading2: "Pensée pour",
    headingAccent: "réussir.",
    description:
      "Nous concevons et développons des sites web, des applications et des solutions cloud pour faire avancer votre entreprise.",
    project: "Démarrer votre projet",
    work: "Voir nos réalisations",
    location: "Basés dans le Maryland. Nous construisons pour le monde entier.",
    discover: "Découvrir nos réalisations",
  },
  es: {
    eyebrow: "Sitios web · Aplicaciones · Cloud",
    heading1: "Tu próxima idea.",
    heading2: "Hecha para",
    headingAccent: "funcionar.",
    description:
      "Diseñamos y desarrollamos sitios web, aplicaciones y soluciones en la nube que ayudan a tu empresa a avanzar.",
    project: "Inicia tu proyecto",
    work: "Explora nuestro trabajo",
    location: "Desde Maryland. Construimos para todo el mundo.",
    discover: "Descubre nuestro trabajo",
  },
} satisfies Record<
  Lang,
  {
    eyebrow: string;
    heading1: string;
    heading2: string;
    headingAccent: string;
    description: string;
    project: string;
    work: string;
    location: string;
    discover: string;
  }
>;
