# Réalisations — deuxième revue visuelle

Statut : en attente de revue ZahTech.
Branche : `feat/home-selected-work-review`, basée sur `feat/hero-navigation-review`.
Périmètre : la section Réalisations de l’accueil uniquement.

## Proposition

Grande capture existante d’OnzScore sur fond encre, titre Inter, hiérarchie plus
ample et accents orange. Les informations, technologies et traductions sont
reprises des données du dépôt. Le statut « préparation à la production » reste
visible. Le lien d’étude de cas, l’accès à l’image originale et la page Work sont
conservés. Aucun projet, client, chiffre ou témoignage ajouté.

Le premier écran validé, les composants partagés, les pages Work et OnzScore et
les sections suivantes ne sont pas modifiés.

## Aperçu et captures

- http://127.0.0.1:3100/?review=work#selected-work
- [Ordinateur](desktop.png) · [Téléphone](mobile.png) · [Téléphone FR](mobile-fr.png)
- [Résultats navigateur](browser-results.json)

Captures isolées de la section : navigation fixe et bouton WhatsApp masqués **uniquement pendant la capture**, pour éviter leur collage au
milieu d’une section plus haute que le viewport. Ils restent présents sur le site.

## Vérifié

- `npm run build` : code 0.
- `./node_modules/.bin/tsc.cmd --noEmit` : code 0.
- `./node_modules/.bin/eslint.cmd src/components/site/SelectedWork.tsx` : code 0.
- `node scripts/verify-selected-work.cjs` : 21 contrôles réussis, Chromium 149.
- Navigation vers `/work` et `/work/onzscore`, image originale et attributs du
  lien externe, données et statut conservés.
- EN/FR/ES à 320, 390, 768, 1024 et 1440 px sans débordement horizontal.
- Réduction des animations et contenu sans JavaScript ; aucune erreur runtime
  relevée par le test. Captures finales inspectées visuellement.

## Non testé et limites

Safari, Firefox, appareils physiques, lecteur d’écran, formulaires et CI non
vérifiés. Aucun audit complet d’accessibilité. Les anciens préchargements de
polices et les avertissements de build des dépendances restent hors périmètre.
L’aperçu utilise l’adaptateur local du build déjà documenté pour la première revue.
Aucune dépendance installée ni publication en production.

Reproduction : avec Playwright et Chromium déjà installés, définir
`PLAYWRIGHT_MODULE` vers le package existant puis exécuter
`node scripts/verify-selected-work.cjs`. `BASE_URL` permet de changer l’aperçu.

La PR de cette section cible la branche de la première proposition pour isoler
son diff. Elle doit rester non fusionnée pour revue. Retour arrière : annuler le
commit de cette section. Décision attendue : valider sa présentation avant de
poursuivre la page.
