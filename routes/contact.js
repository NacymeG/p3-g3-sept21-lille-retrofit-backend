const contactRouter = require('express').Router();
const emailer = require('../models/mailer');

contactRouter.post('/', (req, res) => {
  const {
    firstname,
    lastname,
    email,
    phoneNumber,
    businessName,
    companyName,
    subject,
    message,
  } = req.body;

  emailer.sendMail(
    {
      from: `wild.retrofit@gmail.com`,
      to: 'wild.retrofit@gmail.com',
      subject: `${subject}`,
      text: '',
      html: `
      <h3>Détails du contact</h3>
      <p>Prénom: ${firstname}</p>
      <p>Nom: ${lastname}</p>
      <p>Email: ${email}</p>
      <p>Téléphone: ${phoneNumber}</p>
      <p>Raison Sociale: ${businessName}</p>
      <p>Entreprise: ${companyName}</p>
      <h3>Message:</h3>
      <p>${message}</p>
      `,
    },
    (err, info) => {
      if (err) console.error(err);
      else console.log(info);
    }
  );

  res.status(201).send('Mail envoyé !');
});

module.exports = contactRouter;
