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
/*db.run(`
    CREATE TABLE IF NOT EXISTS cars (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    model_name TEXT NOT NULL,
    brand TEXT NOT NULL,
    image_url TEXT,
    transmission TEXT NOT NULL,
    weight INTEGER,
    rental_price_per_day REAL NOT NULL,
    engine_type TEXT NOT NULL,
    horsepower INTEGER NOT NULL,
    torque INTEGER NOT NULL,
    seating_capacity INTEGER NOT NULL
)
`, (err) => {
    if (err) console.error('Erreur lors de la création de la table', err.message);
});*/

/*db.run(`DROP TABLE users`, (err) => {
    if (err) console.error('Erreur lors de la suppression de la table', err.message);
});*/

/*db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role TEXT NOT NULL CHECK (role IN ('user', 'admin')),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`, (err) => {
    if (err) console.error('Erreur lors de la création de la table', err.message);
});
*/


module.exports = db;
