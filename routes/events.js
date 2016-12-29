const express = require ('express');
const router = express.Router ();
const events = require('../controllers/events');
const uploadMiddleware = require('../helpers').upload;

router.route ('/registrar').post (uploadMiddleware.single('photo'),events.registerEvent);
router.route ('/editar/:id_event').post (uploadMiddleware.single('photo'),events.editEvent);
router.route ('/listar/:id_association/:id_event').get (events.getInfo);
module.exports = router;
