const mongoose = require('mongoose');


const carSchema = new mongoose.Schema({
	make: { type: String},
	model: { type: String},
	color: String,
	isConvertible: Boolean,
	
});


const Car = mongoose.model('Car', carSchema);

module.exports = Car;