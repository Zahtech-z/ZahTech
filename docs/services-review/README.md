# Services — troisième revue visuelle

Statut : en attente de revue ZahTech.
Branche : `feat/home-services-review`, basée sur `feat/home-selected-work-review`.
Périmètre : la section Services de l’accueil uniquement.

## Proposition

Fond encre, titres Inter, accents orange et liste numérotée de six services.
Introduction à gauche sur ordinateur ; contenu empilé sur téléphone. Tous les
services restent visibles, sans cartes ni accordéon. Les textes et l’ordre
existants sont conservés. Deux liens conduisent à Contact et à la page Services.
Le nouveau libellé « Voir tous les services » est traduit en EN/FR/ES.

Navigation, premier écran, Réalisations, page Services et sections suivantes
préservés. Aucune dépendance installée, aucune publication en production.

## Aperçu et captures

- http://127.0.0.1:3100/?review=services#services
- [Ordinateur](desktop.png) · [Téléphone](mobile.png) · [Téléphone FR](mobile-fr.png)
- [Résultats détaillés](browser-results.json)

Les captures isolent la section : les éléments fixes sont masqués uniquement
pendant la capture pour éviter les artefacts de collage. Ils restent sur le site.

## Vérifié

- `npm run build` : code 0.
- `./node_modules/.bin/tsc.cmd --noEmit` : code 0.
- `./node_modules/.bin/eslint.cmd src/components/site/Services.tsx src/lib/home-copy.ts` : code 0.
- `node scripts/verify-home-services.cjs` : 21 contrôles réussis dans Chromium 149.
- Six services et ordre d’origine conservés ; police Inter appliquée.
- Liens vers `/contact` et `/services`, cibles d’au moins 44 px, parcours clavier
  et indicateur de focus visibles.
- EN/FR/ES à 320, 390, 768, 1024 et 1440 px sans débordement ni texte coupé.
- Contenu disponible sans JavaScript, réduction des animations respectée.
- Aucune erreur runtime relevée par le test ; captures inspectées visuellement.

## Non testé et limites

Safari, Firefox, appareils physiques, lecteur d’écran, formulaires et CI non
vérifiés. Aucun audit complet d’accessibilité. Préchargements de polices et
avertissements des dépendances du build préexistants hors périmètre. Aperçu
compilé servi par l’adaptateur local documenté dans la première revue.

Reproduction : avec Playwright et Chromium déjà disponibles, définir
`PLAYWRIGHT_MODULE` vers le package existant et exécuter
`node scripts/verify-home-services.cjs`. `BASE_URL` permet de cibler un autre aperçu.

La PR cible la branche des Réalisations (#9) pour garder le diff de cette étape
isolé. Elle reste non fusionnée pour revue. Retour arrière : annuler le commit de
cette section. Décision attendue : valider la présentation avant de poursuivre.
