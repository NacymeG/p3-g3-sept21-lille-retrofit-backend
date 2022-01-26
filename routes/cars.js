const express = require('express');

const router = express.Router();
const { db } = require('../db-config');


//= =================== GET ALL cars ==================

router.get('/', async (req, res) => {
  try {
    const [cars] = await db.query(`
    SELECT id, brand, model, image, price, VoteNbr
    FROM cars ORDER BY VoteNbr DESC
  `);
    res.json(cars).status(201);
  } catch (err) {
    res.status(404);
    console.warn(err);
  }
});

//= =================== GET ONE car ==================

router.get('/:id', async (req, res) => {
  try {
    const id = await req.params.id;
    const [cars] = await db.query(
      `
    SELECT *
    FROM cars WHERE id = ? ORDER BY VoteNbr DESC
  `,
      [id]
    );
    res.json(cars).status(204);
  } catch (err) {
    res.status(404);
    console.warn(err);
  }
});
//= =================== MODIFY a car ==================

router.put('/:id', async (req, res) => {
  const id = await req.params.id;
  await db.query('UPDATE cars SET ? WHERE id = ?', [req.body, id]);
  res.status(204).json(req.body);
});

//= =================== DELETE a car ==================

router.delete('/:id', async (req, res) => {
  const id = await req.params.id;
  await db.query('DELETE FROM cars WHERE id = ?', [id]);
  res.status(204).json(req.body);
});

//= =================== CREATE a car ==================

router.post('/', async (req, res) => {
  const { image, brand, model, price } = await req.body;

  await db.query(
    'INSERT INTO cars (image, brand, model, price) VALUES (?,?,?,?)',
    [image, brand, model, price]
  );
  res.status(204).json(req.body);
});

//= =================== ADD a vote ==================

router.put('/', async (req, res) => {
  const { carId, userId } = req.body;
  try {
    const [carsVote] = await db.query('SELECT VoteNbr FROM cars WHERE id = ?', [
      carId,
    ]);
    const [userVote] = await db.query('SELECT vote FROM user WHERE id = ?', [
      userId,
    ]);

    const rowIncr = carsVote[0].VoteNbr + 1;
    const userIncr = userVote[0].vote + 1;

    await db.query('UPDATE cars SET voteNbr = ? WHERE id = ?', [
      rowIncr,
      carId,
    ]);
    await db.query('UPDATE user SET vote = ? WHERE id = ?', [userIncr, userId]);
    res.json(rowIncr).status(204);
  } catch (err) {
    res.status(404);
    console.warn(err);
  }
});


module.exports = router;
