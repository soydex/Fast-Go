# Projet de Gestion de Location de Voitures

## Description
Ce projet est une application web permettant de gérer la location de voitures. Il inclut un système d'authentification des utilisateurs, ainsi qu'une interface pour gérer les utilisateurs, les véhicules et les réservations.

## Structure du Projet
### Fichiers JavaScript
- `js/login.js` : Gère la connexion des utilisateurs en envoyant les données au serveur.
- `js/register.js` : Gère l'inscription des utilisateurs en envoyant les données au serveur.
- `js/car.js` : Charge les informations d'une voiture spécifique et les affiche sur une page de détails.
- `js/script_car.js` : Gère l'affichage, l'ajout, la mise à jour et la suppression des voitures dans une table.
- `js/script_user.js` : Gère l'affichage, l'ajout, la mise à jour et la suppression des utilisateurs dans une table.
- `js/all_car.js` : Charge et affiche toutes les voitures disponibles dans une page de catalogue.
- `js/index.js` : Gère les interactions sur la page d'accueil, y compris les animations, le carrousel et le chargement des voitures.
- `js/selection-vehicule.js` : Gère les filtres et les interactions sur la page de sélection des véhicules.
- `js/account.js` : Gère les informations utilisateur, les statistiques, les réservations et les messages pour les administrateurs.
- `js/admin.js` : Gère les informations administratives et la déconnexion.
- `js/client.js` : Gère les informations client et la déconnexion.

### Fichiers HTML
- `index.html` : Page d'accueil du site.
- `location_voiture.html` : Page de détails d'une voiture spécifique.
- `catalogue.html` : Page de catalogue affichant toutes les voitures disponibles.
- `gestion/utilisateurs.html` : Page de gestion des utilisateurs avec un formulaire pour ajouter des utilisateurs et une table pour les afficher.
- `gestion/vehicules.html` : Page de gestion des véhicules avec un formulaire pour ajouter des voitures et une table pour les afficher.
- `log/login.html` : Page de connexion des utilisateurs.
- `log/register.html` : Page d'inscription des utilisateurs.

### Fichiers CSS
- `css/home.css` : Styles pour la page d'accueil, y compris les sections héros, avis clients et questions fréquentes.
- `css/car_page.css` : Styles pour la page de détails des voitures.
- `css/style.css` : Styles généraux pour les pages de gestion.
- `css/login.css` : Styles pour les pages de connexion et d'inscription.
- `css/reset.css` : Réinitialisation des styles par défaut pour une meilleure compatibilité entre navigateurs.
- `css/helpers.css` : Contient des styles utilitaires et des ajustements globaux.

### Fichier JSON
- `package.json` : Liste des dépendances du projet (Express, CORS, SQLite3, MDB UI Kit).

### Fichier Serveur
- `server.js` : Serveur Express qui gère les routes pour les utilisateurs, les voitures, les réservations et les messages.

### Base de Données
- Utilisation de SQLite pour stocker les informations des utilisateurs, des voitures et des réservations.

## Fonctionnalités Principales
- **Gestion des utilisateurs** : Ajout, mise à jour, suppression et affichage des utilisateurs.
- **Gestion des voitures** : Ajout, mise à jour, suppression et affichage des voitures.
- **Gestion des réservations** : Ajout, suppression et affichage des réservations.
- **Authentification** : Connexion et inscription des utilisateurs.
- **Catalogue de voitures** : Affichage de toutes les voitures disponibles.
- **Détails des voitures** : Affichage des informations détaillées d'une voiture spécifique.
- **Carrousel interactif** : Présentation des voitures phares sur la page d'accueil.
- **Paiements** : Gestion des paiements via Stripe.
- **Notifications** : Envoi de notifications et d'emails aux utilisateurs.
- **Analyses** : Suivi des actions des utilisateurs pour des statistiques.

## Fonctionnalités Secondaires
- **Filtres dynamiques** : Filtrer et trier les véhicules par type, transmission, prix, etc.
- **Animations interactives** : Transitions et animations sur la page d'accueil.
- **Questions fréquentes** : Section FAQ avec des réponses interactives.
- **Avis clients** : Affichage des avis des clients avec un design attrayant.
- **Gestion des messages** : Envoi et réception de messages pour les administrateurs.

## Technologies Utilisées
- **Backend** : Express.js
- **Base de données** : SQLite
- **Frontend** : HTML, CSS, JavaScript
- **Framework CSS** : MDB UI Kit

## Installation
1. Cloner le dépôt :
   ```bash
   git clone https://github.com/soydex/Fast-Go.git
   cd Fast-Go
   ```
2. Installer les dépendances :
   ```bash
   npm install
   ```
3. Démarrer le serveur :
   ```bash
   node server.js
   ```

## Licence
Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.