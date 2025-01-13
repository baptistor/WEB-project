# WEB-project
Ce projet est une application web full-stack utilisant **Angular** pour le front-end et **NestJS** pour le back-end. Cette application web porte sur la numérisation de la gestion d'associations par des utilisateurs. Elle permet entre autre à des utilisateurs de se connecter ou de s'inscrire, de gérer des rôles dans des associations, ou encore d'ajouter des procès verbaux (minutes).

## Installation et utilisation du projet
Dans cette section, nous verrons comment récupérer et lancer l'application web
### Pré-requis
Il faut avoir installer [Node.js](https://nodejs.org/en/download/) pour pouvoir utiliser le projet. Ensuite, 
### Récupération du projet
Pour récupérer le projet :  
```bash
git clone git@github.com:baptistor/WEB-project.git
```
### Setup et lancement de l'application
Placez vous à la racine du projet : 
```bash
cd WEB-project
```
Pour installer les dépendances, executez le script `setup.sh` : 
```bash
./setup.sh
```
Pour lancer les serveurs front et back, executez le script `start.sh` :
```bash
./start.sh
```
Pour arrêter les serveurs, executez le script `stop.sh` :
```bash
./stop.sh
```
Si jamais vous n'avez pas les droits nécessaire pour executer ces scripts, modifiez les : 
```bash
chmod +x start.sh stop.sh setup.sh
```
Une fois les serveurs lancé, le front tourne sur `localhost:4200`et le back sur `localhost:3000`. Les logs sont présents dans le fichier `log` à la racine du projet.

## Partie Backend 

Toute la partie backend est un projet NestJS qui est un framework Web côté serveur basé sur Node.js.  
Concrètement, le projet est divisé en modules qui ont des responsabilités métier précises. Dans le cas de notre projet, nous avons définis 5 modules : Users, Associations, Roles et Minutes pour la gestion de chaque entité nécessaire au service web demandé. Et enfin le module Auth qui s'occupe de la sécurité du côté backend. Chaque module contient une couche Controller ainsi qu'une couche Service.
La couche Controller gère les requêtes HTTP entrantes (GET, POST, PUT, DELETE) et détermine quelles actions doivent être exécutées, en appelant les méthodes appropriées du Service.
La couche Service contient la logique métier et effectue les opérations nécessaires (comme les interactions avec la base de données) pour répondre aux requêtes initiées par le Controller.
Enfin, dans chaque module, il y a un fichier entity pour déclarer la classe de l'entité ainsi que sa structure et ses relations avec d'autres entités dans la base de données.

La base de données utilisée est SQLite, configurée via TypeORM pour gérer les tables et leurs relations. Les entités définissent la structure des tables en utilisant des décorateurs spécifiques. Dans notre projet, TypeORM synchronise automatiquement la base avec les entités pour simplifier les opérations CRUD.


La sécurité du projet repose sur la mise en place de JWT pour authentifier les utilisateurs via un token, garantissant ainsi un accès sécurisé aux API. Lors de la connexion, un token est généré avec des informations utilisateur et expirant lors de la déconnexion de l'utilisateur. Malheureusement, nous n'arrivons pas à injecter le token depuis le front dans le header des requêtes, donc la sécurité est désactivée. Les mots de passe sont stockés sous forme de hash grâce à bcrypt, renforçant la protection contre les fuites de données.

## Partie Frontend

Le projet Frontend, développé avec Angular en mode standalone, permet de gérer plusieurs fonctionnalités : l'authentification des utilisateurs, la gestion des profils utilisateurs et des associations, ainsi que la recherche et la liste des utilisateurs et des associations.

Le Frontend communique avec le Backend en envoyant des requêtes aux endpoints définis dans les contrôleurs. Afin d'assurer le bon fonctionnement de l'application, il est impératif que les deux serveurs soient démarrés. Pour simplifier la gestion des requêtes dans les composants, un service nommé api-helper est utilisé. Ce service centralise les fonctions nécessaires aux opérations CRUD.

L'association entre les différents composants angular et les url se fait dans le fichier `app.routes.ts`

Le service `token-storage.service.ts` est utilisé pour gérer la sauvegarde des différents tokens nécessaires à l'application. Lorsqu'un utilisateur se connecte, ce service stocke le token renvoyé par le backend après authentification, ainsi que l'ID de l'utilisateur, et met à jour la valeur du booléen `IS_LOGGED_IN` à true. Ce booléen est ensuite utilisé pour définir deux guards, `not-auth` et `auth`, permettant de contrôler l'accès aux pages en fonction de l'état de connexion de l'utilisateur.

En théorie, le token d'authentification devrait être automatiquement ajouté aux headers de toutes les requêtes grâce au fichier `token.interceptor.ts`, garantissant ainsi la sécurité côté backend. Cependant, ce mécanisme ne fonctionne pas actuellement, ce qui nous a conduit à désactiver la sécurité côté backend.