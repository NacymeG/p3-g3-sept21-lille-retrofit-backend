const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { setupRoutes } = require('./routes');
const { backPort } = require('./db-config');

const app = express();

require('dotenv').config();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
setupRoutes(app);

app.use('/', (req, res) => {
  res.status(404).send('Route not found! ');
});

app.listen(backPort, () => {
  console.log(`Server listening on port ${backPort}`);
});
