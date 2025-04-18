const express = require('express');
const cors = require('cors');
const db = require('./database');
const app = express();
app.use(express.json());
app.use(cors());
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const stripe = require('stripe')('votre_clé_secrète_stripe');
const helmet = require('helmet');
const nodemailer = require('nodemailer');

app.use(helmet());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'votre_email@gmail.com',
        pass: 'votre_mot_de_passe',
    },
});

// Middleware pour vérifier le token
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// Middleware pour vérifier si l'utilisateur est administrateur
function authenticateAdmin(req, res, next) {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: "Accès interdit : droits administrateur requis." });
    }
    next();
}

// 🔹 Récupérer tous les utilisateurs (protégé par admin)
app.get('/users', authenticateToken, authenticateAdmin, (req, res) => {
    db.all(`SELECT * FROM users`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// 🔹 Récupérer tous les véhicules (protégé par admin)
app.get('/cars', authenticateToken, authenticateAdmin, (req, res) => {
    db.all(`SELECT * FROM cars`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Ajouter un véhicule (protégé par admin)
app.post('/cars', authenticateToken, authenticateAdmin, (req, res) => {
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

// 🔹 Ajouter un utilisateur (protégé par admin)
app.post('/users', authenticateToken, authenticateAdmin, (req, res) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
        return res.status(400).json({ error: "Nom, email, mot de passe et rôle requis." });
    }

    db.run(`INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`, [name, email, password, role], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, name, email, role });
    });
});

// 🔹 Supprimer un utilisateur (protégé par admin)
app.delete('/users/:id', authenticateToken, authenticateAdmin, (req, res) => {
    const { id } = req.params;

    db.run(`DELETE FROM users WHERE id = ?`, id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Utilisateur supprimé", id });
    });
});

// 🔹 Mettre à jour un utilisateur (protégé par admin)
app.put('/users/:id', authenticateToken, authenticateAdmin, (req, res) => {
    const { id } = req.params;
    const { name, email, role } = req.body;

    if (!name || !email || !role) {
        return res.status(400).json({ error: "Nom, email et rôle requis." });
    }

    db.run(
        `UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?`,
        [name, email, role, id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Utilisateur mis à jour", id });
        }
    );
});

// 🔹 Supprimer un véhicule (protégé par admin)
app.delete('/cars/:id', authenticateToken, authenticateAdmin, (req, res) => {
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



const SECRET_KEY = 'vidaloca'; // Remplacez par une clé secrète sécurisée

// 🔹 Inscription d'un utilisateur
app.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
        return res.status(400).json({ error: "Nom, email, mot de passe et rôle requis." });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.run(`INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`, [name, email, hashedPassword, role], function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID, name, email, role });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 🔹 Connexion d'un utilisateur
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email et mot de passe requis.' });
    }

    db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!user) return res.status(401).json({ error: 'Email ou mot de passe incorrect' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ error: 'Email ou mot de passe incorrect' });

        const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    });
});

// Exemple de route protégée
app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Accès autorisé', user: req.user });
});

// 🔹 Récupérer les informations de l'utilisateur connecté
app.get('/me', authenticateToken, (req, res) => {
    const userId = req.user.id;
    db.get(`SELECT id, name, email, role FROM users WHERE id = ?`, [userId], (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });
        res.json(user);
    });
});

// 🔹 Mettre à jour un véhicule (protégé par admin)
app.put('/cars/:id', authenticateToken, authenticateAdmin, (req, res) => {
    const { id } = req.params;
    const { model_name, brand, image_url, transmission, weight, rental_price_per_day, engine_type, horsepower, torque, seating_capacity } = req.body;

    if (!model_name || !brand || !image_url || !transmission || !weight || !rental_price_per_day || !engine_type || !horsepower || !torque || !seating_capacity) {
        return res.status(400).json({ error: "Tous les champs sont requis." });
    }

    db.run(
        `UPDATE cars SET model_name = ?, brand = ?, image_url = ?, transmission = ?, weight = ?, rental_price_per_day = ?, engine_type = ?, horsepower = ?, torque = ?, seating_capacity = ? WHERE id = ?`,
        [model_name, brand, image_url, transmission, weight, rental_price_per_day, engine_type, horsepower, torque, seating_capacity, id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Véhicule mis à jour", id });
        }
    );
});


// 🔹 Route pour récupérer les analyses
app.get('/analytics', authenticateToken, (req, res) => {
    db.all(`SELECT * FROM user_actions`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Fonction pour enregistrer les actions des utilisateurs
function logUserAction(userId, action) {
    db.run(`INSERT INTO user_actions (user_id, action) VALUES (?, ?)`, [userId, action], (err) => {
        if (err) console.error('Erreur lors de l\'enregistrement de l\'action utilisateur:', err.message);
    });
}

// Exemple d'utilisation
app.post('/some-protected-route', authenticateToken, (req, res) => {
    logUserAction(req.user.id, 'Accès à une route protégée');
    res.json({ success: true });
});

// 🔹 Démarrer le serveur
app.listen(3000, () => console.log('Serveur sur http://localhost:3000'));