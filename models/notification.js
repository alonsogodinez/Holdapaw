
const mongoose = require('mongoose');


const notificationSchema = mongoose.Schema({

  date: { type: Date, default : new Date() },
  type: String,
  message: String,
  sender: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  petId: String
});


module.exports.model = mongoose.model('Notification', notificationSchema);
module.exports.schema = notificationSchema;
