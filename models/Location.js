var mongoose = require("mongoose");

var locationSchema = new mongoose.Schema({
	name: String,
	type: String,
	owner: String,
	categories: Array,
	gamesPlayed: Number,
	totalPlayers: Number
});

module.exports = mongoose.model('Location', locationSchema);