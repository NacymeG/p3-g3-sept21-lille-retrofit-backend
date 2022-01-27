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
      'Inscription réussie, vous allez recevoir un mail pour valider votre compte'
    );
});
authRouter.post('/login', async (req, res) => {
  const { mail, password, token } = req.body;
  try {
    if (token) {
      const decodedJwt = await Auth.decode(req.body.token);
      const user = await Auth.verifyEmail(decodedJwt.email);
      delete user.password;
      res.send(user).status(202);
    }
    const validationErrors = await Auth.loginValidation(req.body);
    if (validationErrors) {
      res.status(409).send(validationErrors.details[0].message);
      throw new Error('Validation ERROR');
    }
    const user = await Auth.verifyEmail(mail);
    if (!user) res.status(404).send(`Identifiant ou mot de passe incorrect`);
    const checkPwd = await Auth.verifyPassword(password, user.password);
    if (checkPwd && user) {
      delete user.password;
      const jwt = await Auth.calculateToken(mail, user.id);
      res.status(202).send({
        welcome: `Hi ${user.firstname} ${user.lastname} !`,
        token: jwt,
        user,
      });
    }
  } catch (error) {
    res.status(error.status).send();
  }
});
authRouter.post('/admin', async (req, res) => {
  const { mail, password } = req.body;
  try {
    const user = await Auth.verifyEmail(mail);
    if (!user || !user.isAdmin)
      res.status(404).send(`Identifiant ou mot de passe incorrect`);
    const checkPwd = await Auth.verifyPassword(password, user.password);
    if (checkPwd && user) {
      delete user.password;
      const jwt = await Auth.calculateToken(mail, user.id);
      res.status(202).send({
        welcome: `Hi ${user.firstname} ${user.lastname} !`,
        token: jwt,
        user,
      });
    }
  } catch (error) {
    res.status(error.status).send(401);
  }
});
authRouter.get('/admin', async (req, res) => {
  res.status(202).send({
    welcome: `La route GET !`,
  });
});
module.exports = authRouter;
