const express = require('express');
const router = express.Router();

//CONTROLLERS
const userController = require('../controllers/users');

//HELPERS
const uploadMiddleware = require('../helpers').upload;
const checkLogin = require('../controllers/middlewares').checkLogin;

router.route('/')
  .get(checkLogin, userController.getAllUsers)
  .post(uploadMiddleware.single('photo'), userController.createUser);


router.route('/del/:email').get(userController.deleteOne);

router.route ('/perfil/:id').get(userController.getOne);
module.exports = router;