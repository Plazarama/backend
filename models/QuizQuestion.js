var mongoose = require('mongoose');

var questionSchema = new mongoose.Schema({
	questionType: String,
	questionImage: String,
	question: String,
	correctAnswer: String,
	secondAnswer: String,
	thirdAnswer: String,
	fourthAnswer: String
});

module.exports = mongoose.model('QuizQuestion', questionSchema);