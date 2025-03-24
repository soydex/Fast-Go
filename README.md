# Projet de Gestion de Location de Voitures

## Description
Ce projet est une application web permettant de gérer la location de voitures. Il inclut un système d'authentification des utilisateurs, ainsi qu'une interface pour gérer les utilisateurs et les véhicules.

## Structure du Projet
### Fichiers JavaScript
- `js/login.js` : Gère l'inscription des utilisateurs en envoyant les données au serveur.
- `database.js` : Configure la base de données SQLite et crée les tables nécessaires pour les utilisateurs et les voitures.
- `js/car.js` : Charge les informations d'une voiture spécifique et les affiche sur une page de détails.
- `js/script_car.js` : Gère l'affichage, l'ajout et la suppression des voitures dans une table.
- `js/script_user.js` : Gère l'affichage, l'ajout et la suppression des utilisateurs dans une table.
- `js/all_car.js` : Charge et affiche toutes les voitures disponibles dans une page de catalogue.

### Fichiers HTML
- `location_voiture.html` : Page de détails d'une voiture spécifique.
- `catalogue.html` : Page de catalogue affichant toutes les voitures disponibles.
- `gestion/gestion_utilisateurs.html` : Page de gestion des utilisateurs avec un formulaire pour ajouter des utilisateurs et une table pour les afficher.
- `gestion/gestion_vehicules.html` : Page de gestion des véhicules avec un formulaire pour ajouter des voitures et une table pour les afficher.
- `log/login.html` : Page de connexion des utilisateurs.
- `log/register.html` : Page d'inscription des utilisateurs.

### Fichiers CSS
- `css/car_page.css` : Styles pour la page de détails des voitures.
- `css/style.css` : Styles généraux pour les pages de gestion.
- `css/login.css` : Styles pour les pages de connexion et d'inscription.

### Fichier JSON
- `package.json` : Liste des dépendances du projet (Express, CORS, SQLite3, MDB UI Kit).

### Fichier Serveur
- `server.js` : Serveur Express qui gère les routes pour les utilisateurs et les voitures, y compris l'ajout, la suppression et la récupération des données.

### Base de Données
- Utilisation de SQLite pour stocker les informations des utilisateurs et des voitures.

## Fonctionnalités Principales
- **Gestion des utilisateurs** : Ajout, suppression et affichage des utilisateurs.
- **Gestion des voitures** : Ajout, suppression et affichage des voitures.
- **Authentification** : Connexion et inscription des utilisateurs.
- **Catalogue de voitures** : Affichage de toutes les voitures disponibles.
- **Détails des voitures** : Affichage des informations détaillées d'une voiture spécifique.

## Technologies Utilisées
- **Backend** : Express.js
- **Base de données** : SQLite
- **Frontend** : HTML, CSS, JavaScript
- **Framework CSS** : MDB UI Kit

## Installation
1. Cloner le dépôt :
   ```bash
   git clone <lien-du-repo>
   cd <nom-du-repo>
   ```
2. Installer les dépendances :
   ```bash
   npm install
   ```
3. Démarrer le serveur :
   ```bash
   node server.js
   ```

## Auteur
Projet développé par [Ton Nom / Ton Équipe].

