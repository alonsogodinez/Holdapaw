"use strict";

const Donation = require ('../models/donation');
const httpController = require ('./http');
const uploaderController = require ('./uploaders');


module.exports.create = (req, res) => {

  const donationData = req.body;

  new Promise ((resolve, reject) => {

    if (!req.file) return resolve ({file: null, thumbnail: null});

    const uploaderOptions = {
      service: 'dropbox', file: req.file
    };

    resolve (uploaderController (uploaderOptions)).catch (reject);

  })
    .then ( params => {
      console.log(params.file);
      donationData.photo = params.file;

      donationData.by = req.decoded._id;
      return createDonation (donationData)

    })
    .then (donation => httpController.sendOrJSON ({req, res, obj: donation}))
    .catch (err => httpController.errorOrJSON ({req, res, err}))


};

module.exports.list = (req, res) => {
  Donation.find().populate('by').exec()
    .then(donations => httpController.renderOrJSON({req, res, ctx:{donations}, view: 'donation'}))
    .catch(err => httpController.errorOrJSON({req, res ,err}))
};


module.exports.verify = (req, res) => {

  const _id = req.params.id;
  Donation.update ({_id}, {verified: true})
    .then (aff => httpController.sendOrJSON ({
      req,
      res,
      obj: {verified: true}

    })).catch (err => httpController.errorOrJSON ({req, res, err}))
};

module.exports.createExpense = (req, res) => {

  const spendData = req.body;
  const _id = req.params.id;

  Donation.findOne ({_id}).then (donation => {

      donation.spents.push (spendData);
      return donation.save ()
    }).then (donation => httpController.sendOrJSON ({
      req,
      res,
      obj: donation
    })).catch (err => httpController.errorOrJSON ({req, res, err}));
};

module.exports.detail = (req, res) => {

  const _id = req.params.id;
  Donation.findOne ({_id}).then (donation => httpController.sendOrJSON ({
      req,
      res,
      obj: donation
    })).catch (err => httpController.errorOrJSON ({req, res, err}))
};


//IN case they are in another collection
module.exports.listExpenses = (req, res) => {

  const _id = req.params.id;
  Donation.findOne ({_id}).then (donation => httpController.sendOrJSON ({
      req,
      res,
      obj: donation
    })).catch (err => httpController.errorOrJSON ({req, res, err}))
};

function createDonation (donationData) {

  return new Promise ((resolve, reject) => {

    const donation = new Donation ({

      by: donationData.by,
      to: donationData.to,
      date: new Date (),
      amount: donationData.amount,
      cashType: donationData.cashType,
      photo: donationData.photo

    });

    donation.save ().then (resolve).catch (reject);
  })
}