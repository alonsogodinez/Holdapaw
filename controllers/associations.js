"use strict";


const Association = require ('../models/association');
const httpController = require ('./http');

module.exports.getOne = (req,res) => {
  const query = {_id:ObjectId(req.params.id)};
  console.log(query);
  getAllAssociationsFunc(query).then (association => httpController.renderOrJSON ({
    req, res, ctx: {association}, view: 'association/profile'
  })).catch (err => httpController.errorOrJSON ({req, res, err}))
};

/*
module.exports.registerEvent = function(req,res)
{
  var eventData =  {
    name: req.body.name,
    from: req.body.from,
    to: req.body.to,
    place: req.body.place,
    description: req.body.description,
    photo: req.body.obervations,
    photoThumb: req.body.obervations
  };
  Association.update({ _id: req.body.association},{$push: { clinicalAppointments :  eventData }}, (err) => {

        if(!err) return res.sendStatus(200);
        return res.sendStatus(500);
      }
  );
};

*/

module.exports.getAllAssociations = (req, res) => {

  const query = req.query;
  getAllAssociationsFunc (query).then (associations => httpController.renderOrJSON ({
    req, res, view: 'association', ctx: {associations}
  })).catch (err => httpController.errorOrJSON ({req, res, err}));
};


module.exports.createAssociation = associationData => {
  return new Promise ((resolve, reject) => {
    console.log('registeandp asociacon');
    const association = new Association ({
      address: associationData.address,
      facebook: associationData.facebook,
      userId: associationData.userId,
      bankAccount: associationData.bankAccount
    });

    return association.save ().then (resolve).catch (reject)
  })
};


function getAllAssociationsFunc (query) {
  return new Promise ( (resolve, reject) =>{
    Association.find (query).populate('userId').exec ().then (resolve).catch (reject)}
  );
}

module.exports.getAllAssociationsFunc = getAllAssociationsFunc;
