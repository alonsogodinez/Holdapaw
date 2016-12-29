const mongoose = require ('mongoose');
const policeReport = require ('./policeReport');
const donation = require ('./donation');
const notification = require ('./notification').schema;

const bcrypt = require ('bcrypt-nodejs');

const userSchema = mongoose.Schema ({

  adoptions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Pet'}],
  birthday: Date,
  cellphone: {type: String, required: true},
  country: String,
  dni: {type: String, maxlength: 8, minlength: 8,index: { unique: true }},
  donations: [donation],
  email: {type: String, required: true, index: { unique: true }},
  fbId: String,
  firstName: {type: String, required: true},
  godsons: [{type: mongoose.Schema.Types.ObjectId, ref: 'Pet'}],
  isAdmin: Boolean,
  lastName: {type: String},
  notifications: [notification],
  password: String,
  place: String,
  photo: String,
  photoThumb: String,
  policeReports: [policeReport],
  type: {type: String, required: true},
  verifyCode: String,
  verified: {type: Boolean, default: false}
});


userSchema.methods.generateHash =  function(password){
  return bcrypt.hashSync (password, bcrypt.genSaltSync (8), null);
};


userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync (password, this.password);
};

userSchema.methods.validVerifyCode = function(verifyCode){

  return bcrypt.compareSync (this.email, verifyCode);
};


module.exports = mongoose.model ('User', userSchema);