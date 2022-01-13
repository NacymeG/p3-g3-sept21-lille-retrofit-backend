const express = require('express');

const router = express.Router();
const { db } = require('../db-config');

router.get('/', async (req, res) => {
  try {
    const [cars] = await db.query(`
    SELECT model, image, price 
    FROM cars 
  `);
    res.json(cars);
  } catch (err) {
    res.status(404);
    console.warn(err);
  }
});

module.exports = router;
