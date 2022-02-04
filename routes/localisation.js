const express = require('express');

const router = express.Router();
const { db } = require('../db-config');

router.get('/', async (req, res) => {
  try {
    const [location] = await db.query(`
    SELECT id, type, name, streetNumber, street, postalCode, city, latitude, longitude, phone
    FROM location
  `);
    res.json(location).status(201);
  } catch (err) {
    res.status(404);
  }
});
module.exports = router;
