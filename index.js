const express = require('express');
const { backPort } = require('./db-config');
const teamRoutes = require('./routes/team');

const app = express();
app.use(express.json());

app.use('/team', teamRoutes);

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
