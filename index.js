const cookieParser = require('cookie-parser')
const connection = require('./db-config');
const { setupRoutes } = require('./routes');

const express = require('express');
const cors = require('cors')

const app = express();
const port = process.env.PORT;
const db = connection.promise();
require('dotenv').config();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
setupRoutes(app);

app.use('/', (req, res) => {
  res.status(404).send('Route not found! ');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
