
const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');

router.route('/login')
    .get(auth.loginView)
    .post(auth.login);

router.route('/logout')
    .get(auth.logout)
    .post(auth.logout);

module.exports = router;
