import type { Lang } from "./i18n";

type PrivacySection = {
  title: string;
  paragraphs?: readonly string[];
  items?: readonly string[];
};

type PrivacyCopy = {
  eyebrow: string;
  title: string;
  effective: string;
  introduction: string;
  sections: readonly PrivacySection[];
  contactDisclosure: string;
  contactLink: string;
  footerLink: string;
  seoTitle: string;
  seoDescription: string;
};

export const privacyCopy: Record<Lang, PrivacyCopy> = {
  en: {
    eyebrow: "Privacy",
    title: "Privacy notice.",
    effective: "Effective October 4, 2026",
    introduction:
      "This notice explains how ZahTech handles information submitted through this website and its project inquiry forms.",
    sections: [
      {
        title: "Information you provide",
        paragraphs: ["When you submit a project inquiry, you may provide:"],
        items: [
          "Your name and email address",
          "Your company or organization, if you choose to provide it",
          "The service you select, project stage, and budget range",
          "Your project description and any additional information you include",
        ],
      },
      {
        title: "How we use inquiry information",
        paragraphs: [
          "We use inquiry information to review and respond to your request, understand the project or services you are seeking, and communicate with you about potential work.",
        ],
      },
      {
        title: "Email delivery",
        paragraphs: [
          "Project inquiries are sent to ZahTech by email through Resend, an email delivery service used to operate the contact flow.",
        ],
      },
      {
        title: "Browser storage",
        paragraphs: [
          "The website stores your language selection in your browser's local storage so it can be restored when you return. This application does not include an analytics or advertising tracking implementation.",
        ],
      },
      {
        title: "Sharing and retention",
        paragraphs: [
          "ZahTech does not sell project inquiry information. Information may be processed by service providers needed to operate the website and contact flow, including Resend.",
          "We retain inquiry information only for as long as reasonably needed for communication, business records, or applicable obligations.",
        ],
      },
      {
        title: "Security",
        paragraphs: [
          "We take reasonable steps to protect inquiry information. No method of transmission or storage can be guaranteed completely secure.",
        ],
      },
      {
        title: "Your choices and updates",
        paragraphs: [
          "To ask about information you submitted, contact ZahTech at contact@zahtech.net.",
          "We may update this notice as the website or our services change. The effective date above indicates when it was last updated.",
        ],
      },
    ],
    contactDisclosure:
      "By submitting this form, you agree that ZahTech may use the information you provide to review and respond to your inquiry.",
    contactLink: "Privacy notice",
    footerLink: "Privacy",
    seoTitle: "Privacy | ZahTech",
    seoDescription:
      "Learn how ZahTech handles information submitted through its website and project inquiry form.",
  },
  fr: {
    eyebrow: "Confidentialité",
    title: "Avis de confidentialité.",
    effective: "En vigueur le 4 octobre 2026",
    introduction:
      "Cet avis explique comment ZahTech traite les informations transmises sur ce site et dans ses formulaires de demande de projet.",
    sections: [
      {
        title: "Informations que vous fournissez",
        paragraphs: ["Lorsque vous envoyez une demande de projet, vous pouvez fournir :"],
        items: [
          "Votre nom et votre adresse e-mail",
          "Votre entreprise ou organisation, si vous choisissez de l’indiquer",
          "Le service choisi, l’étape du projet et la fourchette de budget",
          "La description de votre projet et toute information complémentaire",
        ],
      },
      {
        title: "Utilisation des informations de demande",
        paragraphs: [
          "Nous utilisons ces informations pour examiner votre demande et y répondre, comprendre le projet ou les services recherchés et communiquer avec vous au sujet d’une éventuelle collaboration.",
        ],
      },
      {
        title: "Transmission par e-mail",
        paragraphs: [
          "Les demandes de projet sont envoyées à ZahTech par e-mail via Resend, un service de transmission d’e-mails utilisé pour faire fonctionner le formulaire de contact.",
        ],
      },
      {
        title: "Stockage dans le navigateur",
        paragraphs: [
          "Le site enregistre votre choix de langue dans le stockage local de votre navigateur afin de le restaurer lors de votre prochaine visite. Cette application n’intègre pas de système d’analyse ou de suivi publicitaire.",
        ],
      },
      {
        title: "Partage et conservation",
        paragraphs: [
          "ZahTech ne vend pas les informations liées aux demandes de projet. Elles peuvent être traitées par les prestataires nécessaires au fonctionnement du site et du formulaire de contact, notamment Resend.",
          "Nous conservons les informations de demande uniquement pendant la durée raisonnablement nécessaire à la communication, aux dossiers d’entreprise ou aux obligations applicables.",
        ],
      },
      {
        title: "Sécurité",
        paragraphs: [
          "Nous prenons des mesures raisonnables pour protéger les informations de demande. Aucune méthode de transmission ou de stockage ne peut être garantie totalement sécurisée.",
        ],
      },
      {
        title: "Vos choix et les mises à jour",
        paragraphs: [
          "Pour toute question sur les informations que vous avez transmises, contactez ZahTech à l’adresse contact@zahtech.net.",
          "Nous pouvons mettre à jour cet avis à mesure que le site ou nos services évoluent. La date d’entrée en vigueur ci-dessus indique sa dernière mise à jour.",
        ],
      },
    ],
    contactDisclosure:
      "En envoyant ce formulaire, vous acceptez que ZahTech utilise les informations fournies pour examiner votre demande et y répondre.",
    contactLink: "Avis de confidentialité",
    footerLink: "Confidentialité",
    seoTitle: "Confidentialité | ZahTech",
    seoDescription:
      "Découvrez comment ZahTech traite les informations transmises sur son site et dans son formulaire de demande de projet.",
  },
  es: {
    eyebrow: "Privacidad",
    title: "Aviso de privacidad.",
    effective: "Vigente desde el 4 de octubre de 2026",
    introduction:
      "Este aviso explica cómo ZahTech trata la información enviada a través de este sitio web y de sus formularios de consulta de proyectos.",
    sections: [
      {
        title: "Información que proporcionas",
        paragraphs: ["Cuando envías una consulta de proyecto, puedes proporcionar:"],
        items: [
          "Tu nombre y dirección de correo electrónico",
          "Tu empresa u organización, si decides proporcionarla",
          "El servicio seleccionado, la etapa del proyecto y el rango de presupuesto",
          "La descripción de tu proyecto y cualquier información adicional",
        ],
      },
      {
        title: "Cómo usamos la información de las consultas",
        paragraphs: [
          "Usamos la información de las consultas para revisar y responder tu solicitud, comprender el proyecto o los servicios que buscas y comunicarnos contigo sobre un posible trabajo.",
        ],
      },
      {
        title: "Entrega de correo electrónico",
        paragraphs: [
          "Las consultas de proyecto se envían a ZahTech por correo electrónico mediante Resend, un servicio de entrega de correo usado para operar el formulario de contacto.",
        ],
      },
      {
        title: "Almacenamiento en el navegador",
        paragraphs: [
          "El sitio guarda tu selección de idioma en el almacenamiento local del navegador para restaurarla cuando regreses. Esta aplicación no incluye una implementación de analítica ni de seguimiento publicitario.",
        ],
      },
      {
        title: "Compartición y conservación",
        paragraphs: [
          "ZahTech no vende información de consultas de proyecto. La información puede ser procesada por proveedores de servicios necesarios para operar el sitio y el formulario de contacto, incluido Resend.",
          "Conservamos la información de las consultas solo durante el tiempo razonablemente necesario para la comunicación, los registros comerciales o las obligaciones aplicables.",
        ],
      },
      {
        title: "Seguridad",
        paragraphs: [
          "Tomamos medidas razonables para proteger la información de las consultas. Ningún método de transmisión o almacenamiento puede garantizarse como completamente seguro.",
        ],
      },
      {
        title: "Tus opciones y actualizaciones",
        paragraphs: [
          "Para preguntar sobre la información que enviaste, contacta a ZahTech en contact@zahtech.net.",
          "Podemos actualizar este aviso a medida que cambien el sitio web o nuestros servicios. La fecha de vigencia anterior indica la última actualización.",
        ],
      },
    ],
    contactDisclosure:
      "Al enviar este formulario, aceptas que ZahTech use la información proporcionada para revisar y responder tu consulta.",
    contactLink: "Aviso de privacidad",
    footerLink: "Privacidad",
    seoTitle: "Privacidad | ZahTech",
    seoDescription:
      "Conoce cómo ZahTech trata la información enviada a través de su sitio web y formulario de consulta de proyectos.",
  },
};
