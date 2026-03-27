
export interface Experience {
    id: number; 
    title?: string;
    type?: string;
    niveau?: string;     
    mois?: string;
    annee?: string;
    description: string;
    location?: string;
    date?: string;
    architectures?: string[];
    frontend?: string[];
    backend?: string[];
    database?: string[];
    autres?: string[];
}

export const experiencesData = [
    {
    id: 1,
    title: "Dévelopement application web",
    type: "Projet personnel",
    niveau: "M1 en informatique",
    mois: "indeterminé",
    annee: "2025",
    description:
      "Creation d'une application web gestion d'examens (gestion des salles, gestion des étudiants, gestion des enseignants, gestion des matières, gestion des jury et gestion de fraude) ",
    location: "Fianarantsoa",
    date: "2025",
    architectures: ["Client-Serveur"],
    frontend: ["React/Next", "TypeScript", "Shadcn/ui", "Tailwind css"],
    backend: ["Laravel"],
    database: ["PostgreSQL"],
  },
  {
    id: 2,
    title: "Dévelopement application web",
    type: "Projet personnel",
    niveau: "M1 en informatique",
    mois: "indeterminé",
    annee: "2025",
    description: "Creation d'une application web e-commerce nomeé ivarotre",
    location: "Fianarantsoa",
    date: "2025",
    architectures: ["Client-Serveur"],
    frontend: ["React/Next", "TypeScript", "Shadcn/ui", "Tailwind css"],
    backend: ["Laravel"],
    database: ["PostgreSQL"],
    autres: ["Stripe"],
  },

    {
    id: 3,
    title: "Dévelopement application web",
    type: "Stage",
    niveau: "L3 en informatique",
    mois: "Août - Novembre",
    annee: "2024",
    description:
      "Creation d'une application web e-voyage pour faire une recherche des evenements et endroits touristiques y compris l'hebergement dans une endroit donné avant de voyager",
    location: "UN-IT Tsianolondroa Fianarantsoa",
    date: "2024",
    architectures: ["Client-Serveur"],
    frontend: ["React/Next", "TypeScript", "Shadcn/ui", "Tailwind css"],
    backend: ["Laravel"],
    database: ["PostgreSQL"],
  },
  {
    id: 4,
    title: "Dévelopement web et Mobile",
    type: "Stage",
    niveau: "L2 en informatique",
    mois: "Août - Novembre",
    annee: "2023",
    description:
      "Creation d'une application web et mobile securiser pour generer et scanner de QrCode du Carte d'Indentite Fiscal (CIF)",
    location: "DRI-HM Fianarantsoa",
    date: "Août - Nonvembe",
    architectures: ["Client-Serveur"],
    frontend: ["React.js", "Material Ui", "React Native", "Tailwind css"],
    backend: ["Node.js (express.js)"],
    database: ["PostgreSQL"],
  },

];
