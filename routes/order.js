const express = require('express');

const router = express.Router();
const { db } = require('../db-config');

// =========== GET ALL Orders =========== //

router.post('/preorder', async (req, res) => {
  const { id } = req.body;
  try {
    const [order] = await db.query(
      `
    SELECT *
    FROM orders
    JOIN cars
    ON cars.id = orders.cars_id
    JOIN user ON user.id = orders.user_id
    WHERE user_id = ?
  `,
      [id]
    );
    res.json(order).status(201);
  } catch (err) {
    res.status(404);
  }
});
//= =====================
router.post('/', async (req, res) => {
  const { id, cars, state } = req.body;

  await db.query(
    'INSERT INTO orders (user_id, cars_id, state) VALUES (?,?,?)',
    [id, cars, state]
  );

  res.status(204).json(req.body);
});
module.exports = router;
