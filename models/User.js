var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({

	email: String,
	password: String,
	name: String,

	facebook : {
		id: String,
		token: String
	},

	played: Number,
	won: Number,
	lose: Number,
	correct: Number,
	score: Number,
	streak: Number,
	location: String,
	strogest: String,
	weakest: String

});



//Generate a hash for the pwd
userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('User', userSchema);
