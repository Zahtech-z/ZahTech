# Publication de l’ensemble des changements ZahTech

Autorisation : demande explicite du propriétaire, « time to deploy all changes ».
PR de publication : [#22](https://github.com/Zahtech-z/ZahTech/pull/22), regroupant la pile #8–#21 (accueil, sections, navigation, motion, Z 3D, Liquid Glass, Services, Réalisations, About, Blog, Contact, Privacy et nouvelle étude de cas OnzScore).

## Cible vérifiée

- Équipe Vercel : `anicethermannzies-projects` / `team_KYd2f0NynoAVbJn1cX0WAJKG`.
- Projet : `zahtech-zenith` / `prj_M3gChUg4shfjjaGEOqgyBSe42gUJ`.
- Dépôt relié : `Zahtech-z/ZahTech`, branche de production : `main`.
- Domaines attribués : `zahtech.org` et `zahtech-zenith.vercel.app`.
- Production avant publication : `dpl_6vtX8i2r8ZNSJSXHL88r4vHJ4jat`, état `READY/PROMOTED`, URL `zahtech-zenith-9atdnl5gj-anicethermannzies-projects.vercel.app`, commit déclaré `f30d24a8948f7bfdb62fb1a9d8245f7352a4ec9c`.

L’API du connecteur Vercel reste en erreur 403 malgré l’autorisation indiquée par le propriétaire. L’inspection du même projet et de la même équipe a réussi avec le client Vercel local existant. La publication utilise l’intégration Git du projet, sans créer un nouveau projet ou changer les domaines.

## Dernière correction avant publication

Le contrôle intégré de l’accueil retrouvait une ancienne URL Syne Google Fonts répondant 404. Les deux sources globales Syne/Inter et les préchargements des pages de repli utilisent désormais les fichiers locaux déjà présents, avec leurs licences OFL. Aucun fichier de police supplémentaire, changement de famille ou contournement du contrôle.

## Contrôles observés

- Build local de la version corrigée : réussi.
- TypeScript, ESLint de la route racine et formatage des fichiers corrigés : réussis.
- **37 contrôles globaux de l’accueil réussis après la correction**, sans erreur JavaScript ni HTTP : [résultats](homepage-results.json).
- **94 contrôles des pages intérieures réussis** pendant la préparation : [résultats](interior-results.json). Les deux requêtes Contact étaient interceptées ; aucun courriel réel envoyé.
- **26 contrôles du Z 3D réussis** pendant la préparation : [résultats](r3f-results.json).
- La précédente revue du dernier ensemble OnzScore avait validé 26 contrôles du cas, 24 de Réalisations et 21 du projet sur l’accueil ; preuves dans `../onzscore-live-review`.
- La navigation Liquid Glass avait été vérifiée sur les sept pages avec 58 contrôles ; preuves dans `../sitewide-glass-review`. L’étude de cas vérifie aussi sa propre initialisation.

Les résultats CI et le déploiement de la correction sont à vérifier avant fusion. La PR #22 consignera le commit fusionné et le résultat de la publication. L’état de production n’est pas déduit de ce rapport préparatoire.

## Retour arrière et limites

En cas d’incident après publication, rétablir le déploiement de production identifié ci-dessus, puis annuler la fusion de publication si nécessaire. Aucune migration de données, modification du backend Contact ou intervention sur le produit OnzScore en ligne n’est incluse.

Safari/Firefox, téléphones physiques, lecteur d’écran réel, réception de courriels et parcours de paiement n’ont pas été testés. La vérification après publication portera sur les pages publiques, leurs images/polices, la navigation et les interfaces ordinateur/téléphone.
