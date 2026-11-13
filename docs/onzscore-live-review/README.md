# OnzScore — nouvelle étude de cas du produit en ligne

Statut : prêt pour revue visuelle, sans fusion ni déploiement.
Tâche : ONZ-LIVE-CASE · propriétaire : ZahTech · branche : `feat/onzscore-live-case-study`, basée sur `feat/interior-pages-review` (PR #20).

[Voir l’aperçu local](http://127.0.0.1:3100/work/onzscore).

## Ce qui change

L’ancienne page conservait un fond clair, des captures d’octobre et la mention « préparation à la production ». Elle est remplacée par une présentation du produit actuel : composition d’ouverture avec les écrans officiels, défi et réponse de ZahTech, quatre aperçus interactifs, expérience mobile, vue d’ensemble de l’ingénierie, puis liens vers le produit et son historique public.

La navigation Liquid Glass et le pied de page sombre accompagnent désormais cette page. L’accueil et Réalisations reprennent une nouvelle couverture de portfolio et le statut en ligne. Le lien historique `/work/matchwise` reste une redirection vers `/work/onzscore`.

Les anciens visuels restent dans le dépôt pour l’historique ; ils ne composent plus la nouvelle étude de cas. Le brouillon OnzScore précédemment mis de côté n’a pas été réappliqué. Aucun code du produit OnzScore, formulaire de contact, paiement ou environnement de production n’est modifié.

## Direction et réalisation

Produit : rendre les probabilités et les analyses de football compréhensibles, sur ordinateur et téléphone.
Caractère : précis, sportif, posé.
Univers : le terrain et les outils de lecture d’un match.
Moments visuels : compositions d’écrans de téléphone, puis aperçu interactif du produit.
Signature : le tracé discret d’un terrain derrière les écrans et la numérotation orange du récit.

| Travail       | Résultat                                                                                                                          |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Espacement    | Sections de 96 px sur ordinateur et 56 px sur téléphone, largeur de lecture limitée                                               |
| Couleur       | Noir, blanc chaud et orange ZahTech ; les couleurs d’OnzScore restent dans ses écrans                                             |
| Icônes        | Lucide, 16 px et trait 1,5 ; aucune décoration emoji                                                                              |
| Texte         | Nouveau statut vérifié, description du produit actuel, aucun chiffre de performance ou témoignage inventé                         |
| Typographie   | Inter local déjà choisi, titres composés et poids 500                                                                             |
| Composition   | Ouverture en deux colonnes, images généreuses, récit aéré ; sélecteur compact sur téléphone                                       |
| Détails       | États actifs, liens en taille réelle, focus clavier et destinations fonctionnelles                                                |
| Illustrations | Écrans officiels intégrés dans des compositions HTML/CSS et un tracé SVG ; couverture exportée en 1600 × 1000                     |
| Motion        | Apparitions Framer Motion existantes, transition courte des aperçus, réduction des animations respectée ; aucun défilement bloqué |

## Sources et limites des affirmations

**VÉRIFIÉ le 13 novembre 2026 dans Chromium :** [onzscore.com](https://onzscore.com/) est accessible (HTTP 200). Le navigateur a permis d’observer le premier écran et les pages publiques [Matchs](https://onzscore.com/matches), [Historique du modèle](https://onzscore.com/track-record) et [VIP](https://onzscore.com/vip). L’outil de lecture web n’accédait pas au site ; l’observation a donc été effectuée dans un vrai navigateur.

Les huit images officielles proviennent de `https://onzscore.com/landing/{matches,match,streaks,vip}-neutral-{en,fr}.webp`, chacune téléchargée avec une réponse HTTP 200. Elles sont hébergées localement sous `public/images/onzscore/live`. Leurs empreintes sont dans [asset-hashes.json](asset-hashes.json). Il s’agit d’aperçus officiels contenant des données illustratives, clairement signalées dans la page ; leurs chiffres ne sont pas présentés comme des performances du produit.

La présentation est disponible en anglais, français et espagnol. Les images suivent l’anglais et le français du produit ; en espagnol, l’utilisation des écrans anglais est indiquée dans la légende et les textes alternatifs.

Les technologies du schéma reprennent les faits du produit déjà documentés dans le dépôt par son propriétaire. Le schéma reste une vue d’ensemble ; la topologie et les services actuellement déployés n’ont pas été audités. La présence des offres VIP a été observée, mais aucun paiement, abonnement ou compte n’a été créé ou testé. Aucun taux de réussite, nombre d’utilisateurs ou résultat commercial n’est revendiqué.

## Vérifications réalisées

- `npm run build` : réussi, construction locale uniquement.
- TypeScript `--noEmit`, ESLint ciblé et Prettier sur les fichiers concernés : réussis.
- `scripts/verify-onzscore-case.cjs` : **26 contrôles réussis**, Chromium 149.0.7827.55 avec SwiftShader ; aucune erreur JavaScript ni HTTP locale. [Résultats](browser-results.json).
- Anglais, français, espagnol ; 320/390/768/1024/1440 px ; texte à 100 % et 200 % : absence de débordement, de titre ou bouton coupé et de chevauchement avec la navigation. Le chevauchement initial à 320 px / 200 % a été corrigé puis revérifié.
- Quatre aperçus activables au clavier, état actif unique, conservation du focus, fichiers et textes alternatifs localisés, liens vers les images originales. Menu mobile et retour du focus par Échap vérifiés.
- Véritable surface Liquid Glass initialisée avec un instantané de cette page, apparition du titre observée, titres/identifiants cohérents, police locale et URL canonique.
- Contact, retour aux réalisations, nouvelle couverture et statut, retour vers l’étude de cas, redirection de l’ancienne URL : vérifiés. Aucun formulaire réel envoyé.
- Réduction des animations et absence de JavaScript : récit et schéma visibles ; liens directs vers les quatre images disponibles sans JavaScript.
- `verify-work-page.cjs` : **24 contrôles réussis** ; [résultats](work-regression.json).
- `verify-selected-work.cjs` : **21 contrôles réussis** ; [résultats](home-work-regression.json).
- Captures finales ordinateur et téléphone inspectées.

Non testé : Safari/Firefox, appareils physiques, lecteur d’écran réel, application installée, parcours authentifiés, paiement, réception d’un courriel, CI distante et production. Le contrôle global de toutes les autres pages n’a pas été relancé pour cette modification ciblée.

## Livrables

| Vue                | Ordinateur                          | Téléphone                          |
| ------------------ | ----------------------------------- | ---------------------------------- |
| Premier écran      | [Capture](desktop-first-screen.png) | [Capture](mobile-first-screen.png) |
| Page complète      | [Capture](desktop.png)              | [Capture](mobile.png)              |
| Sélecteur d’écrans | [Capture](desktop-explorer.png)     | [Capture](mobile-explorer.png)     |

La couverture est reproductible avec `scripts/capture-onz-cover.cjs`, à partir du serveur local. Les scripts utilisent une installation existante de Playwright via `PLAYWRIGHT_MODULE` ; aucune dépendance applicative n’a été ajoutée.

Décision attendue : revue visuelle de la nouvelle présentation. Pas de fusion automatique. Retour arrière : abandonner la PR ou annuler son commit ; aucune donnée ni configuration du produit en ligne n’est concernée.
