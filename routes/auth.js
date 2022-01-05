const authRouter = require('express').Router();
const Auth = require('../models/auth');

const errorMessage = {
  mail: 'Email already exist',
};

authRouter.post('/signup', async (req, res) => {
  const validationErrors = await Auth.signupValidation(req.body);
  if (validationErrors) {
    res.status(409).send(validationErrors.details[0].message);
    throw new Error('Validation ERROR');
  }
  const { firstname, lastname, mail, password } = req.body;
  const isMail = await Auth.credidentialCheck({ mail });
  if (isMail) res.status(409).send(errorMessage.mail);
  const hashPwd = await Auth.hashPassword(password);
  await Auth.createUser({ firstname, lastname, hashPwd, mail });
  res
    .status(201)
    .send(
      'Inscription réussi, vous allez recevoir un mail pour valider votre compte'
    );
});

authRouter.post('/login', async (req, res) => {
  const { mail, password } = req.body;
  const validationErrors = await Auth.loginValidation(req.body);
  if (validationErrors) {
    res.status(409).send(validationErrors.details[0].message);
    throw new Error('Validation ERROR');
  }
  const user = await Auth.verifyEmail(mail);
  console.log(user);
  if (!user)
    res.status(404).send(`Identifiant ou mot de passe incorrect
  `);
  const checkPwd = await Auth.verifyPassword(password, user.password);
  if (checkPwd && user) {
    const jwt = await Auth.calculateToken(mail, user.id);
    res
      .status(202)
      .cookie('user_token', jwt)
      .send(`Hi ${user.firstname} ${user.lastname} !`);
    console.log('Cookies: ', req.headers.cookie.split('=')[1]);
  }
});

module.exports = authRouter;
