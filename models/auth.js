const argon2 = require('argon2');
const Joi = require('joi');
const connection = require('../db-config');

const db = connection.promise();

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};
//= =================== Validation ============================

const validate = (data, forCreation = true) => {
  const presence = forCreation ? 'required' : 'optional';
  return Joi.object({
    mail: Joi.string().email().max(128).presence(presence),
    password: Joi.string().max(64).presence(presence),
    firstname: Joi.string().min(1).max(64).presence(presence),
    lastname: Joi.string().min(1).max(64).presence(presence),
  }).validate(data, { abortEarly: false }).error;
};

//= ================== Sign up =========================

const credidentialCheck = async ({ mail }) => {
  const rows = await db.query(`SELECT id FROM user WHERE mail = ?`, [mail]);
  // console.log('Allo :', rows[0][0].id);
  return rows[0][0];
};

const createUser = ({ firstname, lastname, hashPwd, mail }) => {
  return db.query(
    `INSERT INTO user (firstname, lastname, password, mail) VALUES (?,?,?,?)`,
    [firstname, lastname, hashPwd, mail]
  );
};

const hashPassword = (plainPassword) => {
  return argon2.hash(plainPassword, hashingOptions);
};
//= ====================================================
//= ================== Log in ==========================

const verifyPassword = (plainPassword, hashedPassword) => {
  return argon2.verify(hashedPassword, plainPassword, hashingOptions);
};

//= ====================================================

module.exports = {
  createUser,
  verifyPassword,
  hashPassword,
  credidentialCheck,
  validate,
};
