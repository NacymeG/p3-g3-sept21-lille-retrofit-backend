const express = require('express');
const cors = require('cors');
const { setupRoutes } = require('./routes');

const app = express();
const port = process.env.PORT;
require('dotenv').config();

app.use(express.json());
app.use(cors());
setupRoutes(app);

app.use('/', (req, res) => {
  res.status(404).send('Route not found! ');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
