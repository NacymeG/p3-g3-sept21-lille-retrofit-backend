const express = require('express');
const router = express.Router();
const { db } = require('../db-config');

//= ========== GET ALL Reviews =================

router.get('/', async (req, res) => {
  try {
    const [review] = await db.query(`
    SELECT  *
    FROM review
  `);
    res.json(review).status(201);
  } catch (err) {
    res.status(404).send('Not found');
  }
});

//= =================== GET ONE Review ==================

router.get('/:id', async (req, res) => {
  try {
    const id = await req.params.id;
    const [review] = await db.query(
      `
    SELECT  *
    FROM review WHERE id = ?
  `,
      [id]
    );
    res.json(review).status(201);
  } catch (err) {
    res.status(404);
  }
});

//= =================== MODIFY a Review ==================

router.put('/:id', async (req, res) => {
  const id = await req.params.id;
  await db.query('UPDATE review SET ? WHERE id = ?', [req.body, id]);
  res.status(204).json(req.body);
});

//= =================== DELETE a Review ==================

router.delete('/:id', async (req, res) => {
  const id = await req.params.id;
  await db.query('DELETE FROM review WHERE id = ?', [id]);
  res.status(204).json(req.body);
});

//= =================== CREATE a Review ==================

router.post('/', async (req, res) => {
  const { content, rating, firstname, lastname } = await req.body;
  await db.query(
    'INSERT INTO review (content, rating, firstname, lastname) VALUES (?,?,?,?)',
    [content, rating, firstname, lastname]
  );
  res.status(204).json(req.body);
});
module.exports = router;
