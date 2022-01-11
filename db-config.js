require('dotenv').config();
const mysql = require('mysql2');

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, BACK_PORT } = process.env;

const db = mysql.createPool({
  host: DB_HOST, // address of the server
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

module.exports = {
  db,
  backPort: BACK_PORT,
};
