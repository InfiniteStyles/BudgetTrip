const express = require('express');
const mongoose = require('mongoose');
const Model = require('../../database/index.js').User;
const router = express.Router();

router.post('/', (req, res, next) => {
  const data = {
    budget: req.body.budget,
    tripLocation: req.body.location,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    username: req.body.user,
  };

  const user = Model;

  user.findOne({ username: data.username }, (err, doc) => {
    if (err) console.log(err);
    doc.trips.input_budget = data.budget;
    doc.trips.location = data.tripLocation;
    doc.trips.start_date = data.startDate;
    doc.trips.end_date = data.endDate;

    doc.save((err, data) => {
      if (err) console.log('document saving error', err);
    });
  });
  res.send('Added Trip Data...');
});

module.exports.searchData = router;
