"use strict";

const express = require ('express');
const router = express.Router ();
const pets = require('../controllers/pets');

//HELPERS
const uploadMiddleware = require('../helpers').upload;


router.route ('/perfil/:id').get(pets.getOne);
router.route ('/listar').get (pets.getAllPets);
router.route ('/registrar').post (uploadMiddleware.single('photo'),pets.createPet);

module.exports = router;


