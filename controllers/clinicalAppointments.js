//Models
const Pet = require ('../models/pet');
const clinicalAppointment = require('../models/clinicalAppointment');

//Helpers
const httpController = require('./http');
mongoose = require('mongoose');
ObjectId = mongoose.Types.ObjectId;

//Controllers
function GetOne(req,res){
    const query = {_id:req.params.id} ;
    clinicalAppointment.find (query).exec ().then (users => httpController.renderOrJSON ({
        req: req, res: res, ctx: {users: users}, view: 'clinicalAppointment/profile'
    })).catch (err => httpController.errorOrJSON ({req: req, res: res, err: err}))
}


module.exports.registerClinicalAppointment = function(req,res)
{
    var clinicalData =  {
        observations: req.body.obervations,
        diagnosis: req.body.diagnosis,
        recommendations : req.body.recommendations,
        date: new Date(),
        indications : req.body.indications,
        medicaments : req.body.medicaments,
        health : req.body.health,
        attendedBy: res.locals.user._id
    };
    Pet.update({ _id: req.body.pet},{$push: { clinicalAppointments :  clinicalData }}, (err, condition) => {

        if(!err) return res.sendStatus(200);
            return res.sendStatus(500);
        }
    );
};