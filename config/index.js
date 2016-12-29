"use strict";


const jwtConfig = {
  secret: 'jwtsecret#!#!#!#!#!#!#!'
}

const emailConfig = {
  gmail: 'smtps://mailaccount@gmail.com:mypassword@smtp.gmail.com'
}

const dropboxConfig = {
  key: 'drobbox-key',
  secret: 'dropbox-secret',
  token: 'dropbox-token'
}


const config = {

  development: {

    db: {
      url: 'mongodb://localhost:27017/holdapaw'
    },

    jwt: jwtConfig,
    dropbox: dropboxConfig,
    emailTransporter: emailConfig
  },

  production: {

    db: {
      url: process.env.mongodb
    },

    jwt: jwtConfig,
    dropbox: dropboxConfig,
    emailTransporter: emailConfig
  }
};

const env = process.env.NODE_ENV || 'development';

module.exports = config[env];