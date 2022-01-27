const express = require('express');

const router = express.Router();
const { db } = require('../db-config');

// =========== GET ALL Orders =========== //

router.get('/', async (req, res) => {
  try {
    const [order] = await db.query(`
    SELECT *
    FROM orders
    JOIN cars
    ON cars.id = orders.cars_id
    JOIN user ON user.id = orders.user_id
    WHERE orders.user_id = 12
  `);
    res.json(order).status(201);
  } catch (err) {
    res.status(404);
    console.warn(err);
  }
});

module.exports = router;
