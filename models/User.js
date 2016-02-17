var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
	
	//nickname: String,
	email: String,
	password: String,

	facebook : {
		id: String,
		token: String,
		email: String,
		name: String
	}
});



//Generate a hash for the pwd
userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('User', userSchema);