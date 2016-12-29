const express = require ('express');
const router = express.Router ();
const notificationController = require('../controllers/notifications');

router.route('/')
  .get(notificationController.indexView);
//  .post();

module.exports = router;