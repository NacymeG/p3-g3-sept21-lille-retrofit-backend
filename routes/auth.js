const authRouter = require('express').Router();
const Auth = require('../models/auth');

authRouter.post('/signup', async (req, res) => {
  const { firstname, lastname, mail, password } = req.body;  
  const hashPwd = await Auth.hashPassword(password)
    await Auth.createUser({ firstname, lastname, hashPwd, mail})
    res.status(201).send('Signup success');
});

module.exports = authRouter;