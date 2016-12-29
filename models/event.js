
const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({

  name: String,
  from: {type:Date},
  to: {type:Date},
  place: String,
  description: String,
  photo: String,
  photoThumb: String
});


module.exports = eventSchema;