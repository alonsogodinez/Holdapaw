"use strict";

//MODELS
const User = require ('../models/user');

//CONTROLLERS
const uploaderController = require ('./uploaders');
const veterinarianController = require ('./veterinarians');
const associationController = require ('./associations');
const veterinaryController = require ('./veterinaries');
const emailController = require ('./mails');
const authController = require ('./auth');
const httpController = require ('./http');
const decodeToken = require ('./middlewares').decodeToken;




module.exports.deleteOne = (req, res) => {
  User.remove({email: req.params.email}).exec()
    .then(res.send())
    .catch(res.sendStatus(503))
};

//ROUTE FUNCTIONS

module.exports.getOne = (req,res) => {
  const query = {_id:req.params.id};
  User.find (query).populate('godsons').exec ().then (users => httpController.renderOrJSON ({
    req: req, res: res, ctx: {users: users}, view: 'user/profile'
  })).catch (err => httpController.errorOrJSON ({req: req, res: res, err: err}))
};


module.exports.getAllUsers = (req, res) => {

  const query = req.query;
  User.find (query, {password: 0}).exec ().then (users => httpController.renderOrJSON ({
    req: req, res: res, ctx: {users: users}, view: 'user'
  })).catch (err => httpController.errorOrJSON ({req: req, res: res, err: err}))
};


module.exports.createUser = (req, res) => {

  const userData = req.body;


  //TODO move this if to new Resource URL(POST)

  let token = req.headers.token || req.signedCookies.jwt;


  //FIX ME: Has to be a middleware
  function authorized (token) {

    return new Promise ((resolve, reject) => {

      //TODO remove this  to a middleware globally
      const needAdmin = !!(userData.type === 'veterinarian' || userData.type === 'association');
      if (token && needAdmin) {

        return decodeToken (token).then (user => {
          res.locals.user = user;
          if (!user.isAdmin) return reject (new Error ('Unauthorized')); //quiere registrar vet o
          // assoc y no tiene//
          // admin
          return resolve (user);
        })
      } else {
        resolve ();
      }
    })
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////


  authorized (token)

    .then (() => {
    if (!req.file) return {file: null, thumbnail: null};

    const uploaderOptions = {
      service: 'dropbox', file: req.file
    };

    return uploaderController (uploaderOptions)
  })

    .then (params => {

    userData.photo = params.file;
    userData.photoThumb = params.thumbnail;
    return createUser (userData)
  })

    .then (user => {

    if (userData.type === 'activist') {

      return emailController.sendVerificationMail (user)
    }


    userData.userId = user._id;
    userData.user = user;

    if (userData.type === 'veterinarian')
      return veterinarianController.createVeterinarian (userData).then (veterinarian => {
          return veterinaryController.addVeterinarian (veterinarian)
        }).catch (err => rollbackUser ({
        req, res, user, err
      }));

    if (userData.type === 'association')

      return associationController.createAssociation (userData).catch (err => rollbackUser ({
        req, res, user, err
      }));
  }).then (user => {
    //if (userData.type === 'activist') return authController.createToken (user, res); //to auto
    // login afer register
    return httpController.sendOrJSON ({req, res, obj: null});

  })

    .catch (err => {
    if (err.message === 'Unauthorized') return res.sendStatus (401);//FIX ME: make a middleware
    httpController.errorOrJSON ({req, res, err})
  });
};

//CONTROLLER FUNCTIONS
function createUser (userData) {

  return new Promise ((resolve, reject) => {

    userData.photo = userData.photo || "/images/profile_default.jpg";
    userData.photoThumb = userData.photoThumb || "/images/profile_default.jpg";

    let user = new User ({

      dni: userData.dni,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      type: userData.type,
      cellphone: userData.cellphone,
      birthday: userData.birthday,
      photo: userData.photo,
      photoThumb: userData.photoThumb
    });

    user.password = user.generateHash (userData.password);
    return user.save ().then (resolve).catch (reject);

  })
}


function rollbackUser (parameters) {

  const req = parameters.req;
  const res = parameters.res;
  const user = parameters.user;
  const err = parameters.err;

  const promise = () => httpController.errorOrJSON ({req: req, res: res, err: err});

  user.remove ().then (promise).catch (promise)
}



