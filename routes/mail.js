const infoMailRouter = require('express').Router();
const emailer = require('../models/mailer');

infoMailRouter.post('/', (req, res) => {
  const { email } = req.body;

  emailer.sendMail(
    {
      from: `wild.retrofit@gmail.com`,
      to: 'wild.retrofit@gmail.com',
      subject: `Demande d'informations : Venez tester nos modèles`,
      text: '',
      html: `
      <h3>Venez tester nos modèles</h3>
      <p>Email: ${email}</p>
      `,
    },
    (err) => {
      if (err) console.error(err);
    }
  );

  res.status(201).send('Mail envoyé !');
});

module.exports = infoMailRouter;
