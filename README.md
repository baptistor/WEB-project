# WEB-project
Ce projet est une application web full-stack utilisant **Angular** pour le front-end et **NestJS** pour le back-end. Cette application web porte sur la numérisation de la gestion d'associations par des utilisateurs. Elle permet entre autre à des utilisateurs de se connecter ou de s'inscrire, de gérer des rôles dans des associations, ou encore d'ajouter des procès verbaux.

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
Si jamais vous n'avez pas les droits nécessaire pour executer ces scripts, ajoutez les : 
```bash
chmod +x start.sh stop.sh setup.sh
```
Une fois les serveurs lancé, le front tourne sur `localhost:4200`et le back sur `localhost:3000`

## Partie Backend 

Toute la partie backend est un projet NestJS qui est un framework Web côté serveur basé sur Node.js.  
Concrètement, le projet est divisé en modules qui ont des responsabilités métier précises. Dans le cas de notre projet, nous avons définis 5 modules : Users, Associations, Roles et Minutes pour la gestion de chaque entité nécessaire au service web demandé. Et enfin le module Auth qui s'occupe de la sécurité du côté backend. Chaque module contient une couche Controller ainsi qu'une couche Service.
La couche Controller gère les requêtes HTTP entrantes (GET, POST, PUT, DELETE) et détermine quelles actions doivent être exécutées, en appelant les méthodes appropriées du Service.
La couche Service contient la logique métier et effectue les opérations nécessaires (comme les interactions avec la base de données) pour répondre aux requêtes initiées par le Controller.
Enfin, dans chaque module, il y a un fichier entity pour déclarer la classe de l'entité ainsi que sa structure et ses relations avec d'autres entités dans la base de données.

La base de données utilisée est SQLite, configurée via TypeORM pour gérer les tables et leurs relations. Les entités définissent la structure des tables en utilisant des décorateurs spécifiques. Dans notre projet, TypeORM synchronise automatiquement la base avec les entités pour simplifier les opérations CRUD.


La sécurité du projet repose sur la mise en place de JWT pour authentifier les utilisateurs via un token, garantissant ainsi un accès sécurisé aux API. Lors de la connexion, un token est généré avec des informations utilisateur et expirant lors de la déconnexion de l'utilisateur . Les mots de passe sont stockés sous forme de hash grâce à bcrypt, renforçant la protection contre les fuites de données.
