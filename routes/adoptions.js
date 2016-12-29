"use strict";

const express = require ('express');
const router = express.Router ();
const adoptionController = require('../controllers/adoptions');

//HELPERS
const uploadMiddleware = require('../helpers').upload;

router.route('/')
  //.get(adoptionController.indexView)
  .post(uploadMiddleware.single('photo'), adoptionController.postAdoption);

router.route('/request/:id')
  .post(adoptionController.requestAdoption);

router.route('/cancel/:id')
  .post(adoptionController.cancelRequest);


router.route('/decline/:id')
  .post(adoptionController.declineRequest);

router.route('/confirm/:id')
  .post(adoptionController.confirmAdoption);


module.exports = router;