var mongoose = require('mongoose');

var questionSchema = new mongoose.Schema({
	questionType: String,
	question: String,
	correctAnswer: String,
	secondAnswer: String,
	thirdAnswer: String,
	fourthAnswer: String
	//fifthAnswer: Image
});

module.exports = mongoose.model('QuizQuestion', questionSchema);