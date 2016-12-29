
const mongoose = require('mongoose');
const veterinarian = mongoose.model('Veterinarian').schema;

const veterinarySchema = mongoose.Schema({
  RUC : String,
  bussinessName: String,
  address: String,
  cellphone: String,
  telephone: String,
  email: String,
  veterinarians : [veterinarian],
  photo: String

});

module.exports = mongoose.model('Veterinary', veterinarySchema);