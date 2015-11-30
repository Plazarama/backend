var mongoose = require('mongoose');

var questionSchema = new mongoose.Schema({
	questionType: string,
	question: string,
	correctAnswer: string,
	secondAnswer: string,
	thirdAnswer: string,
	fourthAnswer: string
});

module.exports = mongoose.model('QuizQuestion', questionSchema);