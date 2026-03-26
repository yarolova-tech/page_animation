# Page Animation

Projet Next.js (App Router) avec animations GSAP/ScrollTrigger pour afficher des cartes d'experiences avec un rendu moderne (Tailwind CSS + icones Lucide) et un switch theme clair/sombre.

## Apercu

- Affichage d'une section `CardAnime` animee au scroll.
- Donnees chargees depuis `components/data/experience.ts`.
- Composant `LightDark` pour changer le theme (`next-themes`).
- Composant utilitaire `CustomAnimateScroll` pour des animations reutilisables.

## Stack technique

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- GSAP + `@gsap/react` + `ScrollTrigger`
- `next-themes`
- `lucide-react`

## Installation

Prerequis:

- Node.js 20+ recommande
- npm

Etapes:

```bash
npm install
npm run dev
```

Application disponible sur: `http://localhost:3000`

## Scripts

```bash
npm run dev    # Lancer en developpement
npm run build  # Build de production
npm run start  # Demarrer le build de production
npm run lint   # Verifier le code avec ESLint
```

## Structure utile

```txt
app/
  layout.tsx
  page.tsx
components/
  data/
    experience.ts
  outils/
    LightDark.tsx
    CustomAnimateScroll.tsx
    CardAnime.tsx
```

## Personnalisation rapide

- Modifier les donnees des cartes: `components/data/experience.ts`
- Ajuster les animations de la timeline: `app/CardAnime.tsx`
- Ajuster le declenchement scroll reutilisable: `components/outils/CustomAnimateScroll.tsx`
- Modifier le style global: `app/globals.css`

## Notes

- Les composants utilisant GSAP sont en `"use client"`.
- `ScrollTrigger` est utilise pour synchroniser l'animation avec le scroll.
- Si vous ajoutez de nouveaux composants themes, utilisez `next-themes` avec precaution pour eviter les mismatches d'hydratation.
