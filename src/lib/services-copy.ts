import type { Lang } from "./i18n";

export const serviceIds = ["apps", "cloud", "ai", "maintenance", "consulting", "mvp"] as const;
type ServiceId = (typeof serviceIds)[number];
type ServicesCopy = {
  eyebrow: string;
  heading: string;
  introduction: string;
  overview: string;
  seoTitle: string;
  services: Record<ServiceId, { title: string; description: string }>;
};

export const servicesCopy: Record<Lang, ServicesCopy> = {
  en: {
    eyebrow: "Capabilities",
    heading: "Engineering products from idea to production.",
    introduction:
      "ZahTech combines product development, cloud engineering, AI, and technical operations to build and support software across its lifecycle.",
    overview: "Our capabilities",
    seoTitle: "Services | ZahTech",
    services: {
      apps: {
        title: "App Development",
        description: "Web applications and digital products, from interface to backend.",
      },
      cloud: {
        title: "Cloud & DevOps",
        description:
          "Cloud infrastructure, deployment pipelines, containers, automation, and production environments.",
      },
      ai: {
        title: "AI-Powered Build",
        description: "Practical AI capabilities integrated into products and business workflows.",
      },
      maintenance: {
        title: "Server Maintenance",
        description:
          "Monitoring, updates, security maintenance, infrastructure support, and operational reliability.",
      },
      consulting: {
        title: "Tech Consulting",
        description:
          "Technical architecture, product decisions, infrastructure planning, and implementation guidance.",
      },
      mvp: {
        title: "MVP Launch",
        description: "A focused path from validated product idea to a working first release.",
      },
    },
  },
  fr: {
    eyebrow: "Expertises",
    heading: "De l’idée à la production, nous construisons vos produits.",
    introduction:
      "ZahTech réunit développement produit, ingénierie cloud, IA et exploitation technique pour créer et accompagner vos logiciels tout au long de leur cycle de vie.",
    overview: "Nos expertises",
    seoTitle: "Services | ZahTech",
    services: {
      apps: {
        title: "Développement d’applications",
        description: "Applications web et produits numériques, de l’interface au backend.",
      },
      cloud: {
        title: "Cloud & DevOps",
        description:
          "Infrastructure cloud, pipelines de déploiement, conteneurs, automatisation et environnements de production.",
      },
      ai: {
        title: "Développement avec l’IA",
        description:
          "Des fonctionnalités d’IA concrètes, intégrées aux produits et aux processus métier.",
      },
      maintenance: {
        title: "Maintenance des serveurs",
        description:
          "Supervision, mises à jour, maintenance de sécurité, support de l’infrastructure et fiabilité opérationnelle.",
      },
      consulting: {
        title: "Conseil technique",
        description:
          "Architecture logicielle, choix produit, planification de l’infrastructure et accompagnement de la mise en œuvre.",
      },
      mvp: {
        title: "Lancement de MVP",
        description:
          "Un parcours ciblé, d’une idée produit validée à une première version fonctionnelle.",
      },
    },
  },
  es: {
    eyebrow: "Especialidades",
    heading: "Desarrollamos productos desde la idea hasta la producción.",
    introduction:
      "ZahTech combina desarrollo de producto, ingeniería cloud, IA y operaciones técnicas para crear y mantener software durante todo su ciclo de vida.",
    overview: "Nuestras especialidades",
    seoTitle: "Servicios | ZahTech",
    services: {
      apps: {
        title: "Desarrollo de aplicaciones",
        description: "Aplicaciones web y productos digitales, desde la interfaz hasta el backend.",
      },
      cloud: {
        title: "Cloud y DevOps",
        description:
          "Infraestructura cloud, pipelines de despliegue, contenedores, automatización y entornos de producción.",
      },
      ai: {
        title: "Desarrollo con IA",
        description: "Funciones prácticas de IA integradas en productos y procesos de negocio.",
      },
      maintenance: {
        title: "Mantenimiento de servidores",
        description:
          "Supervisión, actualizaciones, mantenimiento de seguridad, soporte de infraestructura y fiabilidad operativa.",
      },
      consulting: {
        title: "Consultoría técnica",
        description:
          "Arquitectura de software, decisiones de producto, planificación de infraestructura y orientación para la implementación.",
      },
      mvp: {
        title: "Lanzamiento de MVP",
        description:
          "Un camino definido desde una idea de producto validada hasta una primera versión funcional.",
      },
    },
  },
};
