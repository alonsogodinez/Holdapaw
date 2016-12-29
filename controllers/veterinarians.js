"use strict";

//MODELS
const Veterinarian = require ('../models/veterinarian');
const httpController = require('./http');

//ROUTE FUNCTIONS
module.exports.getOne = (req,res) => {
  const query = {_id:req.params.id};
  Veterinarian.find(query).populate('userId').populate('veterinary').exec ().then (veterinarians => httpController.renderOrJSON ({
    req: req, res: res, ctx: {veterinarians}, view: 'veterinarian/profile'
  })).catch (err => httpController.errorOrJSON ({req: req, res: res, err: err}))
};

module.exports.getAllVeterinarians = (req, res) => {

  const query = req.query;

  getAllVeterinariansFunc(query)
    .then (users => httpController.renderOrJSON ({req, res, ctx: {users}, view: 'veterinarian'}))
    .catch (err => httpController.errorOrJSON ({req: req, res: res, err: err}))
};


//CONTROLLER FUNCTIONS

module.exports.createVeterinarian = veterinarianData => {

  return new Promise ((resolve, reject) => {
    console.log(veterinarianData);
    const veterinarian = new Veterinarian ({
      userId: veterinarianData.userId,
      cmvp: veterinarianData.cmvp,
      speciality: veterinarianData.speciality,
      veterinary: veterinarianData.veterinary
    });

    return veterinarian.save ()
      .then (resolve)
      .catch (reject)
  })

};

function getAllVeterinariansFunc(query){
  return new Promise((resolve, reject) =>
      Veterinarian.find (query).populate('userId').exec ().then (resolve).catch (reject)
  );
}


module.exports.getAllVeterinariansFunc = getAllVeterinariansFunc;



