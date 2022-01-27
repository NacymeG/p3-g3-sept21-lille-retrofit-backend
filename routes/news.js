const express = require('express');

const router = express.Router();
const { db } = require('../db-config');

//= ========== GET ALL News =================

router.get('/', async (req, res) => {
  try {
    const [news] = await db.query(`
    SELECT id, source, image, description, date
    FROM news
  `);
    res.json(news).status(201);
  } catch (err) {
    res.status(404);
    console.warn(err);
  }
});

//= =================== GET ONE news ==================

router.get('/:id', async (req, res) => {
  try {
    const id = await req.params.id;
    const [news] = await db.query(
      `
    SELECT id, source, image, description, date
    FROM news WHERE id = ?
  `,
      [id]
    );
    res.json(news).status(201);
  } catch (err) {
    res.status(404);
    console.warn(err);
  }
});

//= =================== MODIFY a news ==================

router.put('/:id', async (req, res) => {
  const id = await req.params.id;
  await db.query('UPDATE news SET ? WHERE id = ?', [req.body, id]);
  res.status(204).json(req.body);
});

//= =================== DELETE a news ==================

router.delete('/:id', async (req, res) => {
  const id = await req.params.id;
  await db.query('DELETE FROM news WHERE id = ?', [id]);
  res.status(204).json(req.body);
});

//= =================== CREATE a news ==================

router.post('/', async (req, res) => {
  const { source, image, description, date } = await req.body;

  await db.query(
    'INSERT INTO news (source, image, description, date) VALUES (?,?,?,?)',
    [source, image, description, date]
  );

  res.status(204).json(req.body);
});

module.exports = router;
