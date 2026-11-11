# Revue globale de l’accueil

Statut : en attente de revue ZahTech. Branche : `fix/homepage-final-review`.
Base : `feat/home-contact-footer-review` (#13). Aucun déploiement ni fusion.

## Résultat et corrections

La revue porte sur l’accueil complet, du premier écran au pied de page.
Elle a révélé des débordements de texte et de navigation avec une police racine
agrandie à 200 %, ainsi que deux préchargements de polices externes en erreur 404.

- Les titres et liens peuvent se répartir sans être coupés. Navigation adaptable
  et menu mobile défilant lorsque le texte occupe plus d’espace.
- L’accueil précharge Inter localement. Les textes auxiliaires utilisent aussi
  cette police sur l’accueil ; le comportement des pages intérieures est conservé.
- Les boutons flottants, uniquement composés d’icônes, gardent leurs cibles de
  56 et 44 px avec le texte agrandi.
- L’ancien test du premier écran ciblait tous les éléments `header`, devenus
  multiples après l’ajout des sections sémantiques. Il cible maintenant précisément
  `header.home-nav`, en conservant sa vérification du chevauchement avec le titre.

Les textes, coordonnées, projets, liens et sections validés ne sont pas changés.
Le formatage des deux fichiers de routes modifiés suit Prettier.

## Aperçu et captures

- http://127.0.0.1:3100/?review=final
- [Accueil entier — ordinateur](desktop-full.png)
- [Accueil entier — téléphone](mobile-full.png)
- [Accueil entier — téléphone FR](mobile-fr-full.png)
- [Premier écran ordinateur](desktop-top.png) · [Premier écran téléphone](mobile-top.png)
- [Téléphone avec texte à 200 %](mobile-text-200.png)
- [Résultats globaux](browser-results.json) · [Synthèse des tests](summary.json)

Captures complètes réalisées sur le build final et inspectées. Le premier écran
est capturé avec la navigation et les contrôles fixes présents. Les sections
sont révélées avant la capture pour que l’ensemble du contenu soit visible.

## Vérifications exécutées

- `npm run build` : code 0.
- `./node_modules/.bin/tsc.cmd --noEmit` : code 0.
- ESLint exécuté sur les deux routes modifiées et les huit composants de l’accueil : code 0.
- `git diff --check` : réussi.
- `node scripts/verify-homepage.cjs` : **37 contrôles globaux réussis**.
- Les six scripts existants rejoués sur le build final : **133 contrôles réussis**.
  Leurs JSON sont conservés dans [regressions](regressions/).
- Total : **170 contrôles**, Chromium 149. Aucun POST de demande de contact envoyé.

Les contrôles globaux couvrent EN/FR/ES à 320, 390, 768, 1024 et 1440 px avec une
police racine à 100 % et 200 %, la navigation, le menu clavier avec texte agrandi,
le lien d’évitement, les titres et identifiants uniques, l’image et son texte
alternatif, le contenu statique sans JavaScript et les préchargements de polices.
**Aucune erreur runtime ou HTTP détectée sur l’accueil.**

Les suites de régression couvrent les contenus de chaque section, leurs liens,
le formulaire accessible sans soumission, les langues, les pieds de page des
pages intérieures, la réduction des animations et le contenu sans JavaScript.

## Limites et éléments restant hors périmètre

- Firefox, Safari, appareils physiques, lecteur d’écran, audit WCAG complet et
  CI non vérifiés. Le contrôle à 200 % modifie la taille de police racine ; il ne
  prétend pas reproduire toutes les fonctions de zoom des navigateurs ou du système.
- Les pages intérieures restent dans leur présentation existante, avec leurs
  anciennes polices externes. Les requêtes annulées et erreurs de police sur ces
  routes apparaissent dans les diagnostics de régression, séparés de l’accueil.
- Envoi/réception du formulaire, ouverture du client mail et profils sociaux non testés.
- Avertissements des dépendances de build préexistants et adaptateur local d’aperçu
  inchangés. Aucune dépendance installée ni action de production.
- La référence Webcodge n’a pas pu être observée dans un navigateur, comme indiqué
  dans la première revue. Aucune fidélité visuelle exacte n’est revendiquée.

## Reproduction et intégration

Avec Playwright et Chromium déjà présents, définir `PLAYWRIGHT_MODULE` vers leur
installation puis lancer `node scripts/verify-homepage.cjs`. `BASE_URL` permet de
changer l’aperçu. Les scripts `verify-home-*.cjs` et `verify-selected-work.cjs`
peuvent être relancés depuis un dossier de travail séparé pour isoler leurs captures.

Les PR #8 à #13 restent des étapes de revue empilées. Cette dernière PR cible #13
et reste non fusionnée. L’intégration sera à préparer après validation de la revue
globale. Retour arrière : annuler le commit de cette revue ; les étapes précédentes
restent disponibles sur leurs branches. Décision attendue : revue de l’accueil complet.
