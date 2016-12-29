const mongoose = require ('mongoose');
const clinicalAppointment = require ('./clinicalAppointment');


const petSchema = mongoose.Schema ({

  name: String,
  type: String,
  gender: {type: String, required: true},
  birthday: {type: Date, required: true},
  size: {type: String, required: true},
  publisher: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}, 
  photo: String,
  photoThumb:String,
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  clinicalAppointments: [clinicalAppointment],
  godparents: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  adoptionDate: Date,
  adopted: Boolean,
  description: String,
  pendingRequests: Array

});


module.exports = mongoose.model ('Pet', petSchema);