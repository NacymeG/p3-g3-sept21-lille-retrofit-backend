const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { backPort } = require('./db-config');
const teamRoutes = require('./routes/team');
const { setupRoutes } = require('./routes');
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/team', teamRoutes);

setupRoutes(app);

// 404 Error
app.use('/', (req, res) => {
  const msg = `Page not found: ${req.method} ${req.url}`;
  console.log(`404 - ${msg}`);
  res.status(404).send(msg);
});

app.listen(backPort, () => {
  console.log(
    `express-revisions API now available on http://localhost:${backPort} !`
  );
});
