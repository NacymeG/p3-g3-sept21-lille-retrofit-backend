const express = require('express');

const router = express.Router();
const { db } = require('../db-config');

router.get('/', async (req, res) => {
  try {
    const [location] = await db.query(`
    SELECT id, type, name, streetNumber, street, postalCode, city, latitude, longitude, phone
    FROM location
  `);
    res.json(location);
  } catch (err) {
    res.status(404);
    console.warn(err);
  }
});
module.exports = router;
