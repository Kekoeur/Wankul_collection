const express = require('express');
const mysql = require('mysql');
const connection = require('../config/dbconnection');

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
  const query = 'SELECT * FROM user';

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


app.get('/api/collections/users/:userId', (req, res) => {
  const user_id = req.params.userId;

  const query = 'SELECT * FROM collection WHERE user_id = ?';
  const values = [user_id];
  const formattedQuery = mysql.format(query, values);

  connection.query(formattedQuery, (error, results) => {
    if (error) {
      console.error('Erreur lors de la récupération des collections de l\'utilisateur', user_id, 'depuis la base de données', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des collections de l\'utilisateur depuis la base de données' });
    } else {
      if (results.length === 0) {
        res.status(404).json({ error: 'Aucune collection trouvée' });
      } else {
        const collections = results;
        res.json(collections);
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
  const { userId, username, email, password } = req.body;

  const query = 'INSERT INTO user (user_id, username, email, password) VALUES (?, ?, ?, ?)';
  const values = [userId, username, email, password];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Erreur lors de la création de l\'utilisateur', error);
      res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
    } else {
      res.json({ success: true });
    }
  });
});

app.post('/api/collection', (req, res) => {
  const { collectionId, collection_name, user } = req.body;
  const composition = "{}";

  const query = 'INSERT INTO collection (collection_id, user_id, collection_name, composition) VALUES (?, ?, ?, ?)';
  const values = [collectionId, user, collection_name, composition];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Erreur lors de la création de la collection', error);
      res.status(500).json({ error: 'Erreur lors de la création de la collection' });
    } else {
      res.json({ success: true });
    }
  });
});

// Endpoint pour récupérer les données de la table "users" d'un utilisateur
app.get('/api/users/name/:username', (req, res) => {
  const username = req.params.username;

  const query = 'SELECT * FROM user WHERE username = ?';
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

  const query = 'SELECT * FROM user WHERE email = ?';
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


// Endpoint pour récupérer les données de la table "collection"
app.get('/api/collection/name/:collection_name', (req, res) => {
  const collection_name = req.params.collection_name;
  const user_id = req.query.user_id;
  console.log(user_id)

  const query = 'SELECT * FROM collection WHERE collection_name = ? AND user_id = ?';
  const values = [collection_name, user_id];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Erreur lors de la récupération de la collection depuis la base de données avec le nom d\'utilisateur', error);
      res.status(500).json({ error: 'Erreur lors de la récupération de la collection depuis la base de données avec le nom d\'utilisateur' });
    } else {
      res.json(results);
    }
  });
});

// Endpoint pour récupérer les données de la table "deck"
app.get('/api/deck/name/:deck_name', (req, res) => {
  const collection_name = req.params.deck_name;
  const user_id = req.query.userId;

  const query = 'SELECT * FROM deck WHERE deck_name = ? AND user_id = ?';
  const values = [deck_name, user_id];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Erreur lors de la récupération du deck depuis la base de données avec le nom d\'utilisateur', error);
      res.status(500).json({ error: 'Erreur lors de la récupération du deck depuis la base de données avec le nom d\'utilisateur' });
    } else {
      res.json(results);
    }
  });
});


// Démarrer le serveur
app.listen(8000, () => {
  console.log('API backend en cours d\'écoute sur le port 8000');
});

