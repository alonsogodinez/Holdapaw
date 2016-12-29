"use strict";

const nodemailer = require('nodemailer');
const bcrypt = require ('bcrypt-nodejs');
const config = require('../config');
const transporter = nodemailer.createTransport(config.emailTransporter.gmail);
const User = require('../models/user');


/*
* IN-APP CONTROLLERS
*
* */

module.exports.sendVerificationMail = (user, cb) =>

  new Promise( (resolve, reject) => {

    const code = bcrypt.hashSync (user.email, bcrypt.genSaltSync (6), null);
    user.verifyCode = code;
    const url =  process.env.URL || 'http://localhost:7000';
    const mailOptions = {
      from: '"Hold A Paw 👥"',
      to: user.email,
      subject: `Hola, ${user.firstName} ${user.lastName} Verifica tu correo porfavor`,
      text: `Para verificar tu correo por favor entra al siguiente enlace:  ${url}/email/verify?code=${code}`
      //text: '<b>Hello world 🐴</b>' // html body
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if(err) return reject(err);
      return resolve(user.save());
    });

  });

/*
* ROUTES CONTROLLERS
*
* */

module.exports.verifyAccount = (req, res) => {

  const verifyCode = req.query.code;
  User.findOne({verifyCode})
    .then(user => {
      if(!user || !user.validVerifyCode(verifyCode)) throw new Error('Invalid Code');
      if(user.verified) throw new Error('Already verified');

      user.verified = true;
      return user.save()
    })
    .then(user => res.redirect('/'))
    .catch(err => {
      if(err.message == 'Already verified') return res.redirect('/');
      res.sendStatus(404)
    });

};