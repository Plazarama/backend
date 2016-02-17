//Seeding file for the db
var User = require('../models/User');
var Question = require('../models/QuizQuestion');
var Locations = require('../models/Location');


module.exports.seedUser = function() {

	var testUser = {
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

			newUser.save(function(err, user) {
				if (err)
					console.log(err);
			});
		}
	});

};

module.exports.seedLocations = function()	{

	var LocationList = {
		Location1: {
			name: "Sligo IT",
			type: "University",
			owner: "Students",
			categories: ["Math","General"],
			gamesPlayed: 25,
			totalPlayers: 100
		},
		Location2: {
			name: "Brewery Bar",
			type: "Pub",
			owner: "Mr. Brewery",
			categories: ["Math","General"],
			gamesPlayed: 50,
			totalPlayers: 200
		},
	};

	Locations.find({}, function(err, locations){
	if(locations.length<1){
			var Location1 = new Locations();
			Location1.name = LocationList.Location1.name;
			Location1.type = LocationList.Location1.type;
			Location1.owner = LocationList.Location1.owner;
			Location1.categories = LocationList.Location1.categories;
			Location1.totalPlayers = LocationList.Location1.totalPlayers;
			
			Location1.save(function(err){
				if(err)
					console.log(err);
			});

			var Location2 = new Locations();
			Location2.name = LocationList.Location2.name;
			Location2.type = LocationList.Location2.type;
			Location2.owner = LocationList.Location2.owner;
			Location2.categories = LocationList.Location2.categories;
			Location2.totalPlayers = LocationList.Location2.totalPlayers;
			
			Location2.save(function(err){
				if(err)
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
		},
		question2: {
			questionType: "Math",
			question: "12 + 5",
			correctAnswer: "17",
			secondAnswer: "34",
			thirdAnswer: "122",
			fourthAnswer: "45",
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