# Premier écran ZahTech — revue visuelle

Tâche : navigation et accueil uniquement. Propriétaire de la revue : ZahTech.
Statut : en attente de revue visuelle.
Branche : `feat/hero-navigation-review`.

## Proposition

Fond encre, grain et éclairage discrets, titre Syne blanc chaud ponctué d’orange,
navigation flottante et deux liens vers les pages Contact et Work. L’apparition
Framer Motion dure au plus 0,8 seconde, sans bloquer le défilement. Le HTML reste
lisible sans JavaScript et la réduction des animations est respectée.

Le logo existant, les sections suivantes et la navigation des autres pages sont
conservés. Les nouveaux textes EN/FR/ES restent séparés des CTA partagés.
Syne et Inter sont embarquées sous des alias réservés au premier écran, avec
leurs licences OFL : les anciennes URL externes sont invalides. Les fichiers
partagés de styles et de polices des autres sections ne sont pas modifiés.

## Aperçu et captures

Aperçu local : http://127.0.0.1:3100/ (serveur du build lancé pour cette revue).

- [Ordinateur, 1440 × 1000](desktop.png)
- [Téléphone, 390 × 844](mobile.png)
- [Téléphone, français](mobile-fr.png)
- [Menu téléphone ouvert](mobile-menu.png)
- [Résultats navigateur détaillés](browser-results.json)

## Preuves vérifiées

- `npm run build` : terminé avec code 0, client et serveur générés.
- `./node_modules/.bin/tsc.cmd --noEmit` : code 0.
- `./node_modules/.bin/eslint.cmd src/components/site/Hero.tsx src/components/site/Nav.tsx src/lib/hero-copy.ts` : code 0.
- `node scripts/verify-home-hero.cjs` : 27 contrôles réussis dans Chromium 149.
- Navigation vers Services, Work, About, Blog et les deux destinations des CTA.
- Menu mobile : ouverture, fermeture au clic extérieur et avec Échap, retour du
  focus, navigation Contact. Lien d’évitement clavier et défilement natif.
- EN/FR/ES à 320, 390, 768, 1024 et 1440 px : pas de débordement horizontal ni de
  chevauchement entre le titre et la navigation. Choix de langue mémorisé.
- Apparition observée avec mouvement normal, contenu immédiatement visible avec
  réduction des animations, contenu serveur visible sans JavaScript.
- Polices locales chargées ; lien de bas de section hors du bouton WhatsApp.
- Captures finales inspectées visuellement. Aucun changement de production.

## Limites et éléments non testés

- **Référence Webcodge : non observée dans un navigateur.** Le navigateur connecté
  était indisponible, puis le contrôle Windows s’est arrêté faute de pouvoir
  vérifier l’URL active. Seul son contenu textuel a pu être lu via l’outil web.
  Aucune fidélité de proportions ou d’animations n’est revendiquée.
- Tests sur Chromium avec tailles d’écran simulées ; Safari, Firefox, appareils
  physiques et lecteur d’écran non testés. Audit WCAG complet et CI non vérifiés.
- Les formulaires, envois de messages et autres fonctions du reste du site ne
  sont pas retestés. Aucun service externe ni secret ajouté.
- Les anciens préchargements Google Fonts de la racine restent inchangés : des
  requêtes externes annulées apparaissent dans le rapport. Les deux polices
  locales du nouveau premier écran sont vérifiées séparément.
- Le build produit des avertissements de dépendances TanStack/Rollup sans bloquer
  la compilation. La commande standard `npm run preview` échoue dans cette
  installation Nitro (`serveStatic is not a function`). L’aperçu consultable sert
  le build via un adaptateur HTTP local à son export Web `fetch`, hors du dépôt.
- Les dépendances préexistantes ont été réutilisées par jonction dans un worktree.
  Aucune installation ni modification du manifeste. Aucun déploiement exécuté.

## Reproduction et suite

Avec Playwright déjà installé et son Chromium disponible : lancer le site local,
puis définir `PLAYWRIGHT_MODULE` vers le package Playwright et exécuter
`node scripts/verify-home-hero.cjs`. `BASE_URL` permet de cibler un autre aperçu.
Le script régénère les captures et le rapport JSON dans ce dossier.

Décision attendue : valider ou ajuster la direction du premier écran. La PR doit
rester non fusionnée. Retour arrière : annuler le commit de cette proposition.
Aucun travail sur les sections suivantes avant cette revue.
