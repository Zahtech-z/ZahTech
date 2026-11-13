# About, Blog, Contact, Privacy — revue visuelle

Statut : prêt pour revue visuelle, sans fusion ni déploiement.
Branche : `feat/interior-pages-review`, basée sur `experiment/liquid-glass-navigation`.

## Changements

Les quatre pages reprennent le fond noir, Inter local, le blanc chaud, les accents orange, la navigation flottante et le pied de page déjà retenus. Les apparitions progressives utilisent le composant Framer Motion existant ; le formulaire et le corps du texte juridique restent directement lisibles.

About conserve le fondateur, les trois principes et les quatre disciplines. Blog conserve son état de préparation sans article inventé. Contact conserve ses champs, ses validations et son contrat API. Privacy conserve intégralement ses sept sections et sa date d’effet. Les textes EN/FR/ES sont comparés au contenu rendu avant modification : seuls les espaces et la casse de présentation des petits libellés auparavant forcés en majuscules sont normalisés.

OnzScore et le serveur d’envoi du formulaire ne sont pas modifiés. Aucune dépendance ajoutée. Les changements du routeur généré ne sont pas inclus.

## Vérifié personnellement

- `npm run build` : réussi, sortie locale Vercel uniquement.
- `node node_modules/typescript/bin/tsc --noEmit` : réussi.
- ESLint ciblé sur le composant partagé et les routes modifiées : réussi.
- `scripts/verify-interior-pages.cjs` : **94 contrôles réussis**, Chromium 149.0.7827.55 ; aucune erreur JavaScript ni HTTP locale. Résultats dans [browser-results.json](browser-results.json).
- Quatre pages, trois langues, largeurs 320/390/768/1024/1440 px, texte à 100 % et 200 % : absence de débordement horizontal, de titre ou champ coupé et de chevauchement avec la navigation. Un débordement des listes Privacy en français à 200 % a été corrigé.
- Contenu d’origine, titres/identifiants, liens de contact, navigation mobile et retour du focus par Échap, police locale et URLs canoniques contrôlés.
- Réduction des animations et absence de JavaScript : contenu complet conservé et titres visibles.
- Contact : validation des champs et du courriel, erreur avec conservation des saisies et nouvelle tentative, succès annoncé et blocage d’un second envoi. Les deux requêtes sont interceptées dans le navigateur ; **zéro envoi réel**.
- Inspection visuelle des captures complètes ordinateur et téléphone des quatre pages.
- Régressions : accueil/navigation **27**, contact/pied de page **22**, services **21** contrôles réussis. Résultats JSON joints.

## Échec et limites

Le script plus large `verify-homepage.cjs` a échoué sur son assertion finale d’absence d’erreurs HTTP : les anciennes URLs Google Fonts Inter v18 et Syne v22, déjà présentes avant cette branche dans `src/styles.css` et `src/routes/__root.tsx`, répondent 404. Le test n’a pas été affaibli et cet échec n’est pas présenté comme un succès. Les quatre pages de cette proposition chargent Inter localement et leur audit HTTP est réussi. Les anciens chemins de polices, dont ceux de la page OnzScore laissée en pause, restent à traiter séparément.

Non testé : Safari/Firefox, appareils physiques, lecteur d’écran réel, réception d’un courriel par Resend, CI distante et production. Aucun audit juridique du texte Privacy n’a été effectué.

## Aperçu local et captures

Le serveur local est lancé sur [About](http://127.0.0.1:3100/about), [Blog](http://127.0.0.1:3100/blog), [Contact](http://127.0.0.1:3100/contact) et [Privacy](http://127.0.0.1:3100/privacy). Il utilise l’adaptateur local existant hors dépôt ; aucune route de revue n’est ajoutée au site.

| Page    | Ordinateur                     | Téléphone                     |
| ------- | ------------------------------ | ----------------------------- |
| About   | [Capture](about-desktop.png)   | [Capture](about-mobile.png)   |
| Blog    | [Capture](blog-desktop.png)    | [Capture](blog-mobile.png)    |
| Contact | [Capture](contact-desktop.png) | [Capture](contact-mobile.png) |
| Privacy | [Capture](privacy-desktop.png) | [Capture](privacy-mobile.png) |

Les fichiers `*-first-screen.png` montrent également le premier écran. Le script de vérification nécessite Playwright disponible via `PLAYWRIGHT_MODULE` et un serveur sur `BASE_URL` (défaut : `http://127.0.0.1:3100`).

Décision attendue : revue visuelle des quatre pages. Retour arrière : abandonner cette PR non fusionnée ; après intégration éventuelle, annuler son commit suffit, sans migration de données.
