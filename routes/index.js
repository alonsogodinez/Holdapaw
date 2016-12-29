"use strict";

const express = require('express');
const router = express.Router();

const indexController = require('../controllers');
const users = require('./users');
const emailValidator = require('./emailValidator');
const mail = require('./mails');
const veterinarians = require('./veterinarians');
const associations = require('./associations');
const veterinaries = require('./veterinaries');
const adoptions = require('./adoptions');
const donations = require('./donations');
const notifications = require('./notifications');
const auth = require('./auth');
const pets = require('./pets');
const events = require('./events');
const clinicalAppointment = require('./clinicalAppointment');
const checkLogin = require('../controllers/middlewares').checkLogin;
const landing = require('../controllers/middlewares').landing;

router.use('/', auth);
router.get('/', landing, indexController.indexView);

router.use('/usuarios', users);
router.use('/veterinarios',checkLogin, veterinarians);
router.use('/asociaciones',checkLogin, associations);
router.use('/clinicas',checkLogin, veterinaries);
router.use('/emailValidator', emailValidator);
router.use('/email',mail);
router.use('/adopciones',checkLogin, adoptions);
router.use('/mascotas',checkLogin, pets);
router.use('/notificaciones',checkLogin, notifications);
router.use('/atenciones',checkLogin, clinicalAppointment);
router.use('/donaciones',checkLogin, donations);
router.use('/eventos',checkLogin,events);
module.exports = router;
