const express = require('express');

const router = express.Router();
const { db } = require('../db-config');

//= =================== MODIFY user information ==================

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { streetNumber, firstname, lastname, street, city, postalCode, phone } =
    req.body;
  try {
    await db.query(
      `
    UPDATE user
    SET streetNumber=?, firstname=?, lastname=?, street=?, city=?, postalCode=?, phone=?
    WHERE id=?;
  `,
      [streetNumber, firstname, lastname, street, city, postalCode, phone, id]
    );
    res.status(201).json(req.body);
  } catch (err) {
    res.status(404);
    console.warn(err);
  }
});

module.exports = router;
