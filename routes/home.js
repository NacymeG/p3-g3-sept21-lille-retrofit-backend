const express = require('express');

const router = express.Router();
const { db } = require('../db-config');

router.get('/', async (req, res) => {
  try {
    const [home] = await db.query(`
    SELECT source, image, description, date
    FROM news
  `);
    res.json(home);
  } catch (err) {
    res.status(404).send();
    console.warn(err);
  }
});

module.exports = router;
