const express = require ('express');
const router = express.Router ();
const donationController = require('../controllers/donations');

//HELPERS
const uploadMiddleware = require('../helpers').upload;



router.route('/')
  .get(donationController.list)
  .post(uploadMiddleware.single('photo'), donationController.create);

router.route('/:id')
  .get(donationController.detail);


router.route('/:id/verify')
  .post(donationController.verify);

router.route('/:id/gastos')
  .get(donationController.listExpenses)
  .post(donationController.createExpense);


module.exports = router;