# Liquid Glass — navigation commune

L’effet auparavant réservé à l’accueil est activé par défaut pour la navigation flottante : accueil, Services, Réalisations, About, Blog, Contact et Privacy. Les pages OnzScore laissées en pause conservent leur navigation précédente.

Le composant libère sa surface WebGL et reconstruit son instantané après chaque changement de chemin. La surface suit aussi les changements de langue et de largeur. Les liens et boutons restent des éléments HTML natifs au-dessus du verre ; le menu ouvert utilise un fond sombre stable.

Réduction des animations, contraste élevé, économie de données, absence de JavaScript ou de WebGL : navigation lisible avec le repli existant. Aucune nouvelle dépendance et aucun changement du formulaire ou des textes.

## Vérification

Résultats observés sur le build final : build, TypeScript et ESLint ciblé réussis ; **58 contrôles Liquid Glass réussis**, aucune erreur JavaScript ni HTTP locale ; **94 contrôles des quatre pages réussis**, sans envoi réel de formulaire. Les captures ordinateur/téléphone ont été inspectées. Les deux premiers essais ont été relancés après actualisation du serveur pour utiliser les fichiers du build final de façon cohérente.

Le script `scripts/verify-liquid-nav.cjs` couvre le shader réel, les pixels au défilement, les langues, la navigation entre pages, l’unicité de la surface, le menu et ses retours de focus, ainsi que les cinq modes de repli sur les sept pages. Le dossier contient ses captures à 1440 et 390 px, en haut de page et après défilement. Le rendu WebGL est vérifié avec Chromium SwiftShader ; les appareils physiques et les autres navigateurs ne sont pas testés.

Le contrôle `scripts/verify-interior-pages.cjs` vérifie également que les quatre pages récentes conservent leur contenu et leurs fonctionnalités ; il distingue désormais la surface décorative dans la navigation des éventuels canvas dans le contenu.

Voir `browser-results.json` pour le résultat effectif du contrôle Liquid Glass et `../interior-pages-review/browser-results.json` pour les quatre pages. Le rapport de la revue initiale et ses limites restent dans `../interior-pages-review/README.md`.

Aperçu local : [Services](http://127.0.0.1:3100/services), [Réalisations](http://127.0.0.1:3100/work), [About](http://127.0.0.1:3100/about), [Blog](http://127.0.0.1:3100/blog), [Contact](http://127.0.0.1:3100/contact), [Privacy](http://127.0.0.1:3100/privacy).

Pas de fusion ni de publication en production. Le retour arrière consiste à annuler le commit de généralisation du verre.
