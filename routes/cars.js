const express = require('express');

const router = express.Router();
const { db } = require('../db-config');

//= =================== GET all cars ==================

router.get('/', async (req, res) => {
  try {
    const [cars] = await db.query(`
    SELECT id, model, image, price, VoteNbr
    FROM cars ORDER BY VoteNbr DESC
  `);
    res.json(cars);
  } catch (err) {
    res.status(404);
    console.warn(err);
  }
});

//= =================== ADD a vote ==================

router.put('/', async (req, res) => {
  console.log(req.body);
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
