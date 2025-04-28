const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("database.db", (err) => {
  if (err) {
    console.error(
      "Erreur lors de l'ouverture de la base de données",
      err.message
    );
  } else {
    console.log("Connexion à la base SQLite réussie.");
  }
});



module.exports = db;
