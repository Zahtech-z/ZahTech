# Ingénierie — quatrième revue visuelle

Statut : en attente de revue ZahTech.
Branche : `feat/home-engineering-review`, basée sur `feat/home-services-review`.
Périmètre : la section Ingénierie de l’accueil (`#stack`) uniquement.

## Proposition

Fond encre, titres Inter et accents orange. Les quatre couches existantes sont
reliées visuellement : quatre colonnes sur ordinateur, progression verticale sur
téléphone et tablette. Textes, technologies, ordre et traductions conservés.
Aucune nouvelle promesse technique ni dépendance ajoutée.

Le premier écran, les Réalisations, les Services et les sections suivantes ne
sont pas modifiés. La section conserve une liste ordonnée et son ancre `#stack`.

## Aperçu et captures

- http://127.0.0.1:3100/?review=engineering#stack
- [Ordinateur](desktop.png) · [Téléphone](mobile.png) · [Téléphone FR](mobile-fr.png)
- [Résultats détaillés](browser-results.json)

Les éléments fixes sont masqués uniquement pendant les captures isolées, afin
d’éviter les artefacts de collage. Ils restent présents sur le site.

## Vérifié

- `npm run build` : code 0.
- `./node_modules/.bin/tsc.cmd --noEmit` : code 0.
- `./node_modules/.bin/eslint.cmd src/components/site/TechnicalProof.tsx` : code 0.
- `node scripts/verify-home-engineering.cjs` : 21 contrôles réussis, Chromium 149.
- Couches et technologies conservées, titre Inter en graisse 500, liste ordonnée
  accessible et ancre existante préservée.
- EN/FR/ES à 320, 390, 768, 1024 et 1440 px : contenu dans le viewport,
  quatre colonnes sur ordinateur et une colonne sur téléphone/tablette.
- Réduction des animations : contenu visible et aucune animation active du schéma.
- Sans JavaScript : titre et quatre couches disponibles dans le rendu serveur.
- Aucune erreur runtime relevée par le test ; captures inspectées visuellement.

## Limites

Safari, Firefox, appareils physiques, lecteur d’écran, formulaires et CI non
vérifiés. Le défilement automatique Playwright avec JavaScript désactivé s’est
montré instable ; le contrôle sans JavaScript vérifie la visibilité du contenu
statique, sans prétendre valider ce défilement automatique.
Les anciennes requêtes de polices et avertissements des dépendances restent
hors périmètre. L’aperçu utilise l’adaptateur local du build déjà documenté.
Aucune publication en production.

Reproduction : avec Playwright et Chromium déjà disponibles, définir
`PLAYWRIGHT_MODULE` vers le package existant puis exécuter
`node scripts/verify-home-engineering.cjs`. `BASE_URL` permet de changer l’aperçu.

La PR cible la branche Services (#10) pour isoler cette étape et reste non
fusionnée. Retour arrière : annuler le commit de cette section.
Décision attendue : valider la présentation avant de poursuivre la page.
