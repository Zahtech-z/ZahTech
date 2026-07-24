import { createContext, useContext, useState } from "react";

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
      contact: "Contact",
      login: "Log in",
      cta: "Get a Quote",
    },
    hero: {
      badge: "Now accepting new clients for 2026",
      heading1: "Tech for",
      heading2: "businesses",
      sub: "The best way to build, deploy and scale your digital product. From MVP to enterprise, delivered fast.",
      cta: "Get a Quote",
      secondary: "View services",
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
        { title: "Scope & Quote", desc: "Clear deliverables, timeline, and a fixed quote in 24h." },
        { title: "Build & Iterate", desc: "Weekly demos. Feedback loops. Production-grade code." },
        { title: "Deploy & Support", desc: "Launch, monitor, and maintain: we stay with you." },
      ],
    },
    contact: {
      heading: "Ready to build something great?",
      sub: "Tell us about your project. We'll send you a custom quote in 24h.",
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
      note: "We respond within 24h by email.",
      successTitle: "Quote request received",
      successDesc: "We respond within 24h by email at contact@zahtech.org.",
      errorTitle: "Something went wrong",
      errorDesc: "We couldn't send your request. Please try again or email us directly at contact@zahtech.org.",
      retry: "Try again",
    },
    footer: {
      tagline: "Tech for businesses. Built fast, shipped right.",
      services: "Services",
      company: "Company",
      connect: "Connect",
      copyright: "© 2026 ZahTech LLC · contact@zahtech.org",
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
      contact: "Contact",
      login: "Se connecter",
      cta: "Obtenir un devis",
    },
    hero: {
      badge: "Nous acceptons de nouveaux clients pour 2026",
      heading1: "Tech pour les",
      heading2: "entreprises",
      sub: "La meilleure façon de construire, déployer et faire évoluer votre produit digital. Du MVP à l'entreprise, livré rapidement.",
      cta: "Obtenir un devis",
      secondary: "Voir les services",
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
        { title: "Cadrage & Devis", desc: "Livrables clairs, calendrier et un devis fixe en 24h." },
        { title: "Construire & Itérer", desc: "Démos hebdomadaires. Boucles de retour. Code de qualité production." },
        { title: "Déployer & Soutenir", desc: "Lancer, surveiller et maintenir : nous restons avec vous." },
      ],
    },
    contact: {
      heading: "Prêt à construire quelque chose de grand?",
      sub: "Parlez-nous de votre projet. Nous vous enverrons un devis personnalisé en 24h.",
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
      note: "Nous répondons dans les 24h par email.",
      successTitle: "Demande de devis reçue",
      successDesc: "Nous répondons dans les 24h par email à contact@zahtech.org.",
      errorTitle: "Une erreur est survenue",
      errorDesc: "Nous n'avons pas pu envoyer votre demande. Réessayez ou écrivez-nous directement à contact@zahtech.org.",
      retry: "Réessayer",
    },
    footer: {
      tagline: "Tech pour les entreprises. Construit vite, livré bien.",
      services: "Services",
      company: "Entreprise",
      connect: "Contact",
      copyright: "© 2026 ZahTech LLC · contact@zahtech.org",
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
      contact: "Contacto",
      login: "Iniciar sesión",
      cta: "Obtener cotización",
    },
    hero: {
      badge: "Aceptando nuevos clientes para 2026",
      heading1: "Tecnología para",
      heading2: "empresas",
      sub: "La mejor forma de construir, desplegar y escalar tu producto digital. Del MVP a la empresa, entregado rápido.",
      cta: "Obtener cotización",
      secondary: "Ver servicios",
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
        { title: "Alcance & Cotización", desc: "Entregables claros, cronograma y cotización fija en 24h." },
        { title: "Construir & Iterar", desc: "Demos semanales. Ciclos de retroalimentación. Código de calidad." },
        { title: "Desplegar & Mantener", desc: "Lanzar, monitorear y mantener: nos quedamos contigo." },
      ],
    },
    contact: {
      heading: "¿Listo para construir algo grande?",
      sub: "Cuéntanos sobre tu proyecto. Te enviaremos una cotización personalizada en 24h.",
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
      note: "Respondemos en 24h por correo.",
      successTitle: "Solicitud de cotización recibida",
      successDesc: "Respondemos en 24h por correo a contact@zahtech.org.",
      errorTitle: "Algo salió mal",
      errorDesc: "No pudimos enviar tu solicitud. Intenta de nuevo o escríbenos directamente a contact@zahtech.org.",
      retry: "Intentar de nuevo",
    },
    footer: {
      tagline: "Tecnología para empresas. Construido rápido, entregado bien.",
      services: "Servicios",
      company: "Empresa",
      connect: "Contacto",
      copyright: "© 2026 ZahTech LLC · contact@zahtech.org",
    },
  },
};

type ServiceItem = { title: string; desc: string };
type ProcessStep = { title: string; desc: string };

export type Translations = {
  a11y: { skipToContent: string };
  nav: { services: string; process: string; stack: string; work: string; contact: string; login: string; cta: string };
  hero: { badge: string; heading1: string; heading2: string; sub: string; cta: string; secondary: string };
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
    errorTitle: string; errorDesc: string; retry: string;
  };
  footer: { tagline: string; services: string; company: string; connect: string; copyright: string };
};

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
