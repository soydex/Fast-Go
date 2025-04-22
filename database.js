const sqlite3 = require('sqlite3').verbose();

// Créer une connexion à la base de données
const db = new sqlite3.Database('database.db', (err) => {
    if (err) {
        console.error('Erreur lors de l\'ouverture de la base de données', err.message);
    } else {
        console.log('Connexion à la base SQLite réussie.');
    }
});

// Créer une table (si elle n'existe pas déjà)
db.run(`
    CREATE TABLE IF NOT EXISTS reservations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        client_name TEXT NOT NULL,
        vehicle TEXT NOT NULL,
        date TEXT NOT NULL,
        status TEXT NOT NULL
    )
`);
module.exports = db;
