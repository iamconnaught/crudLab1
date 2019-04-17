const express = require('express');
const router  = express.Router();
const Car  = require('../models/cars');

// index route
router.get('/', (req, res) => {


  Car.find({}, (error, allTheCarsFromTheDB) => {

    if(error){
      res.send(error);

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

// show route 
router.get('/:id', (req, res) => {


  Car.findOne({_id: req.params.id}, (err, foundCar) => {
      if(err){
        res.send(err);
      } else {
          console.log(typeof foundCar, 'foundCar');
          if(foundCar != null){

              res.render('show.ejs', {
                car: foundCar 
              });

          } else {
            res.send('no Car found')
          }


      }
  });


});

// delete route
router.delete('/:id', (req, res) => {
  Car.findByIdAndRemove(req.params.id, (err, deletedCar)=>{
    if(err){
      res.send(err)
    } else {
      console.log(deletedCar);
      res.redirect('/cars');
    }
  })




});









module.exports = router