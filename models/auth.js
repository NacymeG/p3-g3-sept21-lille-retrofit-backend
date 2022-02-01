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
    mail: Joi.string().email().max(128).presence(presence).messages({
      'string.email': `Le format de l'adresse e-mail est invalide`,
      'string.pattern.base': `Le  Mot de Passe doit contenir au moins 8 caractères, une majuscule, un nombre et un caractère spécial`,
    }),
    password: Joi.string()
      .max(64)
      .presence(presence)
      .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
      .messages({
        'string.empty': `Le Mot de Passe est obligatoire`,
        'string.pattern.base': `Le  Mot de Passe doit contenir au moins 8 caractères, une majuscule, un nombre et un caractère spécial`,
      }),
    repeatPass: Joi.ref('password'),
    firstname: Joi.string().trim().min(3).max(64).presence(presence).messages({
      'string.base': `Le Prénom ne doit contenir que des lettres`,
      'string.empty': `Le Prénom est obligatoire`,
      'string.min': `Le Prénom doit contenir au minimum 3 lettres`,
      'any.required': `Le Prénom est obligatoire`,
    }),
    lastname: Joi.string().trim().min(3).max(64).presence(presence).messages({
      'string.base': `Le Nom ne doit contenir que des lettres`,
      'string.empty': `Le Nom est obligatoire`,
      'string.min': `Le Nom doit contenir au minimum 3 lettres`,
      'any.required': `Le Nom est obligatoire`,
    }),
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
    `SELECT id, mail, password, firstname, lastname, isAdmin, vote FROM user WHERE mail = ?`,
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
