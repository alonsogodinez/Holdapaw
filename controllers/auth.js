'use strict';

let jwt = require ('jsonwebtoken');
const config = require ('../config');
const User = require ('../models/user');

module.exports.login = (req, res) => {

  const params = req.body;

  User.findOne ({email: params.email},{notifications: 0}).then (user => {


    if (!user) return res.status(503).send({error: 'Email not found'});
    if (!user.validPassword (params.password))
      return res.status (503).send ({error: 'Wrong password'});
    if(!user.verified)
      return res.status(503).send({error: 'Not Verified'});

    const options = {expiresIn: 86400};

    jwt.sign (user, config.jwt.secret, options, function (err, token) {
      res.cookie ('jwt', token, {signed: true});

      if (req.xhr) {
        const userData = {
          firstName: user.firstName, lastName: user.lastName
        };
        return res.status (200).send (userData);
      }
      res.redirect ('/')
    });
  }).catch (function (err) {
    console.log (err);
  });
};

module.exports.createToken = createToken;

function createToken(user, res){
  return new Promise( (resolve, reject) => {

    const options = {expiresIn: 86400};

    jwt.sign (user, config.jwt.secret, options,  (err, token) => {

      res.cookie ('jwt', token, {signed: true});

      const userData = {
        firstName: user.firstName,
        lastName: user.lastName
      };
      return res.status (200).send (userData);

    });
  })
}

module.exports.loginView = (req, res) => {

  var token = req.headers.token || req.signedCookies.jwt;

  if(!token) return res.render('login');

  jwt.verify(token, config.jwt.secret, (err, decoded) => {
    if (err) return res.render('login');
    req.decoded = decoded;
    res.redirect('/');
  });

};


module.exports.logout = (req, res) => {
  res.clearCookie ('jwt');
  if (req.xhr) return res.sendStatus (200);
  res.redirect ('/')
};

