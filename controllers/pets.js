"use strict";


//MODELS
const Pet = require ('../models/pet');

//CONTROLLERS
const uploaderController = require ('./uploaders');
const httpController = require ('./http');


//OTHERS
const ObjectId = require('mongodb').ObjectId;

//ROUTE FUNCTIONS
module.exports.getOne = function (req,res)  {
  const query = {_id:ObjectId(req.params.id)};
  getAllPetsFunc(query).then (pet => httpController.renderOrJSON ({
    req, res, ctx: {pet}, view: 'pet/profile'
  })).catch (err => httpController.errorOrJSON ({req, res, err}))
};

module.exports.getAllPets = (req, res) => {

  const query = req.query;

  getAllPetsFunc(query).then (pets => httpController.renderOrJSON ({
    req, res, ctx: {pets}, view: 'pet'
  })).catch (err => httpController.errorOrJSON ({req, res, err}))
};


module.exports.createPet = (req, res) => {

  const petData = req.body;
  new Promise ((resolve, reject) => {

    if (!req.file) return resolve ({file: null, thumbnail: null});

    const uploaderOptions = {
      service: 'dropbox', file: req.file
    };

    resolve (uploaderController (uploaderOptions)).catch (reject);

  })

    .then (params => {

    petData.photo = params.file;
    petData.photoThumb = params.thumbnail;

    return createPetFunc (petData)

      .then (pet => {
      pet.publisher = req.decoded._id;
      return httpController.sendOrJSON ({req, res, obj: pet});
    })
  }).catch (err => httpController.errorOrJSON ({req, res, err}));

};

//CONTROLLER FUNCTIONS
function createPetFunc (petData) {

  return new Promise ((resolve, reject) => {

    petData.photo = petData.photo || "/images/profile_pet_default.jpg";
    petData.photoThumb = petData.photoThumb || "/images/profile_pet_default.jpg";

    let pet = new Pet ({

      name: petData.name,
      type: petData.type,
      gender: petData.gender,
      birthday: petData.birthday,
      size: petData.size,
      owner: petData.owner,
      photo: petData.photo,
      photoThumb: petData.photoThumb
    });

    return pet.save ().then (resolve).catch (reject);
  })
}


function getAllPetsFunc (query) {
  return  new Promise((resolve, reject) =>
    Pet.find (query).populate('publisher').populate('clinicalAppointmets.attendedBy').exec ().then(resolve).catch(reject)
  );
}

module.exports.getAllPetsFunc = getAllPetsFunc;


