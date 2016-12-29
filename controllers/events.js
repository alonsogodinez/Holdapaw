//Models
const Association = require ('../models/association');
const httpController = require ('./http');
const uploaderController = require ('./uploaders');
const moment = require('moment');
const Event = require('../models/event');
//Controllers


module.exports.getInfo = function(req,res)
{
    var  query = { _id: req.params.id_association};
    Association.findById(query._id,function(err,association){
        if(err) return res.sendStatus(500);
        var elementEvent = association.events.id(req.params.id_event);
        return res.json(elementEvent);
    });
};

module.exports.registerEvent = function(req,res)
{
    new Promise ((resolve, reject) => {

        if (!req.file) return resolve ({file: null, thumbnail: null});

        const uploaderOptions = {
            service: 'dropbox', file: req.file
        };

        resolve (uploaderController (uploaderOptions)).catch (reject);

    })
    .then ( params => {
            var eventData = {
                name: req.body.name,
                from: moment(req.body.from,'DD/MM/YYYY h:mm a').toDate().toISOString(),
                to : moment(req.body.to,'DD/MM/YYYY h:mm a').toDate().toISOString(),
                place : req.body.place,
                description : req.body.description
            };
            eventData.photo = params.file;
            eventData.photoThumb = params.thumbnail;
            var  query = { _id: req.body.association};
            console.log(eventData);
            Association.findById(query._id,function(err,association){
                if(err) return res.sendStatus(500);
                association.events.push(eventData);
                association.save(function(err){
                    console.log(err);
                    if(err) return res.sendStatus(500);
                    return res.sendStatus(200);
                })
            })
        })
        .catch (err => httpController.errorOrJSON ({req, res, err}))
};

module.exports.editEvent = function(req,res)
{
    new Promise ((resolve, reject) => {

        if (!req.file) return resolve ({file: null, thumbnail: null});

        const uploaderOptions = {
            service: 'dropbox', file: req.file
        };

        resolve (uploaderController (uploaderOptions)).catch (reject);

    })
        .then ( params => {
            var eventData = {
                name: req.body.name,
                from: moment(req.body.from,'DD/MM/YYYY h:mm a').toDate().toISOString(),
                to : moment(req.body.to,'DD/MM/YYYY h:mm a').toDate().toISOString(),
                place : req.body.place,
                description : req.body.description
            };
            eventData.photo = params.file;
            eventData.photoThumb = params.thumbnail;
            var  query = { _id: req.body.association};
            Association.findById(query._id,function(err,association){
                if(err) return res.sendStatus(500);
                var eventElement = association.events.id(req.params.id_event);
                eventElement.name = eventData.name;
                eventElement.from = eventData.from;
                eventElement.to = eventData.to;
                eventElement.description = eventData.description;
                console.log('evento editado');
                console.log(eventElement);
                eventElement.photo = params.file;
                eventElement.thumbnail = params.thumbnail;
                association.save(function(err){
                    if(err) return res.sendStatus(500);
                    return res.sendStatus(200);
                })
            })
        })
        .catch (err => httpController.errorOrJSON ({req, res, err}))
};