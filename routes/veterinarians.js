"use strict";

const express = require('express');
const router = express.Router();

//CONTROLLERS
const veterinarianController = require('../controllers/veterinarians');

router.route('/')
  .get(veterinarianController.getAllVeterinarians);

router.route ('/perfil/:id').get(veterinarianController.getOne);


module.exports = router;