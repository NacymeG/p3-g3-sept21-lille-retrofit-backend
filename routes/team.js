const express = require('express');

const router = express.Router();
const { db } = require('../db-config');

router.get('/', async (req, res) => {
  try {
    const [team] = await db.query(`
    SELECT firstName, lastName, profilPic, linkedinUrl, role
    FROM staff
  `);
    res.json(team);
  } catch (err) {
    res.status(404).send();
    console.warn(err);
  }
});

module.exports = router;
