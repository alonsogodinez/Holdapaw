const User = require('../models/user');


module.exports.indexView = (req, res) =>{

  User.findById(res.locals.user._id).exec()
  .then(user => res.locals.user = user)
  .then(user => res.render('notification'))

};