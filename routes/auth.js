const authRouter = require('express').Router();
const Auth = require('../models/auth');

const errorMessage = {
  mail: 'Email already exist',
};

authRouter.post('/signup', async (req, res) => {
  const validationErrors = await Auth.validate(req.body);
  if (validationErrors) {
    res.status(409).send(validationErrors.details[0].message);
    throw new Error('Validation ERROR');
  }

  const { firstname, lastname, mail, password } = req.body;
  const isMail = await Auth.credidentialCheck({ mail });
  if (isMail) res.status(409).send(errorMessage.mail);

  const hashPwd = await Auth.hashPassword(password);
  await Auth.createUser({ firstname, lastname, hashPwd, mail });
  res.status(201).send('Signup success');
});

module.exports = authRouter;
