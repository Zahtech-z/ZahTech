import type { Lang } from "./i18n";

type ContactCopy = {
  eyebrow: string;
  heading: string;
  introduction: string;
  formHeading: string;
  required: string;
  optional: string;
  name: string;
  email: string;
  company: string;
  description: string;
  service: string;
  unsure: string;
  stage: string;
  choose: string;
  stages: [string, string, string, string, string];
  budget: string;
  budgets: [string, string, string, string, string, string];
  additional: string;
  send: string;
  sending: string;
  success: string;
  error: string;
  note: string;
  requiredError: string;
  emailError: string;
  preferEmail: string;
  location: string;
  seoTitle: string;
  seoDescription: string;
};

export const contactCopy: Record<Lang, ContactCopy> = {
  en: {
    eyebrow: "Start a project",
    heading: "Tell us what you're building.",
    introduction:
      "Share the product, problem, or technical challenge you're working on. We'll use the details to understand where ZahTech can help.",
    formHeading: "Project details",
    required: "Fields marked * are required.",
    optional: "optional",
    name: "Name",
    email: "Email",
    company: "Company / organization",
    description: "What are you building?",
    service: "Service / help needed",
    unsure: "Not sure yet",
    stage: "Project stage",
    choose: "Select a stage",
    stages: ["Idea", "Planning", "In development", "Existing product", "Production / scaling"],
    budget: "Budget (USD)",
    budgets: ["Not sure yet", "Under $5k", "$5k–$15k", "$15k–$50k", "$50k+", "Prefer to discuss"],
    additional: "Anything else we should know?",
    send: "Send project inquiry",
    sending: "Sending…",
    success: "Your project inquiry has been sent. Thank you for sharing the details.",
    error:
      "We couldn't send your inquiry. Your details are still here. Please try again or contact us by email.",
    note: "Your inquiry will be sent to ZahTech by email.",
    requiredError: "Please complete this field.",
    emailError: "Please enter a valid email address.",
    preferEmail: "Prefer email?",
    location: "Based in Maryland. Working with clients wherever they operate.",
    seoTitle: "Start a Project | ZahTech",
    seoDescription:
      "Tell ZahTech about your software, cloud, DevOps, AI, or product development project.",
  },
  fr: {
    eyebrow: "Démarrer un projet",
    heading: "Parlez-nous de ce que vous construisez.",
    introduction:
      "Présentez-nous le produit, le problème ou le défi technique sur lequel vous travaillez. Ces informations nous aideront à comprendre comment ZahTech peut vous accompagner.",
    formHeading: "Votre projet",
    required: "Les champs marqués d’un * sont obligatoires.",
    optional: "facultatif",
    name: "Nom",
    email: "Adresse e-mail",
    company: "Entreprise / organisation",
    description: "Que souhaitez-vous construire ?",
    service: "Service / accompagnement souhaité",
    unsure: "À définir",
    stage: "Avancement du projet",
    choose: "Choisir une étape",
    stages: [
      "Idée",
      "Planification",
      "En développement",
      "Produit existant",
      "En production / montée en charge",
    ],
    budget: "Budget (USD)",
    budgets: [
      "À définir",
      "Moins de 5 000 $",
      "5 000 $–15 000 $",
      "15 000 $–50 000 $",
      "50 000 $ et plus",
      "À discuter",
    ],
    additional: "Autres informations à partager ?",
    send: "Envoyer la demande",
    sending: "Envoi en cours…",
    success: "Votre demande a été envoyée. Merci pour ces précisions sur votre projet.",
    error:
      "Votre demande n’a pas pu être envoyée. Vos informations sont conservées dans le formulaire. Réessayez ou contactez-nous par e-mail.",
    note: "Votre demande sera transmise à ZahTech par e-mail.",
    requiredError: "Veuillez remplir ce champ.",
    emailError: "Veuillez saisir une adresse e-mail valide.",
    preferEmail: "Vous préférez l’e-mail ?",
    location:
      "Basés dans le Maryland. Nous accompagnons nos clients où qu’ils exercent leur activité.",
    seoTitle: "Démarrer un projet | ZahTech",
    seoDescription:
      "Présentez à ZahTech votre projet de logiciel, cloud, DevOps, IA ou développement produit.",
  },
  es: {
    eyebrow: "Iniciar un proyecto",
    heading: "Cuéntanos qué estás construyendo.",
    introduction:
      "Comparte el producto, problema o desafío técnico en el que estás trabajando. Usaremos estos detalles para comprender cómo ZahTech puede ayudarte.",
    formHeading: "Detalles del proyecto",
    required: "Los campos marcados con * son obligatorios.",
    optional: "opcional",
    name: "Nombre",
    email: "Correo electrónico",
    company: "Empresa / organización",
    description: "¿Qué estás construyendo?",
    service: "Servicio / ayuda que necesitas",
    unsure: "Aún no lo sé",
    stage: "Etapa del proyecto",
    choose: "Selecciona una etapa",
    stages: [
      "Idea",
      "Planificación",
      "En desarrollo",
      "Producto existente",
      "En producción / escalando",
    ],
    budget: "Presupuesto (USD)",
    budgets: [
      "Aún no lo sé",
      "Menos de 5.000 $",
      "5.000 $–15.000 $",
      "15.000 $–50.000 $",
      "50.000 $ o más",
      "Prefiero hablarlo",
    ],
    additional: "¿Hay algo más que debamos saber?",
    send: "Enviar consulta de proyecto",
    sending: "Enviando…",
    success: "Tu consulta se ha enviado. Gracias por compartir los detalles de tu proyecto.",
    error:
      "No hemos podido enviar tu consulta. Tus datos siguen en el formulario. Inténtalo de nuevo o escríbenos por correo.",
    note: "Tu consulta se enviará a ZahTech por correo electrónico.",
    requiredError: "Completa este campo.",
    emailError: "Introduce una dirección de correo válida.",
    preferEmail: "¿Prefieres el correo?",
    location: "Desde Maryland. Trabajamos con clientes dondequiera que operen.",
    seoTitle: "Iniciar un proyecto | ZahTech",
    seoDescription:
      "Cuéntale a ZahTech sobre tu proyecto de software, cloud, DevOps, IA o desarrollo de producto.",
  },
};
