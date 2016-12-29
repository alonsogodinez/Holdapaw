"use strict";


const Veterinary = require ('../models/veterinary');
const httpController = require ('./http');
const uploaderController = require ('./uploaders');


module.exports.getOne = (req,res) => {
  const query = {_id:req.params.id};
  Veterinary.find (query).populate('veterinarians.userId').exec ().then (veterinaries => httpController.renderOrJSON ({
    req: req, res: res, ctx: {veterinaries}, view: 'veterinary/profile'
  })).catch (err => httpController.errorOrJSON ({req: req, res: res, err: err}))
};


module.exports.getAllVeterinaries = (req, res) => {

  const query = req.query;
  getAllVeterinariesFunc(query)
    .then (veterinaries => httpController.renderOrJSON ({req, res, ctx: {veterinaries}, view: 'veterinary'}))
    .catch (err => httpController.errorOrJSON ({req: req, res: res, err: err}));

  Veterinary.find ().then (veterinaries =>
    httpController.renderOrJSON ({
      req, res, view: 'veterinary', ctx: {veterinaries}
    })).catch (err => httpController.errorOrJSON ({req, res, err}))
};



module.exports.addVeterinarian = veterinarian => {

  return new Promise( (resolve, reject) => {

    Veterinary.findOne({_id: veterinarian.veterinary}).exec()

      .then(veterinary => {
        veterinary.veterinarians.push(veterinarian);
        return veterinary.save()
      })
      .then(resolve)
      .catch(reject);
  })
};

module.exports.createVeterinary = (req, res) => {

  const veterinaryData = req.body;

  new Promise ((resolve, reject) => {

    if (!req.file) return resolve ({file: null, thumbnail: null});

    const uploaderOptions = {
      service: 'dropbox', file: req.file
    };

    resolve (uploaderController (uploaderOptions)).catch (reject);

  }).then ( params => {

    veterinaryData.photo = params.file;
    veterinaryData.photoThumb = params.thumbnail;

    let veterinary = new Veterinary ({

      RUC: veterinaryData.ruc,
      bussinessName: veterinaryData.bussinessName,
      address: veterinaryData.address,
      cellphone: veterinaryData.cellphone,
      email: veterinaryData.email,
      photo: veterinaryData.photo,
      photoThumb: veterinaryData.photoThumb
    });

    return veterinary.save ()
  })
    .then (veterinary => httpController.sendOrJSON ({req, res, obj: veterinary}))
    .catch (err => httpController.errorOrJSON ({req, res, err}))


};

function getAllVeterinariesFunc (query) {
  return  new Promise((resolve, reject) =>
      Veterinary.find (query).populate('userId').exec ().then(resolve).catch(reject)
  );
}

module.exports.getAllVeterinariesFunc = getAllVeterinariesFunc;