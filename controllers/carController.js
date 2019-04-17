const express = require('express');
const router  = express.Router();
const Car  = require('../models/cars');


// new route
router.get('/new', (req, res) => {
  console.log("is this working?");
  res.render('new.ejs');
});

// Create route
router.post('/', (req, res) => {
  console.log(req.body, "<-- req.body will have the contents of the form");

  if(req.body.isConvertible === 'on'){
    req.body.isConvertible = true;
  } else {
    req.body.isConvertible = false
  }

  Car.create(req.body, (err, createdCarFromTheDB) => {
    if(err){
      res.send(err);
    } else {
      res.redirect('/cars');
    }
  })
});

module.exports = router