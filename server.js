const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
app.use(express.json());
app.use(cors());

// 🔹 Récupérer tous les utilisateurs
app.get('/users', (req, res) => {
    db.all(`SELECT * FROM users`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// 🔹 Récupérer tous les véhicules
app.get('/cars', (req, res) => {
    db.all(`SELECT * FROM cars`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Ajouter un véhicule
app.post('/cars', (req, res) => {
    const { model_name, brand, image_url, transmission, weight, rental_price_per_day, engine_type, horsepower, torque, seating_capacity } = req.body;
    if (!model_name || !brand || !transmission || !weight || !rental_price_per_day || !engine_type || !horsepower || !torque || !seating_capacity) {
        return res.status(400).json({ error: "Tous les champs sont requis." });
    }

    db.run(`INSERT INTO cars (model_name, brand, image_url, transmission, weight, rental_price_per_day, engine_type, horsepower, torque, seating_capacity) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
    [model_name, brand, image_url, transmission, weight, rental_price_per_day, engine_type, horsepower, torque, seating_capacity], 
    function (err) {
        if (err) {
            console.error('Erreur lors de l\'insertion dans la base de données', err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID, model_name, brand, image_url, transmission, weight, rental_price_per_day, engine_type, horsepower, torque, seating_capacity });
    });
});

// 🔹 Ajouter un utilisateur
app.post('/users', (req, res) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
        return res.status(400).json({ error: "Nom, email, mot de passe et rôle requis." });
    }

    db.run(`INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`, [name, email, password, role], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, name, email, role });
    });
});

// 🔹 Supprimer un utilisateur
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    db.run(`DELETE FROM users WHERE id = ?`, id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Utilisateur supprimé", id });
    });
});


// 🔹 Supprimer un véhicule
app.delete('/cars/:id', (req, res) => {
    const { id } = req.params;

    db.run(`DELETE FROM cars WHERE id = ?`, id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Voiture supprimé", id });
    });
});

// Route d'authentification
app.post('/authenticate', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email et mot de passe requis.' });
  }

  db.get(`SELECT * FROM users WHERE email = ? AND password = ?`, [email, password], (err, row) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    if (!row) return res.status(401).json({ success: false, message: 'Email ou mot de passe incorrect' });

    res.json({ success: true, message: 'Authentification réussie', user: row });
  });
});

// 🔹 Récupérer une voiture par modèle
app.get('/cars/:model_name', (req, res) => {
    const { model_name } = req.params;
    db.get(`SELECT * FROM cars WHERE model_name = ?`, [model_name], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "Voiture non trouvée" });
        res.json(row);
    });
});

app.listen(3000, () => console.log('Serveur sur http://localhost:3000'));