# Méthode — cinquième revue visuelle

Statut : en attente de revue ZahTech.
Branche : `feat/home-process-review`, basée sur `feat/home-engineering-review`.
Périmètre : la section Méthode de l’accueil (`#process`) uniquement.

## Proposition

Fond encre, titres Inter, numéros orange et quatre étapes présentées en lignes.
Sur ordinateur, numéro, titre et explication occupent trois colonnes ; sur
mobile, l’explication passe sous le titre. Étapes, descriptions, ordre et
traductions existants conservés. Aucun délai ni engagement commercial ajouté.
Les sections précédentes et suivantes ne sont pas modifiées.

## Aperçu et captures

- http://127.0.0.1:3100/?review=process#process
- [Ordinateur](desktop.png) · [Téléphone](mobile.png) · [Téléphone FR](mobile-fr.png)
- [Résultats détaillés](browser-results.json)

Les éléments fixes sont masqués uniquement pendant les captures isolées pour
éviter les artefacts de collage. Ils restent présents sur le site.

## Vérifié

- `npm run build` : code 0.
- `./node_modules/.bin/tsc.cmd --noEmit` : code 0.
- `./node_modules/.bin/eslint.cmd src/components/site/Process.tsx` : code 0.
- `node scripts/verify-home-process.cjs` : 21 contrôles réussis dans Chromium 149.
- Quatre étapes dans l’ordre d’origine, titre Inter en graisse 500, section
  nommée, liste ordonnée et ancre `#process` préservées.
- EN/FR/ES à 320, 390, 768, 1024 et 1440 px : pas de débordement horizontal,
  dispositions ordinateur et mobile vérifiées.
- Réduction des animations et contenu statique sans JavaScript vérifiés.
- Aucune erreur runtime relevée par le test ; captures inspectées visuellement.

## Limites et suite

Safari, Firefox, appareils physiques, lecteur d’écran, formulaires, CI et audit
complet d’accessibilité non vérifiés. Le contrôle sans JavaScript porte sur le
contenu statique, sans défilement automatique. Les anciens préchargements de
polices et avertissements de dépendances restent hors périmètre. Aperçu servi
par l’adaptateur local du build déjà documenté. Aucune installation de dépendance
ni publication en production.

Reproduction : avec Playwright et Chromium déjà disponibles, définir
`PLAYWRIGHT_MODULE` vers le package existant puis exécuter
`node scripts/verify-home-process.cjs`. `BASE_URL` permet de changer l’aperçu.

La PR cible la branche Ingénierie (#11) pour isoler cette étape et reste non
fusionnée pour revue. Retour arrière : annuler le commit de cette section.
Décision attendue : valider la présentation avant de poursuivre la page.
