"use strict";

const multer = require ('multer');

const storage = multer.diskStorage ({

  'destination': (req, file, cb) => cb (null, '/tmp/'),

  'filename': (req, file, cb) => {
    const extension = file.originalname.split ('.')[1];
    cb (null, file.fieldname + '-' + Date.now () + '.' + extension);
  }
});


module.exports.upload = multer ({storage});

module.exports.randomString =  (length, chars, cb) => {

  let mask = '';
  if (chars.indexOf ('a') > -1) mask += 'abcdefghijkmnopqrstuvwxyz';
  if (chars.indexOf ('A') > -1) mask += 'ABCDEFGHJKLMNOPQRSTUVWXYZ';
  if (chars.indexOf ('#') > -1) mask += '0123456789';
  if (chars.indexOf ('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
  let result = '';
  for (let i = length; i > 0; --i)
    result += mask[Math.round (Math.random () * (mask.length - 1))];
  cb (result);
};







