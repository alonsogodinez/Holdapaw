
const mongoose = require('mongoose');


const clinicalAppointmentSchema = mongoose.Schema({
  date: Date,
  attendedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'Veterinarian'},
  observations : String,
  diagnosis: String,
  recommendations: String,
  health : String,
  medicaments : String,
  indications : String
});


module.exports = clinicalAppointmentSchema;
