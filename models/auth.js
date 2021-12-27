const connection = require('../db-config');
const db = connection.promise();
const argon2 = require('argon2');
const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

//=================== Sign up =========================
const createUser = ({ firstname, lastname, hashPwd, mail}) => {
  return db.query(`INSERT INTO user (firstname, lastname, password, mail) VALUES (?,?,?,?)`,
    [firstname, lastname, hashPwd, mail])
};


const hashPassword = (plainPassword) => {
  return argon2.hash(plainPassword, hashingOptions);
};
//=====================================================
//=================== Log in ==========================

const verifyPassword = (plainPassword, hashedPassword) => {
  return argon2.verify(hashedPassword, plainPassword, hashingOptions);
};

//=====================================================

module.exports = {
  createUser,verifyPassword,hashPassword,
};