"use strict";


const petController = require('./pets');
const veterinarianController = require('./veterinarians');
const associationController = require('./associations');
const veterinariesController = require('./veterinaries');


module.exports.indexView = (req, res) => {

  const ctx = {};

  petController.getAllPetsFunc({adopted: false, publisher: { $ne: res.locals.user._id } })
    .then(pets => {
      ctx.petsToAdopt = pets;
      return  petController.getAllPetsFunc({adopted: true})
    })
    .then(pets => {
      ctx.petsAdopted = pets;
      return veterinarianController.getAllVeterinariansFunc()
    })
    .then(veterinarians => {
      ctx.veterinarians = veterinarians;
      return associationController.getAllAssociationsFunc()
    })
    .then(association => {
      ctx.associations = association;
      return veterinariesController.getAllVeterinariesFunc()
    })
    .then(veterinaries => {

      ctx.veterinaries = veterinaries;
      res.render('index', ctx)
    })
    .catch(err => res.sendStatus(503));


};


