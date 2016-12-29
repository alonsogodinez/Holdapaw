const mongoose = require('mongoose');

const veterinarianSchema = mongoose.Schema({

  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  cmvp: String,
  speciality: String,
  veterinary: {type: mongoose.Schema.Types.ObjectId, ref: 'Veterinary'} 
});


module.exports = mongoose.model('Veterinarian', veterinarianSchema);