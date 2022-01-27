const express = require('express');

const router = express.Router();
const { db } = require('../db-config');

//= =================== MODIFY a news ==================

router.put('/:id', async (req, res) => {
  const id = await req.params.id;
  await db.query('UPDATE news SET ? WHERE id = ?', [req.body, id]);
  res.status(204).json(req.body);
});

//= =================== MODIFY user ==================

router.post('/', async (req, res) => {
  const { source, image, description, date } = await req.body;

  await db.query(
    'INSERT INTO news (source, image, description, date) VALUES (?,?,?,?)',
    [source, image, description, date]
  );

  res.status(204).json(req.body);
});

module.exports = router;
