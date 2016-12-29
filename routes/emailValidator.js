const express = require ('express');
const router = express.Router ();


const emailValidatorController = require('../controllers/emailValidator');


router.route ('/exists').post (emailValidatorController.emailExists);

router.route ('/isreal').post (emailValidatorController.emailIsReal);


module.exports = router;


