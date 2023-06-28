const express = require('express');
const mysql = require('mysql');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware pour activer CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Autoriser les requêtes depuis localhost:3000
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Autoriser les méthodes HTTP spécifiées
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Autoriser les en-têtes spécifiés
  // Ajouter les en-têtes suivants pour autoriser les requêtes préalables
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '86400');

  if (req.method === 'OPTIONS') {
    // Répondre directement aux requêtes préalables
    res.status(200).end();
  } else {
    // Passer au middleware suivant
    next();
  }
});


// Configuration de la connexion à la base de données MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Wankul',
});

// Endpoint pour récupérer les données de la table "deck"
app.get('/api/decks', (req, res) => {
  const query = 'SELECT * FROM deck';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Erreur lors de la récupération des decks depuis la base de données', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des decks depuis la base de données' });
    } else {
      res.json(results);
    }
  });
});

// Endpoint pour récupérer les données de la table "users"
app.get('/api/users', (req, res) => {
  const query = 'SELECT * FROM users';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Erreur lors de la récupération des utilisateurs depuis la base de données', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs depuis la base de données' });
    } else {
      res.json(results);
    }
  });
});

// Endpoint pour récupérer les données de la table "collection"
app.get('/api/collections', (req, res) => {
  const query = 'SELECT * FROM collection';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Erreur lors de la récupération des collections depuis la base de données', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des collections depuis la base de données' });
    } else {
      res.json(results);
    }
  });
});

app.get('/api/collections/:collectionId', (req, res) => {
  const collectionId = req.params.collectionId;

  const query = 'SELECT * FROM collection WHERE collection_id = ?';
  const values = [collectionId];
  const formattedQuery = mysql.format(query, values);
  console.log(formattedQuery);

  connection.query(formattedQuery, (error, results) => {
    if (error) {
      console.error('Erreur lors de la récupération de la collection', collectionId, 'depuis la base de données', error);
      res.status(500).json({ error: 'Erreur lors de la récupération de la collection depuis la base de données' });
    } else {
      if (results.length === 0) {
        res.status(404).json({ error: 'Collection non trouvée' });
      } else {
        const collection = results[0];
        res.json(collection);
      }
    }
  });
});


app.put('/api/collections/:collectionId', (req, res) => {
  const collectionId = req.params.collectionId;
  const newComposition = req.body.newComposition;

  const query = 'UPDATE collection SET composition = ? WHERE collection_id = ?';
  const values = [newComposition, collectionId];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Erreur lors de la mise à jour de la composition de la collection', error);
      res.status(500).json({ error: 'Erreur lors de la mise à jour de la composition de la collection' });
    } else {
      res.json({ success: true });
    }
  });
});

app.post('/api/users', (req, res) => {
  const { username, password, email } = req.body;

  const query = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
  const values = [username, password, email];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Erreur lors de la création de l\'utilisateur', error);
      res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
    } else {
      res.json({ success: true });
    }
  });
});

// Endpoint pour récupérer les données de la table "users" d'un utilisateur
app.get('/api/users/name/:username', (req, res) => {
  const username = req.params.username;

  const query = 'SELECT * FROM users WHERE username = ?';
  const values = [username];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur depuis la base de données avec le nom d\'utilisateur', error);
      res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur depuis la base de données avec le nom d\'utilisateur' });
    } else {
      res.json(results);
    }
  });
});

// Endpoint pour récupérer les données de la table "users" d'un email utilisateur
app.get('/api/users/email/:email', (req, res) => {
  const email = req.params.email;

  const query = 'SELECT * FROM users WHERE email = ?';
  const values = [email];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur depuis la base de données avec l\'email', error);
      res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur depuis la base de données avec l\'email' });
    } else {
      res.json(results);
    }
  });
});


// Démarrer le serveur
app.listen(8000, () => {
  console.log('API backend en cours d\'écoute sur le port 8000');
});

