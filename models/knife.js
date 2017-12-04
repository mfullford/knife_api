const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var KnifeSchema = new Schema({
	name: String,
	description: String,
	rating: Number,
	review: String
});

var Knife = mongoose.model('Knife', KnifeSchema);

module.exports = Knife;