const express = require('express');

const router = express.Router();
const { db } = require('../db-config');

router.get('/localisation', async (req, res) => {
  const [location] = await db.query(`
    SELECT id, type, name, streetNumber, street, postalCode, city, latitude, longitude
    FROM location
  `);
  console.log(location);
  res.json(location);
});
module.exports = router;
