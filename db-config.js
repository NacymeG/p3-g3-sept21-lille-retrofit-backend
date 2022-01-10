require('dotenv').config();
const mysql = require('mysql2');

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const connection = mysql.createConnection({
  host: DB_HOST, // address of the server
  port: DB_PORT, // port of the DB server (mysql), not to be confused with the nodeJS server PORT !
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

module.exports = connection;
