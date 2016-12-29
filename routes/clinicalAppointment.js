const express = require ('express');
const router = express.Router ();
const clinicalAppointments = require('../controllers/clinicalAppointments');

router.route ('/registrar').post (clinicalAppointments.registerClinicalAppointment);

module.exports = router;