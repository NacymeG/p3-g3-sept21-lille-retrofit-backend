const express = require('express');

const router = express.Router();
const { db } = require('../db-config');

//= ========== GET ALL Member =================

router.get('/', async (req, res) => {
  try {
    const [team] = await db.query(`
    SELECT  id, firstName, lastName, profilPic, linkedinUrl, role
    FROM staff
  `);
    res.json(team).status(201);
  } catch (err) {
    res.status(404).send();
    console.warn(err);
  }
});

//= =================== GET ONE Member ==================

router.get('/:id', async (req, res) => {
  try {
    const id = await req.params.id;
    console.log('get', id);
    const [team] = await db.query(
      `
    SELECT  id, firstName, lastName, profilPic, linkedinUrl, role
    FROM staff WHERE id = ?
  `,
      [id]
    );
    res.json(team).status(201);
  } catch (err) {
    res.status(404);
    console.warn(err);
  }
});

//= =================== MODIFY a Member ==================

router.put('/:id', async (req, res) => {
  const id = await req.params.id;
  console.log('put', id);

  await db.query('UPDATE staff SET ? WHERE id = ?', [req.body, id]);
  res.status(204).json(req.body);
});

//= =================== DELETE a Member ==================

router.delete('/:id', async (req, res) => {
  const id = await req.params.id;
  await db.query('DELETE FROM staff WHERE id = ?', [id]);
  res.status(204).json(req.body);
});

//= =================== CREATE a Member ==================

router.post('/', async (req, res) => {
  const { firstName, lastName, profilPic, linkedinUrl, role } = await req.body;
  console.log(firstName, lastName, profilPic, linkedinUrl, role);
  await db.query(
    'INSERT INTO staff (firstName, lastName, profilPic, linkedinUrl, role) VALUES (?,?,?,?,?)',
    [firstName, lastName, profilPic, linkedinUrl, role]
  );

  res.status(204).json(req.body);
});
module.exports = router;
