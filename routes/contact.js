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
      from: `contact@everetrofit.com`,
      to: 'contact@everetrofit.com',
      subject: `${subject}`,
      text: '',
      attachments: [
        {
          filename: 'Logo.png',
          path: `${__dirname}/assets/Logo.png`,
          cid: 'logo',
        },
      ],
      html: `
      <div
      style="
        background-color: rgb(1, 30, 38);
        width: 75vw;
        height: 25vh;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      "
    >
    <img src="cid:logo" style="width:70%; margin: auto;">

    </div>
    <div
      style="
        margin-top: 2vh;
        background-color: rgb(0, 230, 200);
        -webkit-border-top-left-radius: 8px;
        -webkit-border-top-right-radius: 8px;
        -moz-border-radius-topleft: 8px;
        -moz-border-radius-topright: 8px;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        width: 75vw;
        height: 50px;
        display: flex;
        align-items: center;
        border: rgb(0, 230, 200) 2px solid;
      "
    >
      <h3
        style="
          padding-left: 10px;
          color: rgb(1, 30, 38);
          font-family: 'system-ui';
          font-size: 18px;
          letter-spacing: 2px;
          font-weight: bold;
        "
      >
        Détails du contact
      </h3>
    </div>
    <div
      style="
        margin-top: -4px;
        background-color: rgb(1, 30, 38);
        width: 75vw;
        height: 220px;
        color: white;
        border: rgb(0, 230, 200) 2px solid;
        text-align: justify;
      "
    >
      <p style="padding-left: 10px; font-family: 'system-ui'">
        <span style="font-weight: bold">Prénom:</span>
        ${firstname}
      </p>
      <p style="padding-left: 10px; font-family: 'system-ui'">
        <span style="font-weight: bold">Nom:</span>${lastname}
      </p>
      <p style="padding-left: 10px; font-family: 'system-ui'">
        <span style="font-weight: bold">Email:</span> ${email}
      </p>
      <p style="padding-left: 10px; font-family: 'system-ui'">
        <span style="font-weight: bold">Téléphone:</span> ${phoneNumber}
      </p>
      <p style="padding-left: 10px; font-family: 'system-ui'">
        <span style="font-weight: bold">Raison Sociale:</span> ${businessName}
      </p>
      <p style="padding-left: 10px; font-family: 'system-ui'">
        <span style="font-weight: bold">Entreprise:</span> ${companyName}
      </p>
    </div>
    <div
      style="
        margin-top: 15px;
        background-color: rgb(0, 230, 200);
        -webkit-border-top-left-radius: 8px;
        -webkit-border-top-right-radius: 8px;
        -moz-border-radius-topleft: 8px;
        -moz-border-radius-topright: 8px;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        width: 75vw;
        height: 50px;
        display: flex;
        align-items: center;
        border: rgb(0, 230, 200) 2px solid;
      "
    >
      <h3
        style="
          padding-left: 10px;
          color: rgb(1, 30, 38);
          font-family: 'system-ui';
          font-size: 18px;
          letter-spacing: 2px;
          font-weight: bold;
        "
      >
        Message
      </h3>
    </div>
    <div
      style="
        margin-top: -4px;
        background-color: rgb(1, 30, 38);
        width: 75vw;
        height: 300px;
        color: white;
        border: rgb(0, 230, 200) 2px solid;
      "
    >
      <p
        style="padding-left: 10px; font-family: 'system-ui'; line-height: 15px"
      >
        ${message}
      </p>
    </div>      `,
    },
    (err) => {
      if (err) console.error(err);
    }
  );

  res.status(201).send('Mail envoyé !');
});

module.exports = contactRouter;
