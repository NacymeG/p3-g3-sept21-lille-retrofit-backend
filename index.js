const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { setupRoutes } = require('./routes/index');
const { backPort } = require('./db-config');

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

setupRoutes(app);

// 404 Error
app.use('/', (req, res) => {
  const msg = `Page not found: ${req.method} ${req.url}`;
  console.log(`404 - ${msg}`);
  res.status(404).send(msg);
});

app.listen(backPort, () => {
  console.log(`Retrofit is listen on http://localhost:${backPort} !`);
});
