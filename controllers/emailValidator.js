var User  = require('../models/user');
const emailExistence = require ('email-existence');

module.exports.emailExists = (req ,res) => {
    User.findOne({email: req.body.email})
        .then(function (user) {
            if (!user) return res.sendStatus(200);
            res.sendStatus(503);
        })
        .catch(function (err) {
            res.status(500).send(err);
        })
};


module.exports.emailIsReal = (req, res) => {
    emailExistence.check(req.body.email, (err, exists) => {
        if (!exists) return res.sendStatus(503);
        res.sendStatus(200);
    });
};