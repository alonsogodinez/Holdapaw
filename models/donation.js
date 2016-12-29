
const mongoose = require('mongoose');

const donationSchema = mongoose.Schema({
  by: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  //to: [{type: mongoose.Schema.Types.ObjectId, ref: 'Pet'}],//to validate , unused now
  date: Date,
  amount: Number,
  cashType: String, //cambie
  verified: {type: Boolean, default: false}, //añadido
  photo: String,
  expenses: Array //TODO SCHEMA

});


module.exports = mongoose.model('Donation', donationSchema);