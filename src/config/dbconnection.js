const mysql = require('mysql2');

// Configuration de la connexion à la base de données MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Wankul',
});

module.exports = connection;