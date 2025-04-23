const sqlite3 = require('sqlite3').verbose();

// Créer une connexion à la base de données
const db = new sqlite3.Database('database.db', (err) => {
    if (err) {
        console.error('Erreur lors de l\'ouverture de la base de données', err.message);
    } else {
        console.log('Connexion à la base SQLite réussie.');
    }
});

// Supprimer la table si elle existe déjà
db.run(`DROP TABLE IF EXISTS reservations`, (err) => {
    if (err) {
        console.error('Erreur lors de la suppression de la table reservations', err.message);
    } else {
        console.log('Table reservations supprimée avec succès.');

        // Créer une nouvelle table
        db.run(`
            CREATE TABLE reservations (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                client_name TEXT NOT NULL,
                vehicle_id INTEGER NOT NULL,
                start_date TEXT NOT NULL,
                end_date TEXT NOT NULL,
                status TEXT NOT NULL,
                FOREIGN KEY (vehicle_id) REFERENCES cars(id) ON DELETE CASCADE
            )
        `, (err) => {
            if (err) {
                console.error('Erreur lors de la création de la table reservations', err.message);
            } else {
                console.log('Table reservations créée avec succès.');
            }
        });
    }
});
module.exports = db;
