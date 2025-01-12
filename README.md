# WEB-project
Front avec Angular et Back avec NestJS dans le langage TypeScript 

## Partie Backend 

Toute la partie backend est un projet NestJS qui est un framework Web côté serveur basé sur Node.js.  
Concrètement, le projet est divisé en modules qui ont des responsabilités métier précises. Dans le cas de notre projet, nous avons définis 5 modules : Users, Associations, Roles et Minutes pour la gestion de chaque entité nécessaire au service web demandé. Et enfin le module Auth qui s'occupe de la sécurité du côté backend. Chaque module contient une couche Controller ainsi qu'une couche Service.
La couche Controller gère les requêtes HTTP entrantes (GET, POST, PUT, DELETE) et détermine quelles actions doivent être exécutées, en appelant les méthodes appropriées du Service.
La couche Service contient la logique métier et effectue les opérations nécessaires (comme les interactions avec la base de données) pour répondre aux requêtes initiées par le Controller.
Enfin, dans chaque module, il y a un fichier entity pour déclarer la classe de l'entité ainsi que sa structure et ses relations avec d'autres entités dans la base de données.

La base de données utilisée est SQLite, configurée via TypeORM pour gérer les tables et leurs relations. Les entités définissent la structure des tables en utilisant des décorateurs spécifiques. Dans notre projet, TypeORM synchronise automatiquement la base avec les entités pour simplifier les opérations CRUD.


La sécurité du projet repose sur la mise en place de JWT pour authentifier les utilisateurs via un token, garantissant ainsi un accès sécurisé aux API. Lors de la connexion, un token est généré avec des informations utilisateur et expirant lors de la déconnexion de l'utilisateur . Les mots de passe sont stockés sous forme de hash grâce à bcrypt, renforçant la protection contre les fuites de données.