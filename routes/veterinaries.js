"use strict";

const express = require ('express');
const router = express.Router ();

const veterinaryController = require('../controllers/veterinaries');

const uploadMiddleware = require('../helpers').upload;

router.route('/')
  .get(veterinaryController.getAllVeterinaries)
  .post(uploadMiddleware.single('photo'), veterinaryController.createVeterinary);
router.route ('/perfil/:id').get(veterinaryController.getOne);
module.exports = router;
