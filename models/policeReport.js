const mongoose = require('mongoose');

const policeReportSchema = mongoose.Schema({
  subject: String,
  description: String,
  date: Date,
  photo: String
});

module.exports = mongoose.model('PoliceReport', policeReportSchema);