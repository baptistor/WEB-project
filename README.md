# Projet Programmation Application Web
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
