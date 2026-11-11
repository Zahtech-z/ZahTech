# Contact et pied de page — sixième revue visuelle

Statut : en attente de revue ZahTech.
Branche : `feat/home-contact-footer-review`, basée sur `feat/home-process-review`.
Périmètre : fin de l’accueil, section Contact et variante sombre du pied de page.

## Proposition

Grand titre Inter centré, appel à démarrer un projet et accès direct à l’e-mail,
sur fond encre avec accents orange. Le pied de page reprend le logo existant,
les liens de navigation, de confidentialité et les profils sociaux du dépôt.
Le texte reste dans le système EN/FR/ES ; le libellé du bouton reprend celui du
premier écran. Aucun délai de réponse ni engagement commercial ajouté.

Le composant partagé de pied de page reçoit une option `dark`, activée seulement
sur l’accueil. Les pages intérieures gardent leur variante par défaut. La page
de demande de projet et son traitement d’envoi ne sont pas modifiés.

## Aperçu et captures

- http://127.0.0.1:3100/?review=closing#contact
- [Contact ordinateur](desktop.png) · [Pied de page ordinateur](desktop-footer.png)
- [Contact téléphone](mobile.png) · [Pied de page téléphone](mobile-footer.png)
- [Contact téléphone FR](mobile-fr.png) · [Résultats détaillés](browser-results.json)

Les éléments fixes sont masqués uniquement pendant les captures isolées, pour
éviter les artefacts de collage. Ils restent présents sur le site.

## Vérifié

- `npm run build` : code 0.
- `./node_modules/.bin/tsc.cmd --noEmit` : code 0.
- `./node_modules/.bin/eslint.cmd src/components/site/Contact.tsx src/components/site/HomeFooter.tsx` : code 0.
- `node scripts/verify-home-contact-footer.cjs` : 22 contrôles réussis, Chromium 149.
- Destination Contact, adresse e-mail, six liens internes et trois URL sociales
  conservés ; accès au formulaire existant vérifié sans soumission.
- Navigation des six liens du pied de page vérifiée, avec variante par défaut
  conservée sur les destinations intérieures.
- Cibles d’au moins 44 px et focus clavier visible ; EN/FR/ES à 320, 390, 768,
  1024 et 1440 px sans débordement horizontal.
- Réduction des animations et contenu statique sans JavaScript vérifiés.
- Aucune erreur runtime relevée ; aucun POST vers `/api/contact` pendant le test.
- Captures ordinateur, téléphone et français inspectées visuellement.

## Limites et suite

Safari, Firefox, appareils physiques, lecteur d’écran, audit complet d’accessibilité
et CI non vérifiés. L’ouverture du client mail, les profils sociaux, l’envoi et la
réception des demandes ne sont pas testés. Les anciennes requêtes de polices et
avertissements de dépendances restent hors périmètre. Aperçu servi par l’adaptateur
local du build déjà documenté. Aucune nouvelle dépendance ni publication en production.

Reproduction : avec Playwright et Chromium déjà disponibles, définir
`PLAYWRIGHT_MODULE` vers le package existant puis exécuter
`node scripts/verify-home-contact-footer.cjs`. `BASE_URL` permet de changer l’aperçu.

La PR cible la branche Méthode (#12), pour isoler cette étape, et reste non
fusionnée. Retour arrière : annuler le commit de cette section. La revue globale
de l’accueil peut suivre ; aucune fusion ni publication automatique.
