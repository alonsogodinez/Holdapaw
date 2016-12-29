"use strict";

const express = require('express');
const router = express.Router();

//CONTROLLERS
const associationController = require('../controllers/associations');

router.route('/')
  .get(associationController.getAllAssociations);
router.route ('/perfil/:id').get(associationController.getOne);


module.exports = router;