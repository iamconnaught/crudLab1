const express = require('express');
const router  = express.Router();
const Car  = require('../models/cars');

// index route
router.get('/', (req, res) => {

  // Telling the model to go ask the db to find all the fruit documents
  Car.find({}, (error, allTheCarsFromTheDB) => {

    if(error){
      res.send(error);
      // console.log(error)
    } else {
      res.render('index.ejs', {cars: allTheCarsFromTheDB});
    }
  })

});
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
    	console.log('problems');
      res.send(err);
    } else {
      res.redirect('/cars');
    }
  })
});



module.exports = router