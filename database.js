const sqlite3 = require('sqlite3').verbose();

// Créer une connexion à la base de données
const db = new sqlite3.Database('database.db', (err) => {
    if (err) {
        console.error('Erreur lors de l\'ouverture de la base de données', err.message);
    } else {
        console.log('Connexion à la base SQLite réussie.');
    }
});

db.run(`
    CREATE TABLE IF NOT EXISTS reservations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        client_name TEXT NOT NULL,
        vehicle_id TEXT NOT NULL,
        start_date TEXT NOT NULL,
        end_date TEXT NOT NULL,
        status TEXT NOT NULL,
        FOREIGN KEY (vehicle_id) REFERENCES cars(id) ON DELETE CASCADE
    )
`, (err) => {
    if (err) {
        console.error('Erreur lors de la création de la table reservations', err.message);
    } else {
        console.log('Table reservations vérifiée/créée avec succès.');
    }
});

module.exports = db;
