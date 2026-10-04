import { createContext, useContext, useEffect, useState } from "react";

export type Lang = "en" | "fr" | "es";

export const translations = {
  en: {
    a11y: {
      skipToContent: "Skip to main content",
    },
    nav: {
      services: "Services",
      process: "Process",
      stack: "Stack",
      work: "Work",
      about: "About",
      blog: "Blog",
      contact: "Contact",
      cta: "Get a Quote",
    },
    hero: {
      badge: "Now accepting new clients for 2026",
      heading1: "Tech for",
      heading2: "businesses",
      sub: "The best way to build, deploy and scale your digital product. From MVP to enterprise, delivered fast.",
      cta: "Get a Quote",
      secondary: "View services",
      bookCall: "Book a Free Call",
    },
    services: {
      heading: "Everything your product needs.",
      items: [
        { title: "App Development", desc: "React, Next.js, full-stack apps built for production." },
        { title: "Cloud & DevOps", desc: "AWS, Docker, CI/CD, server maintenance that never sleeps." },
        { title: "Tech Consulting", desc: "Architecture reviews and strategic guidance for companies." },
        { title: "AI-Powered Build", desc: "Vibe coding and LLM-assisted dev to ship 3× faster." },
        { title: "Server Maintenance", desc: "24/7 monitoring, security patches, incident response." },
        { title: "MVP Launch", desc: "Idea to live product in weeks, scoped and production-ready." },
      ],
    },
    process: {
      heading: "A process that actually ships.",
      steps: [
        { title: "Discovery Call", desc: "We understand your goals, audience, and constraints." },
        { title: "Scope & Quote", desc: "Prompt scoping, clear deliverables, and a quote tailored to your project." },
        { title: "Build & Iterate", desc: "Weekly demos. Feedback loops. Production-grade code." },
        { title: "Deploy & Support", desc: "Launch, monitor, and maintain: we stay with you." },
      ],
    },
    contact: {
      heading: "Ready to build something great?",
      sub: "Tell us about your project and we'll get back to you.",
      nameLabel: "Full Name",
      namePlaceholder: "Your name",
      emailLabel: "Email",
      emailPlaceholder: "you@company.com",
      servicesLabel: "Services",
      budgetLabel: "Budget",
      budgetDefault: "Select a budget…",
      timelineLabel: "Timeline",
      timelineDefault: "Select a timeline…",
      descLabel: "Project description",
      descPlaceholder: "Goals, audience, must-haves…",
      submit: "Get a Quote →",
      submitting: "Sending…",
      note: "We'll follow up by email.",
      successTitle: "Quote request received",
      successDesc: "We'll follow up by email at contact@zahtech.net.",
      errorTitle: "Something went wrong",
      errorDesc: "We couldn't send your request. Please try again or email us directly at contact@zahtech.net.",
      retry: "Try again",
      bookCall: "Book a Free Call",
      or: "or",
    },
    footer: {
      tagline: "Tech for businesses. Built fast, shipped right.",
      services: "Services",
      company: "Company",
      connect: "Connect",
      copyright: "© 2026 ZahTech LLC · contact@zahtech.net",
      established: "Established 2026 · Maryland, USA",
      blog: "Blog",
      about: "About",
    },
    testimonial: {
      heading: "What our clients say",
      quote: "ZahTech built our entire platform from scratch. Professional, fast, and exactly what we needed.",
      name: "Smart DMV Team",
      company: "Smart DMV",
      stars: "5 out of 5 stars",
    },
    ui: {
      whatsapp: "Chat with us on WhatsApp",
      backToTop: "Back to top",
    },
  },

  fr: {
    a11y: {
      skipToContent: "Passer au contenu principal",
    },
    nav: {
      services: "Services",
      process: "Processus",
      stack: "Stack",
      work: "Travaux",
      about: "À propos",
      blog: "Blog",
      contact: "Contact",
      cta: "Obtenir un devis",
    },
    hero: {
      badge: "Nous acceptons de nouveaux clients pour 2026",
      heading1: "Tech pour les",
      heading2: "entreprises",
      sub: "La meilleure façon de construire, déployer et faire évoluer votre produit digital. Du MVP à l'entreprise, livré rapidement.",
      cta: "Obtenir un devis",
      secondary: "Voir les services",
      bookCall: "Réserver un appel gratuit",
    },
    services: {
      heading: "Tout ce dont votre produit a besoin.",
      items: [
        { title: "Développement d'apps", desc: "React, Next.js, applications full-stack prêtes pour la production." },
        { title: "Cloud & DevOps", desc: "AWS, Docker, CI/CD, maintenance serveur sans interruption." },
        { title: "Conseil Tech", desc: "Revues d'architecture et conseils stratégiques pour les entreprises." },
        { title: "Développement IA", desc: "Développement assisté par LLM pour livrer 3× plus vite." },
        { title: "Maintenance Serveur", desc: "Surveillance 24/7, correctifs de sécurité, réponse aux incidents." },
        { title: "Lancement MVP", desc: "De l'idée au produit en quelques semaines, cadré et prêt pour la production." },
      ],
    },
    process: {
      heading: "Un processus qui livre vraiment.",
      steps: [
        { title: "Appel de découverte", desc: "Nous comprenons vos objectifs, votre audience et vos contraintes." },
        { title: "Cadrage & Devis", desc: "Cadrage rapide, livrables clairs et devis adapté à votre projet." },
        { title: "Construire & Itérer", desc: "Démos hebdomadaires. Boucles de retour. Code de qualité production." },
        { title: "Déployer & Soutenir", desc: "Lancer, surveiller et maintenir : nous restons avec vous." },
      ],
    },
    contact: {
      heading: "Prêt à construire quelque chose de grand?",
      sub: "Parlez-nous de votre projet et nous reviendrons vers vous.",
      nameLabel: "Nom complet",
      namePlaceholder: "Votre nom",
      emailLabel: "Email",
      emailPlaceholder: "vous@entreprise.com",
      servicesLabel: "Services",
      budgetLabel: "Budget",
      budgetDefault: "Choisir un budget…",
      timelineLabel: "Délai",
      timelineDefault: "Choisir un délai…",
      descLabel: "Description du projet",
      descPlaceholder: "Objectifs, audience, indispensables…",
      submit: "Obtenir un devis →",
      submitting: "Envoi…",
      note: "Nous vous répondrons par e-mail.",
      successTitle: "Demande de devis reçue",
      successDesc: "Nous vous répondrons par e-mail à contact@zahtech.net.",
      errorTitle: "Une erreur est survenue",
      errorDesc: "Nous n'avons pas pu envoyer votre demande. Réessayez ou écrivez-nous directement à contact@zahtech.net.",
      retry: "Réessayer",
      bookCall: "Réserver un appel gratuit",
      or: "ou",
    },
    footer: {
      tagline: "Tech pour les entreprises. Construit vite, livré bien.",
      services: "Services",
      company: "Entreprise",
      connect: "Contact",
      copyright: "© 2026 ZahTech LLC · contact@zahtech.net",
      established: "Fondée en 2026 · Maryland, États-Unis",
      blog: "Blog",
      about: "À propos",
    },
    testimonial: {
      heading: "Ce que disent nos clients",
      quote: "ZahTech a construit toute notre plateforme de zéro. Professionnel, rapide, et exactement ce qu'il nous fallait.",
      name: "Équipe Smart DMV",
      company: "Smart DMV",
      stars: "5 étoiles sur 5",
    },
    ui: {
      whatsapp: "Discutez avec nous sur WhatsApp",
      backToTop: "Retour en haut",
    },
  },

  es: {
    a11y: {
      skipToContent: "Saltar al contenido principal",
    },
    nav: {
      services: "Servicios",
      process: "Proceso",
      stack: "Stack",
      work: "Trabajos",
      about: "Nosotros",
      blog: "Blog",
      contact: "Contacto",
      cta: "Obtener cotización",
    },
    hero: {
      badge: "Aceptando nuevos clientes para 2026",
      heading1: "Tecnología para",
      heading2: "empresas",
      sub: "La mejor forma de construir, desplegar y escalar tu producto digital. Del MVP a la empresa, entregado rápido.",
      cta: "Obtener cotización",
      secondary: "Ver servicios",
      bookCall: "Reservar una llamada gratis",
    },
    services: {
      heading: "Todo lo que tu producto necesita.",
      items: [
        { title: "Desarrollo de Apps", desc: "React, Next.js, aplicaciones full-stack listas para producción." },
        { title: "Cloud & DevOps", desc: "AWS, Docker, CI/CD, mantenimiento de servidores sin parar." },
        { title: "Consultoría Tech", desc: "Revisiones de arquitectura y orientación estratégica para empresas." },
        { title: "Desarrollo con IA", desc: "Desarrollo asistido por LLM para entregar 3× más rápido." },
        { title: "Mantenimiento de Servidores", desc: "Monitoreo 24/7, parches de seguridad, respuesta a incidentes." },
        { title: "Lanzamiento MVP", desc: "De la idea al producto en semanas, planificado y listo para producción." },
      ],
    },
    process: {
      heading: "Un proceso que realmente entrega.",
      steps: [
        { title: "Llamada de descubrimiento", desc: "Entendemos tus objetivos, audiencia y limitaciones." },
        { title: "Alcance & Cotización", desc: "Definición ágil del alcance, entregables claros y un presupuesto a medida." },
        { title: "Construir & Iterar", desc: "Demos semanales. Ciclos de retroalimentación. Código de calidad." },
        { title: "Desplegar & Mantener", desc: "Lanzar, monitorear y mantener: nos quedamos contigo." },
      ],
    },
    contact: {
      heading: "¿Listo para construir algo grande?",
      sub: "Cuéntanos sobre tu proyecto y nos pondremos en contacto contigo.",
      nameLabel: "Nombre completo",
      namePlaceholder: "Tu nombre",
      emailLabel: "Correo electrónico",
      emailPlaceholder: "tu@empresa.com",
      servicesLabel: "Servicios",
      budgetLabel: "Presupuesto",
      budgetDefault: "Seleccionar presupuesto…",
      timelineLabel: "Plazo",
      timelineDefault: "Seleccionar plazo…",
      descLabel: "Descripción del proyecto",
      descPlaceholder: "Objetivos, audiencia, requisitos…",
      submit: "Obtener cotización →",
      submitting: "Enviando…",
      note: "Te responderemos por correo.",
      successTitle: "Solicitud de cotización recibida",
      successDesc: "Te responderemos por correo a contact@zahtech.net.",
      errorTitle: "Algo salió mal",
      errorDesc: "No pudimos enviar tu solicitud. Intenta de nuevo o escríbenos directamente a contact@zahtech.net.",
      retry: "Intentar de nuevo",
      bookCall: "Reservar una llamada gratis",
      or: "o",
    },
    footer: {
      tagline: "Tecnología para empresas. Construido rápido, entregado bien.",
      services: "Servicios",
      company: "Empresa",
      connect: "Contacto",
      copyright: "© 2026 ZahTech LLC · contact@zahtech.net",
      established: "Fundada en 2026 · Maryland, EE. UU.",
      blog: "Blog",
      about: "Nosotros",
    },
    testimonial: {
      heading: "Lo que dicen nuestros clientes",
      quote: "ZahTech construyó toda nuestra plataforma desde cero. Profesional, rápido y exactamente lo que necesitábamos.",
      name: "Equipo de Smart DMV",
      company: "Smart DMV",
      stars: "5 de 5 estrellas",
    },
    ui: {
      whatsapp: "Chatea con nosotros en WhatsApp",
      backToTop: "Volver arriba",
    },
  },
};

const landingTranslations = {
  en: {
    trusted: { intro: "Businesses of all sizes trust ZahTech\nto build and scale their digital products.", heading: "Build this week", sub: "A simple, powerful process so you can launch products in days. It fits right into your workflow with a team that ships at startup speed." },
    experience: {
      heading: "First-class client experience", sub: "We are builders creating solutions for businesses. Our goal: deliver the tech partner that just works.", delivered: "Delivered", projects: "Projects", date: "May 2, 2026",
      logs: ["Deployed to production", "SSL certificate active", "Domain connected", "HTTP 200: zahtech.net/api/status"],
      projectStatuses: ["Active", "Building", "Active", "Review"], projectNames: ["SimuWork App", "E-Commerce MVP", "Business Portal", "Mobile App"],
      projectMeta: ["deployed 2h ago", "in progress", "deployed 1d ago", "awaiting approval"],
    },
    features: {
      items: [{ title: "Rapid Delivery", desc: "Ship your product in weeks, not months. AI-powered development moves 3× faster than traditional teams." }, { title: "Real-time Updates", desc: "Get notified at every step. From kickoff to deployment, with full transparency throughout your project." }],
      learnMore: "Learn more", heading: "Build using a delightful process", sub: "A modern workflow that makes it easy for anyone to launch, scale, and maintain digital products.",
    },
    codePreview: { heading: "Build apps using Next.js", sub: "Create production-ready apps without complex configurations and deployments.", start: "Start a Project", docs: "View docs", welcome: "Welcome to ZahTech", live: "Your project is live", quote: "Get a Quote" },
    brief: { templates: "Templates", title: "Project Brief", ago: "2 hours ago", preview: "Preview", send: "Send Quote", from: "From", to: "To", client: "Client Name", subject: "Subject", subjectValue: "Your ZahTech Quote", quoteTitle: "Your Project Quote", service: "Service requested", serviceValue: "Full-stack Web App", timeline: "Estimated timeline", timelineValue: "4 to 6 weeks", stack: "Tech stack", includes: "Includes", includesValue: "Design · Dev · Deploy · Support", total: "Total estimate", totalValue: "Contact for pricing" },
    pipeline: { deployed: "Deployed", running: "Running", pushing: "Pushing to zahtech/client-app...", stages: ["Code", "Build", "Test", "Deploy"], logs: ["Installing dependencies...", "Building Next.js app...", "Running tests (24/24)...", "Optimizing bundle...", "Uploading to AWS S3...", "Configuring CloudFront CDN...", "Deploying to production..."], done: "Deployed to production!", live: "Live in 4.5s", uptime: "uptime", deployStat: "s deploy", testsStat: "/24 tests" },
    contactOptions: { budgets: ["< $5k", "$5k to $15k", "$15k to $40k", "$40k+", "Not sure"], timelines: ["ASAP", "2 to 4 weeks", "1 to 2 months", "3+ months", "Flexible"] },
  },
  fr: {
    trusted: { intro: "Des entreprises de toutes tailles font confiance à ZahTech\npour créer et faire évoluer leurs produits numériques.", heading: "Construisez cette semaine", sub: "Un processus simple et puissant pour lancer vos produits en quelques jours, avec une équipe qui avance à la vitesse d'une startup." },
    experience: {
      heading: "Une expérience client exceptionnelle", sub: "Nous créons des solutions pour les entreprises. Notre objectif : être le partenaire technologique sur lequel vous pouvez compter.", delivered: "Livré", projects: "Projets", date: "2 mai 2026",
      logs: ["Déployé en production", "Certificat SSL actif", "Domaine connecté", "HTTP 200 : zahtech.net/api/status"],
      projectStatuses: ["Actif", "En cours", "Actif", "Révision"], projectNames: ["Application SimuWork", "MVP E-commerce", "Portail d'entreprise", "Application mobile"],
      projectMeta: ["déployé il y a 2 h", "en développement", "déployé il y a 1 j", "en attente d'approbation"],
    },
    features: {
      items: [{ title: "Livraison rapide", desc: "Lancez votre produit en quelques semaines, pas en quelques mois. Le développement assisté par IA avance 3× plus vite." }, { title: "Mises à jour en temps réel", desc: "Soyez informé à chaque étape, du lancement au déploiement, avec une transparence totale." }],
      learnMore: "En savoir plus", heading: "Créez avec un processus agréable", sub: "Un flux de travail moderne qui simplifie le lancement, l'évolution et la maintenance des produits numériques.",
    },
    codePreview: { heading: "Créez des applications avec Next.js", sub: "Créez des applications prêtes pour la production sans configuration ni déploiement complexes.", start: "Démarrer un projet", docs: "Voir la documentation", welcome: "Bienvenue chez ZahTech", live: "Votre projet est en ligne", quote: "Obtenir un devis" },
    brief: { templates: "Modèles", title: "Cahier de projet", ago: "Il y a 2 heures", preview: "Aperçu", send: "Envoyer le devis", from: "De", to: "À", client: "Nom du client", subject: "Objet", subjectValue: "Votre devis ZahTech", quoteTitle: "Votre devis de projet", service: "Service demandé", serviceValue: "Application web full-stack", timeline: "Délai estimé", timelineValue: "4 à 6 semaines", stack: "Stack technique", includes: "Comprend", includesValue: "Design · Développement · Déploiement · Support", total: "Estimation totale", totalValue: "Nous contacter pour le tarif" },
    pipeline: { deployed: "Déployé", running: "En cours", pushing: "Envoi vers zahtech/client-app...", stages: ["Code", "Compilation", "Tests", "Déploiement"], logs: ["Installation des dépendances...", "Compilation de l'application Next.js...", "Exécution des tests (24/24)...", "Optimisation du bundle...", "Envoi vers AWS S3...", "Configuration du CDN CloudFront...", "Déploiement en production..."], done: "Déployé en production !", live: "En ligne en 4,5 s", uptime: "disponibilité", deployStat: "s déploiement", testsStat: "/24 tests" },
    contactOptions: { budgets: ["< 5 000 $", "5 000 $ à 15 000 $", "15 000 $ à 40 000 $", "40 000 $+", "Je ne sais pas"], timelines: ["Dès que possible", "2 à 4 semaines", "1 à 2 mois", "3 mois ou plus", "Flexible"] },
  },
  es: {
    trusted: { intro: "Empresas de todos los tamaños confían en ZahTech\npara crear y escalar sus productos digitales.", heading: "Construye esta semana", sub: "Un proceso sencillo y potente para lanzar productos en días, con un equipo que trabaja a la velocidad de una startup." },
    experience: {
      heading: "Una experiencia de cliente excepcional", sub: "Creamos soluciones para empresas. Nuestro objetivo: ser el socio tecnológico que simplemente funciona.", delivered: "Entregado", projects: "Proyectos", date: "2 de mayo de 2026",
      logs: ["Desplegado en producción", "Certificado SSL activo", "Dominio conectado", "HTTP 200: zahtech.net/api/status"],
      projectStatuses: ["Activo", "En desarrollo", "Activo", "Revisión"], projectNames: ["Aplicación SimuWork", "MVP de comercio electrónico", "Portal empresarial", "Aplicación móvil"],
      projectMeta: ["desplegado hace 2 h", "en progreso", "desplegado hace 1 d", "esperando aprobación"],
    },
    features: {
      items: [{ title: "Entrega rápida", desc: "Lanza tu producto en semanas, no meses. El desarrollo con IA avanza 3× más rápido que los equipos tradicionales." }, { title: "Actualizaciones en tiempo real", desc: "Recibe información en cada etapa, desde el inicio hasta el despliegue, con total transparencia." }],
      learnMore: "Más información", heading: "Construye con un proceso agradable", sub: "Un flujo de trabajo moderno que facilita lanzar, escalar y mantener productos digitales.",
    },
    codePreview: { heading: "Crea aplicaciones con Next.js", sub: "Crea aplicaciones listas para producción sin configuraciones ni despliegues complejos.", start: "Iniciar un proyecto", docs: "Ver documentación", welcome: "Bienvenido a ZahTech", live: "Tu proyecto está en línea", quote: "Obtener cotización" },
    brief: { templates: "Plantillas", title: "Resumen del proyecto", ago: "Hace 2 horas", preview: "Vista previa", send: "Enviar cotización", from: "De", to: "Para", client: "Nombre del cliente", subject: "Asunto", subjectValue: "Tu cotización de ZahTech", quoteTitle: "Cotización de tu proyecto", service: "Servicio solicitado", serviceValue: "Aplicación web full-stack", timeline: "Plazo estimado", timelineValue: "4 a 6 semanas", stack: "Stack tecnológico", includes: "Incluye", includesValue: "Diseño · Desarrollo · Despliegue · Soporte", total: "Estimación total", totalValue: "Contáctanos para conocer el precio" },
    pipeline: { deployed: "Desplegado", running: "En curso", pushing: "Enviando a zahtech/client-app...", stages: ["Código", "Compilación", "Pruebas", "Despliegue"], logs: ["Instalando dependencias...", "Compilando la aplicación Next.js...", "Ejecutando pruebas (24/24)...", "Optimizando el bundle...", "Subiendo a AWS S3...", "Configurando CDN CloudFront...", "Desplegando en producción..."], done: "¡Desplegado en producción!", live: "En línea en 4,5 s", uptime: "disponibilidad", deployStat: "s despliegue", testsStat: "/24 pruebas" },
    contactOptions: { budgets: ["< 5 mil $", "5 mil $ a 15 mil $", "15 mil $ a 40 mil $", "40 mil $+", "No estoy seguro"], timelines: ["Lo antes posible", "2 a 4 semanas", "1 a 2 meses", "3 meses o más", "Flexible"] },
  },
};

type ServiceItem = { title: string; desc: string };
type ProcessStep = { title: string; desc: string };

export type Translations = {
  a11y: { skipToContent: string };
  nav: { services: string; process: string; stack: string; work: string; about: string; blog: string; contact: string; cta: string };
  hero: { badge: string; heading1: string; heading2: string; sub: string; cta: string; secondary: string; bookCall: string };
  services: { heading: string; items: ServiceItem[] };
  process: { heading: string; steps: ProcessStep[] };
  contact: {
    heading: string; sub: string;
    nameLabel: string; namePlaceholder: string;
    emailLabel: string; emailPlaceholder: string;
    servicesLabel: string;
    budgetLabel: string; budgetDefault: string;
    timelineLabel: string; timelineDefault: string;
    descLabel: string; descPlaceholder: string;
    submit: string; submitting: string; note: string;
    successTitle: string; successDesc: string;
    errorTitle: string; errorDesc: string; retry: string; bookCall: string; or: string;
  };
  footer: { tagline: string; services: string; company: string; connect: string; copyright: string; established: string; blog: string; about: string };
  testimonial: { heading: string; quote: string; name: string; company: string; stars: string };
  ui: { whatsapp: string; backToTop: string };
  landing: (typeof landingTranslations)[Lang];
};

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // Restore the saved choice after hydration (keeps SSR markup identical to the first client render).
  useEffect(() => {
    try {
      const saved = localStorage.getItem("zahtech-lang");
      if (saved === "en" || saved === "fr" || saved === "es") setLangState(saved);
    } catch {
      /* storage unavailable */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("zahtech-lang", l);
    } catch {
      /* storage unavailable */
    }
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: { ...translations[lang], landing: landingTranslations[lang] } }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
