//Seeding file for the db
var User = require('../models/User');
var Question = require('../models/QuizQuestion');


module.exports.seedUser = function() {

	var testUser = {
		name: 'Test',
		email: 'test@test.com',
		password: '1234'
	};

	//Create a test user
	User.findOne({
		email: testUser.email
	}, function(err, user) {
		if (err)
			console.log(err);
		else if (!user) {
			var newUser = new User();
			newUser.email = testUser.email;
			newUser.password = newUser.generateHash(testUser.password);
			newUser.name = testUser.name;
			newUser.played = 0;
			newUser.won = 0;
			newUser.lose = 0;
			newUser.score = 0;
			newUser.streak = 0;

			newUser.save(function(err, user) {
				if (err)
					console.log(err);
			});
		}
	});

};


module.exports.seedQuestions = function() {

	var setOfQuestions = {
		question1: {
			questionType: "General",
			question: "Which is the capital of Italia?",
			correctAnswer: "Roma",
			secondAnswer: "Madrid",
			thirdAnswer: "Dublin",
			fourthAnswer: "Paris",
			//fifthAnswer: '\public\images\logo.png'
		},
		question2: {
			questionType: "Math",
			question: "12 + 5",
			correctAnswer: "17",
			secondAnswer: "34",
			thirdAnswer: "122",
			fourthAnswer: "45",
			//fifthAnswer: '\public\images\logo.png'
		},
		question3: {
			questionType: "General",
			question: "Which is the biggest animal?",
			correctAnswer: "Elephant",
			secondAnswer: "Lion",
			thirdAnswer: "Cat",
			fourthAnswer: "Rhino",
			//fifthAnswer: '\public\images\logo.png'
		},
	};

	//Add to db

	Question.find({}, function(err, questions){
		if(questions.length<1){
			var Question1 = new Question();
			Question1.questionType = setOfQuestions.question1.questionType;
			Question1.question = setOfQuestions.question1.question;
			Question1.correctAnswer = setOfQuestions.question1.correctAnswer;
			Question1.secondAnswer = setOfQuestions.question1.secondAnswer;
			Question1.thirdAnswer = setOfQuestions.question1.thirdAnswer;
			Question1.fourthAnswer = setOfQuestions.question1.fourthAnswer;
			//Question1.fifthAnswer = setOfQuestions.question1.fifthAnswer;

			Question1.save(function(err){
				if(err)
					console.log(err);
			});

			var Question2 = new Question();
			Question2.questionType = setOfQuestions.question2.questionType;
			Question2.question = setOfQuestions.question2.question;
			Question2.correctAnswer = setOfQuestions.question2.correctAnswer;
			Question2.secondAnswer = setOfQuestions.question2.secondAnswer;
			Question2.thirdAnswer = setOfQuestions.question2.thirdAnswer;
			Question2.fourthAnswer = setOfQuestions.question2.fourthAnswer;
			//Question2.fifthAnswer = setOfQuestions.question2.fifthAnswer;

			Question2.save(function(err){
				if(err)
					console.log(err);
			});


			var Question3 = new Question();
			Question3.questionType = setOfQuestions.question3.questionType;
			Question3.question = setOfQuestions.question3.question;
			Question3.correctAnswer = setOfQuestions.question3.correctAnswer;
			Question3.secondAnswer = setOfQuestions.question3.secondAnswer;
			Question3.thirdAnswer = setOfQuestions.question3.thirdAnswer;
			Question3.fourthAnswer = setOfQuestions.question3.fourthAnswer;
			//Question3.fifthAnswer = setOfQuestions.question3.fifthAnswer;

			Question3.save(function(err){
				if(err)
					console.log(err);
			});
		}
	});





};
