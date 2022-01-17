const argon2 = require('argon2');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { db } = require('../db-config');

const { PRIVATE_KEY } = process.env;

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

//= =================== Validation ============================

const signupValidation = (data, forCreation = true) => {
  const presence = forCreation ? 'required' : 'optional';
  return Joi.object({
    mail: Joi.string().email().max(128).presence(presence),
    password: Joi.string()
      .max(64)
      .presence(presence)
      .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
    repeatPass: Joi.ref('password'),
    firstname: Joi.string().min(1).max(64).presence(presence),
    lastname: Joi.string().min(1).max(64).presence(presence),
  }).validate(data, { abortEarly: false }).error;
};
const loginValidation = (data, forCreation = true) => {
  const presence = forCreation ? 'required' : 'optional';
  return Joi.object({
    mail: Joi.string().email().presence(presence),
    password: Joi.string().presence(presence),
  }).validate(data, { abortEarly: false }).error;
};
//= ================== Sign up =========================

const credidentialCheck = async ({ mail }) => {
  const rows = await db.query(`SELECT id FROM user WHERE mail = ?`, [mail]);
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

//= ================== Log in ==========================
const verifyEmail = async (mail) => {
  const [rows] = await db.query(
    `SELECT id, mail, password, firstname, lastname, vote FROM user WHERE mail = ?`,
    [mail]
  );

  return rows[0];
};

const verifyPassword = (plainPassword, hashedPassword) => {
  return argon2.verify(hashedPassword, plainPassword, hashingOptions);
};

//= ==================== JWT =================================

const decode = (jwtToken) => {
  return jwt.decode(jwtToken);
};

const calculateToken = (userEmail, userID) => {
  return jwt.sign({ email: userEmail, user_id: userID }, PRIVATE_KEY);
};

//= ====================================================

module.exports = {
  createUser,
  verifyPassword,
  hashPassword,
  credidentialCheck,
  signupValidation,
  loginValidation,
  verifyEmail,
  decode,
  calculateToken,
};
