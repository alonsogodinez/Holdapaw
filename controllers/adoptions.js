"use strict";

const Pet = require ('../models/pet');
const httpController = require ('./http');
const uploaderController = require ('./uploaders');
const User = require ('../models/user');
const Notification = require ('../models/notification').model;


module.exports.indexView = (req, res) => {

  res.render ('adoption', {title: 'Hold a Paw'});
};

module.exports.postAdoption = (req, res) => {

  const petData = req.body;

  new Promise ((resolve, reject) => {

    if (!req.file) return resolve ({file: null, thumbnail: null});

    const uploaderOptions = {
      service: 'dropbox', file: req.file
    };

    resolve (uploaderController (uploaderOptions)).catch (reject);

  }).then ( params => {


    petData.photo = params.file;
    petData.photoThumb = params.thumbnail;
    petData.adopted = false;
    petData.publisher = req.decoded._id || req.locals.user._id;


    return createPet (petData);
  })

    .then (pet => {
      //io.emit('new adoption'); //CHECK if broadcast nesessary or go with emit
      return httpController.sendOrJSON ({req, res, obj: pet})
    })
    .catch (err => httpController.errorOrJSON ({req, res, err}))

};

module.exports.requestAdoption = (req, res) => {

  let pet; //bind scope of pet

  Pet.findOne ({_id: req.params.id}).exec ().then (_pet => {
    pet = _pet;
    return User.findById (_pet.publisher).exec ()
  }).then (user => {

    let notification = new Notification ();
    notification.type = 'adoptionRequest';
    console.log(req.decoded);
    console.log(res.locals);
    notification.message = `${req.decoded.firstName} ${req.decoded.lastName} desea a adoptar a ${pet.name}`;
    notification.sender = require ('mongoose').Types.ObjectId (req.decoded._id);
    notification.petId = pet._id;

    user.notifications.push (notification);
    //io.to(user.socket).emit('request adoption');
    //TODO send a push notification and emit socket
    return user.save ()
  }).then (user => {
    pet.pendingRequests.push (res.locals.user._id);
    return pet.save ()
  }).then (pet => res.sendStatus (200)).catch (err => {
    console.log (err);
    res.sendStatus (503)
  });

};


module.exports.confirmAdoption = (req, res) => {

  let pet_id = req.params.id;
  let owner_id = req.body.owner_id;
  Pet.findOne ({_id: pet_id}).exec ().then (pet => {
    pet.owner = owner_id;
    pet.adopted = true;
    pet.adoptionDate = new Date ();
    return pet.save ()
  }).then (pet => {
    return User.findOne ({_id: owner_id}).exec ()
  }).then (user => {
    user.adoptions.push = pet_id;
    return user.save ()
  }).then (user => removeRequest (pet_id, owner_id)).then (user => res.sendStatus (200)).catch (err => httpController.errorOrJSON ({
    err, req, res

  }))
};


module.exports.cancelRequest = (req, res) => {
  let pet_id = req.params.id;
  let sender = res.locals.user._id;
  removeRequest (pet_id, sender).then (user => {
    res.sendStatus (200);
  }).catch (err => {
    console.log (err);
    res.sendStatus (503)
  })
};


module.exports.declineRequest = (req, res) => {
  let pet_id = req.params.id;
  let sender = req.body.sender[0];
  removeRequest (pet_id, sender).then (user => User.findById (sender).exec ()).then (user => {

    let notification = new Notification ();
    notification.type = 'adoptionDecline';
    notification.message = `Gracias por el interes, pero ya encontramos a alguien`;
    notification.sender = require ('mongoose').Types.ObjectId (req.decoded._id);
    notification.petId = pet_id;

    user.notifications.push (notification);
    //TODO send a push notification and emit socket
    return user.save ()
  }).then (user => res.sendStatus (200)).catch (err => {
    console.log (err);
    res.sendStatus (503)
  });

};


function createPet (petData) {

  return new Promise ((resolve, reject) => {
    let pet = new Pet (petData);

    pet.save (err => {
      if (err) return reject (err);
      return resolve (pet);
    });
  })
}


function removeRequest (pet_id, sender) {
  return new Promise ((resolve, reject) => {

    Pet.findOne ({_id: pet_id}).exec ().then (pet => {
      pet.pendingRequests.splice (pet.pendingRequests.indexOf (sender), 1);
      return pet.save ()
    }).then (pet => {
      User.update ({_id: pet.publisher}, {
        $pull: {
          'notifications': {
            sender, type: 'adoptionRequest', petId: pet._id
          }
        }
      }).exec ();
      // que este referenciada a el usuario
    }).then (resolve).catch (reject)

  })
}
