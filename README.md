# Projet de Gestion de Location de Voitures

## Description
Ce projet est une application web permettant de gérer la location de voitures. Il inclut un système d'authentification des utilisateurs, une interface pour gérer les utilisateurs et les véhicules, ainsi qu'un catalogue interactif avec des animations.

## Structure du Projet
### Fichiers JavaScript
- `js/login.js` : Gère la connexion des utilisateurs en envoyant les données au serveur.
- `js/register.js` : Gère l'inscription des utilisateurs en envoyant les données au serveur.
- `database.js` : Configure la base de données SQLite et crée les tables nécessaires pour les utilisateurs et les voitures.
- `js/car.js` : Charge les informations d'une voiture spécifique et les affiche sur une page de détails.
- `js/script_car.js` : Gère l'affichage, l'ajout, la modification et la suppression des voitures dans une table.
- `js/script_user.js` : Gère l'affichage, l'ajout et la suppression des utilisateurs dans une table.
- `js/all_car.js` : Charge et affiche toutes les voitures disponibles dans une page de catalogue avec des animations interactives.
- `js/index.js` : Gère les interactions sur la page d'accueil, y compris les animations, le chargement des voitures et le carrousel dynamique.
- `js/selection-vehicule.js` : Gère les filtres et les interactions sur la page de sélection des véhicules.

### Fichiers HTML
- `index.html` : Page d'accueil du site avec un carrousel dynamique.
- `location_voiture.html` : Page de détails d'une voiture spécifique.
- `catalogue.html` : Page de catalogue affichant toutes les voitures disponibles avec des animations.
- `gestion/gestion_utilisateurs.html` : Page de gestion des utilisateurs avec un formulaire pour ajouter des utilisateurs et une table pour les afficher.
- `gestion/gestion_vehicules.html` : Page de gestion des véhicules avec un formulaire pour ajouter des voitures et une table pour les afficher.
- `log/login.html` : Page de connexion des utilisateurs.
- `log/register.html` : Page d'inscription des utilisateurs.
- `selection-vehicule.html` : Page permettant de filtrer et trier les véhicules.
- `account.html` : Page de profil utilisateur avec des statistiques et un graphique interactif.

### Fichiers CSS
- `css/home.css` : Styles pour la page d'accueil, y compris les sections héros, avis clients et questions fréquentes.
- `css/car_page.css` : Styles pour la page de détails des voitures.
- `css/style.css` : Styles généraux pour les pages de gestion.
- `css/login.css` : Styles pour les pages de connexion et d'inscription.
- `css/catalogue.css` : Styles pour le catalogue avec des animations interactives.
- `css/reset.css` : Réinitialisation des styles par défaut pour une meilleure compatibilité entre navigateurs.
- `css/helpers.css` : Contient des styles utilitaires et des ajustements globaux.

### Fichier JSON
- `package.json` : Liste des dépendances du projet (Express, CORS, SQLite3, MDB UI Kit).

### Fichier Serveur
- `server.js` : Serveur Express qui gère les routes pour les utilisateurs et les voitures, y compris l'ajout, la suppression et la récupération des données.

### Base de Données
- Utilisation de SQLite pour stocker les informations des utilisateurs et des voitures.

## Fonctionnalités Principales
- **Gestion des utilisateurs** : Ajout, suppression et affichage des utilisateurs.
- **Gestion des voitures** : Ajout, modification, suppression et affichage des voitures.
- **Authentification** : Connexion et inscription des utilisateurs.
- **Catalogue de voitures** : Affichage de toutes les voitures disponibles avec des animations.
- **Détails des voitures** : Affichage des informations détaillées d'une voiture spécifique.
- **Paiements** : Gestion des paiements via Stripe.
- **Notifications** : Envoi de notifications et d'emails aux utilisateurs.
- **Analyses** : Suivi des actions des utilisateurs pour des statistiques.

## Fonctionnalités Secondaires
- **Filtres dynamiques** : Filtrer et trier les véhicules par type, transmission, prix, etc.
- **Animations interactives** : Transitions et animations sur les pages du site.
- **Questions fréquentes** : Section FAQ avec des réponses interactives.
- **Avis clients** : Affichage des avis des clients avec un design attrayant.
- **Graphiques dynamiques** : Affichage des statistiques sous forme de graphiques interactifs.

## Technologies Utilisées
- **Backend** : Express.js
- **Base de données** : SQLite
- **Frontend** : HTML, CSS, JavaScript
- **Framework CSS** : MDB UI Kit
- **Bibliothèque de graphiques** : Chart.js

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
4. Configurez Stripe et Nodemailer :
   - Remplacez `votre_clé_secrète_stripe` dans `server.js` par votre clé Stripe.
   - Configurez votre email et mot de passe dans la section Nodemailer.

## Auteur
Projet développé par nous.