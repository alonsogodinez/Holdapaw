"use strict";


let jwt    = require('jsonwebtoken');
const config = require('../config');



module.exports.checkLogin = (req, res, next) => {

  let token = req.headers.token || req.signedCookies.jwt;
  if(!token) return redirectOr401(req, res);

  decodeToken(token)
    .then(user => {
      req.decoded = user;
      res.locals.user = user;
      next();
    })
    .catch(err =>  redirectOr401(req,res));
};

module.exports.landing = (req, res, next) => {
  console.log('landing')
  let token = req.headers.token || req.signedCookies.jwt;
  if(!token) return res.render('landing');

  decodeToken(token)
    .then(user => {
      if(user){
        req.decoded = user;
        res.locals.user = user;
        next();
      }

    })
    .catch(err => res.render('landing'))
};

module.exports.checkAdmin = (req, res ,next) => {

  const isAdmin = res.locals.user.isAdmin;
  if (!isAdmin) return res.render ('404');
  next ();

};


function redirectOr401(req, res){
  
  const ua = req.header('user-agent');
  if(req.xhr || /mobile/i.test(ua)) return res.sendStatus(401);
  res.redirect('/#loginModal')
}


//Promisify jwt.verify

module.exports.decodeToken = decodeToken;

function decodeToken(token) {
  return new Promise ( (resolve, reject) => {

    jwt.verify(token, config.jwt.secret, (err, decoded) => {

      if (err) return reject(err);

      if (!decoded) return resolve();

      decoded = decoded._doc;

      const user = {

        _id: decoded._id,
        firstName : decoded.firstName,
        isAdmin : decoded.isAdmin,
        lastName : decoded.lastName,
        notifications: decoded.notifications,
        type: decoded.type
      };

      return resolve(user)

    });
  });
}

