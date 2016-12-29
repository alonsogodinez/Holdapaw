const mongoose = require('mongoose');
const event = require('./event');

const associationSchema = mongoose.Schema({

  address: String,
  facebook: String,
  bankAccount: String,
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  events : [event]
});


module.exports = mongoose.model('Association', associationSchema);
