const express = require ('express');
const router = express.Router ();
const emailController = require('../controllers/mails');

router.route('/verify')
  .get(emailController.verifyAccount);
//  .post();

module.exports = router;