//Seeding file for the db
var User = require('../models/User');
var Question = require('../models/QuizQuestion');
var Locations = require('../models/Location');


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
			newUser.correct = 0;
			newUser.score = 0;
			newUser.streak = 0;

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
		},
		question4: {
			questionType: "General",
			question: "How many rings on the Olympic flag",
			correctAnswer: "Five",
			secondAnswer: "Four",
			thirdAnswer: "Six",
			fourthAnswer: "Seven"
		},

		question5: {
			questionType: "Math",
			question: "What is the next prime number after 7",
			correctAnswer: "Eleven",
			secondAnswer: "nine",
			thirdAnswer: "ten",
			fourthAnswer: "thirteen"
		},

		question6: {
			questionType: "General",
			question: "Where in your body is your patella",
			correctAnswer: "Knee",
			secondAnswer: "Foot",
			thirdAnswer: "Arm",
			fourthAnswer: "Toe"
		},

		question7: {
			questionType: "Math",
			question: "Which of the numbers is a factor of 30",
			correctAnswer: "Seven",
			secondAnswer: "Four",
			thirdAnswer: "Six",
			fourthAnswer: "Eight"
		},
		question8: {
			questionType: "General",
			question: "What spirit is mixed with ginger beer in a moscow mule",
			correctAnswer: "Vodka",
			secondAnswer: "Gin",
			thirdAnswer: "Whiskey",
			fourthAnswer: "Rum"
		},

		question9: {
			questionType: "Math",
			question: "Find the odd one out 3,5,11,14,17,21",
			correctAnswer: "Fourteen",
			secondAnswer: "Three",
			thirdAnswer: "Twenty one",
			fourthAnswer: "Seventeen"
		},
		question10: {
			questionType: "General",
			question: "How many feet in a fathomm",
			correctAnswer: "Six",
			secondAnswer: "Seven",
			thirdAnswer: "Eight",
			fourthAnswer: "Nine"
		},
		question11: {
			questionType: "Math",
			question: "23*6-9",
			correctAnswer: "129",
			secondAnswer: "32",
			thirdAnswer: "45",
			fourthAnswer: "17"
		},
		question12: {
			questionType: "General",
			question: "Where can you find London bridge today",
			correctAnswer: "USA",
			secondAnswer: "London",
			thirdAnswer: "Wales",
			fourthAnswer: "France"
		},
		question13: {
			questionType: "Math",
			question: "Whats 20% of €40",
			correctAnswer: "Eight",
			secondAnswer: "Ten",
			thirdAnswer: "Nine",
			fourthAnswer: "Five"
		},
		question14: {
			questionType: "General",
			question: "Whats the name of Dennis the Mennace's dog",
			correctAnswer: "Gnasher",
			secondAnswer: "Rex",
			thirdAnswer: "Rocky",
			fourthAnswer: "Toby"
		},
		question15: {
			questionType: "Math",
			question: "Where can you find London bridge today",
			correctAnswer: "USA",
			secondAnswer: "London",
			thirdAnswer: "Wales",
			fourthAnswer: "France"
		},
		question16: {
			questionType: "Math",
			question: "Whats 20% of €40",
			correctAnswer: "Eight",
			secondAnswer: "Ten",
			thirdAnswer: "Nine",
			fourthAnswer: "Five"
		},
		question17: {
			questionType: "General",
			question: "Whats the name of Dennis the Mennace's dog",
			correctAnswer: "Gnasher",
			secondAnswer: "Rex",
			thirdAnswer: "Rocky",
			fourthAnswer: "Toby"
		},
		question18: {
			questionType: "General",
			question: "Where can you find London bridge today",
			correctAnswer: "USA",
			secondAnswer: "London",
			thirdAnswer: "Wales",
			fourthAnswer: "France"
		},
		question19: {
			questionType: "Math",
			question: "Whats 20% of €40",
			correctAnswer: "Eight",
			secondAnswer: "Ten",
			thirdAnswer: "Nine",
			fourthAnswer: "Five"
		},
		question20: {
			questionType: "General",
			question: "Whats the name of Dennis the Mennace's dog",
			correctAnswer: "Gnasher",
			secondAnswer: "Rex",
			thirdAnswer: "Rocky",
			fourthAnswer: "Toby"
		},
		question21: {
			questionType: "General",
			question: "Where can you find London bridge today",
			correctAnswer: "USA",
			secondAnswer: "London",
			thirdAnswer: "Wales",
			fourthAnswer: "France"
		},
		question22: {
			questionType: "Math",
			question: "Whats 20% of €40",
			correctAnswer: "Eight",
			secondAnswer: "Ten",
			thirdAnswer: "Nine",
			fourthAnswer: "Five"
		},
		question23: {
			questionType: "General",
			question: "Whats the name of Dennis the Mennace's dog",
			correctAnswer: "Gnasher",
			secondAnswer: "Rex",
			thirdAnswer: "Rocky",
			fourthAnswer: "Toby"
		},

		question24: {
			questionType: "Image",
			questionImage: "/QuestionImages/amazon.jpg",
			question: "In which continent is the Amazon river located?",
			correctAnswer: "South America",
			secondAnswer: "Africa",
			thirdAnswer: "Asia",
			fourthAnswer: "Europe"
		},

		question25: {
			questionType: "Image",
			questionImage: "/QuestionImages/Angelina.jpg",
			question: "What is the name of this celebrity?",
			correctAnswer: "Angelina Jolie",
			secondAnswer: "Jennifer Annistion",
			thirdAnswer: "Kris Jenner",
			fourthAnswer: "Courtney Cox"
		},

		question26: {
			questionType: "Image",
			questionImage: "/QuestionImages/ggBridge.jpg",
			question: "What is the name of this bridge?",
			correctAnswer: "Golden Gate Bridge",
			secondAnswer: "Brooklyn Bridge",
			thirdAnswer: "Sydney Harbour Bridge",
			fourthAnswer: "London Bridge"
		},

		question27: {
			questionType: "Image",
			questionImage: "/QuestionImages/messi.jpg",
			question: "What team this sportsperson play for?",
			correctAnswer: "Barcelona FC",
			secondAnswer: "Real Madrid",
			thirdAnswer: "Bayern Munich",
			fourthAnswer: "Chelsea FC"
		},

		question28: {
			questionType: "Image",
			questionImage: "/QuestionImages/addidas.png",
			question: "What brand is this?",
			correctAnswer: "addidas",
			secondAnswer: "nike",
			thirdAnswer: "puma",
			fourthAnswer: "lacoste",
		},

		question29: {
			questionType: "Image",
			questionImage: "/QuestionImages/android.jpg",
			question: "What brand is this?",
			correctAnswer: "android",
			secondAnswer: "samsung",
			thirdAnswer: "lg",
			fourthAnswer: "apple",
		},

		question30: {
			questionType: "Image",
			questionImage: "/QuestionImages/bmw.jpg",
			question: "What brand is this?",
			correctAnswer: "bmw",
			secondAnswer: "mercedes",
			thirdAnswer: "lexus",
			fourthAnswer: "fiat",
		},

		question31: {
			questionType: "Image",
			questionImage: "/QuestionImages/burberry.jpg",
			question: "What brand is this?",
			correctAnswer: "burberry",
			secondAnswer: "lacoste",
			thirdAnswer: "addidas",
			fourthAnswer: "jack & jones",
		},

		question32: {
			questionType: "Image",
			questionImage: "/QuestionImages/burgerking.jpg",
			question: "What brand is this?",
			correctAnswer: "burger king",
			secondAnswer: "mc donalds",
			thirdAnswer: "kfc",
			fourthAnswer: "dominoes",
		},

		question33: {
			questionType: "Image",
			questionImage: "/QuestionImages/chanel.jpg",
			question: "What brand is this?",
			correctAnswer: "chanel",
			secondAnswer: "armani",
			thirdAnswer: "dkny",
			fourthAnswer: "axis",
		},

		question34: {
			questionType: "Image",
			questionImage: "/QuestionImages/citreon.jpg",
			question: "What brand is this?",
			correctAnswer: "citreon",
			secondAnswer: "ford",
			thirdAnswer: "fiat",
			fourthAnswer: "peugout",
		},

		question35: {
			questionType: "Image",
			questionImage: "/QuestionImages/disney.jpg",
			question: "What brand is this?",
			correctAnswer: "disney",
			secondAnswer: "pixar",
			thirdAnswer: "dreamworks",
			fourthAnswer: "",
		},

		question36: {
			questionType: "Image",
			questionImage: "/QuestionImages/emporioArmani.jpg",
			question: "What brand is this?",
			correctAnswer: "emporioArmani",
			secondAnswer: "chanel",
			thirdAnswer: "diesel",
			fourthAnswer: "dkny",
		},

		question37: {
			questionType: "Image",
			questionImage: "/QuestionImages/givenchy.jpg",
			question: "What brand is this?",
			correctAnswer: "qivenchy",
			secondAnswer: "gucci",
			thirdAnswer: "chanel",
			fourthAnswer: "armani",
		},

		question38: {
			questionType: "Image",
			questionImage: "/QuestionImages/gucci.jpg",
			question: "What brand is this?",
			correctAnswer: "gucci",
			secondAnswer: "givenchy",
			thirdAnswer: "chanel",
			fourthAnswer: "dkny",
		},

		question39: {
			questionType: "Image",
			questionImage: "/QuestionImages/hardrockcafe.jpg",
			question: "What brand is this?",
			correctAnswer: "hard rock cafe",
			secondAnswer: "starbucks",
			thirdAnswer: "burger king",
			fourthAnswer: "subway",
		},

		question40: {
			questionType: "Image",
			questionImage: "/QuestionImages/honda.jpg",
			question: "What brand is this?",
			correctAnswer: "honda",
			secondAnswer: "renault",
			thirdAnswer: "volkswagon",
			fourthAnswer: "nissan",
		},

		question41: {
			questionType: "Image",
			questionImage: "/QuestionImages/mastercard.jpg",
			question: "What brand is this?",
			correctAnswer: "mastercard",
			secondAnswer: "discover network",
			thirdAnswer: "visa",
			fourthAnswer: "american express",
		},

		question42: {
			questionType: "Image",
			questionImage: "/QuestionImages/renault.jpg",
			question: "What brand is this?",
			correctAnswer: "renault",
			secondAnswer: "honda",
			thirdAnswer: "ford",
			fourthAnswer: "toyota",
		},

		question43: {
			questionType: "Image",
			questionImage: "/QuestionImages/rockstargames.jpg",
			question: "What brand is this?",
			correctAnswer: "rockstar games",
			secondAnswer: "ea games",
			thirdAnswer: "ubisoft",
			fourthAnswer: "infinity ward",
		},

		question44: {
			questionType: "Image",
			questionImage: "/QuestionImages/shell.jpg",
			question: "What brand is this?",
			correctAnswer: "shell",
			secondAnswer: "texaco",
			thirdAnswer: "sc feuls",
			fourthAnswer: "tesoro",
		},

		question45: {
			questionType: "Image",
			questionImage: "/QuestionImages/umbro.jpg",
			question: "What brand is this?",
			correctAnswer: "umbro",
			secondAnswer: "puma",
			thirdAnswer: "addidas",
			fourthAnswer: "nike",
		},

		question46: {
			questionType: "Image",
			questionImage: "/QuestionImages/versachi.jpg",
			question: "What brand is this?",
			correctAnswer: "versachi",
			secondAnswer: "gucci",
			thirdAnswer: "ralph lauren",
			fourthAnswer: "d&g",
		},

		question47: {
			questionType: "Image",
			questionImage: "/QuestionImages/WeightWatchers.png",
			question: "What brand is this?",
			correctAnswer: "weight watchers",
			secondAnswer: "pepsi",
			thirdAnswer: "coca cola",
			fourthAnswer: "mars",
		},

		question48: {
			questionType: "Image",
			questionImage: "/QuestionImages/wwe.jpg",
			question: "What brand is this?",
			correctAnswer: "world wrestling entertainment",
			secondAnswer: "ultimate fighting championship",
			thirdAnswer: "world series of fighting",
			fourthAnswer: "bellator mma",
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

			Question3.save(function(err){
				if(err)
					console.log(err);
			});

			var Question4 = new Question();
			Question4.questionType = setOfQuestions.question4.questionType;
			Question4.question = setOfQuestions.question4.question;
			Question4.correctAnswer = setOfQuestions.question4.correctAnswer;
			Question4.secondAnswer = setOfQuestions.question4.secondAnswer;
			Question4.thirdAnswer = setOfQuestions.question4.thirdAnswer;
			Question4.fourthAnswer = setOfQuestions.question4.fourthAnswer;

			Question4.save(function(err){
				if(err)
					console.log(err);
			});

			var Question5 = new Question();
			Question5.questionType = setOfQuestions.question5.questionType;
			Question5.question = setOfQuestions.question5.question;
			Question5.correctAnswer = setOfQuestions.question5.correctAnswer;
			Question5.secondAnswer = setOfQuestions.question5.secondAnswer;
			Question5.thirdAnswer = setOfQuestions.question5.thirdAnswer;
			Question5.fourthAnswer = setOfQuestions.question5.fourthAnswer;

			Question5.save(function(err){
				if(err)
					console.log(err);
			});


			var Question6 = new Question();
			Question6.questionType = setOfQuestions.question6.questionType;
			Question6.question = setOfQuestions.question6.question;
			Question6.correctAnswer = setOfQuestions.question6.correctAnswer;
			Question6.secondAnswer = setOfQuestions.question6.secondAnswer;
			Question6.thirdAnswer = setOfQuestions.question6.thirdAnswer;
			Question6.fourthAnswer = setOfQuestions.question6.fourthAnswer;

			Question6.save(function(err){
				if(err)
					console.log(err);
			});

			var Question7 = new Question();
			Question7.questionType = setOfQuestions.question7.questionType;
			Question7.question = setOfQuestions.question7.question;
			Question7.correctAnswer = setOfQuestions.question7.correctAnswer;
			Question7.secondAnswer = setOfQuestions.question7.secondAnswer;
			Question7.thirdAnswer = setOfQuestions.question7.thirdAnswer;
			Question7.fourthAnswer = setOfQuestions.question7.fourthAnswer;

			Question7.save(function(err){
				if(err)
					console.log(err);
			});

			var Question8 = new Question();
			Question8.questionType = setOfQuestions.question8.questionType;
			Question8.question = setOfQuestions.question8.question;
			Question8.correctAnswer = setOfQuestions.question8.correctAnswer;
			Question8.secondAnswer = setOfQuestions.question8.secondAnswer;
			Question8.thirdAnswer = setOfQuestions.question8.thirdAnswer;
			Question8.fourthAnswer = setOfQuestions.question8.fourthAnswer;

			Question8.save(function(err){
				if(err)
					console.log(err);
			});


			var Question9 = new Question();
			Question9.questionType = setOfQuestions.question9.questionType;
			Question9.question = setOfQuestions.question9.question;
			Question9.correctAnswer = setOfQuestions.question9.correctAnswer;
			Question9.secondAnswer = setOfQuestions.question9.secondAnswer;
			Question9.thirdAnswer = setOfQuestions.question9.thirdAnswer;
			Question9.fourthAnswer = setOfQuestions.question9.fourthAnswer;

			Question9.save(function(err){
				if(err)
					console.log(err);
			});

			var Question10 = new Question();
			Question10.questionType = setOfQuestions.question10.questionType;
			Question10.question = setOfQuestions.question10.question;
			Question10.correctAnswer = setOfQuestions.question10.correctAnswer;
			Question10.secondAnswer = setOfQuestions.question10.secondAnswer;
			Question10.thirdAnswer = setOfQuestions.question10.thirdAnswer;
			Question10.fourthAnswer = setOfQuestions.question10.fourthAnswer;

			Question10.save(function(err){
				if(err)
					console.log(err);
			});

			var Question11 = new Question();
			Question11.questionType = setOfQuestions.question11.questionType;
			Question11.question = setOfQuestions.question11.question;
			Question11.correctAnswer = setOfQuestions.question11.correctAnswer;
			Question11.secondAnswer = setOfQuestions.question11.secondAnswer;
			Question11.thirdAnswer = setOfQuestions.question11.thirdAnswer;
			Question11.fourthAnswer = setOfQuestions.question11.fourthAnswer;

			Question11.save(function(err){
				if(err)
					console.log(err);
			});


			var Question12 = new Question();
			Question12.questionType = setOfQuestions.question12.questionType;
			Question12.question = setOfQuestions.question12.question;
			Question12.correctAnswer = setOfQuestions.question12.correctAnswer;
			Question12.secondAnswer = setOfQuestions.question12.secondAnswer;
			Question12.thirdAnswer = setOfQuestions.question12.thirdAnswer;
			Question12.fourthAnswer = setOfQuestions.question12.fourthAnswer;

			Question12.save(function(err){
				if(err)
					console.log(err);
			});

			var Question13 = new Question();
			Question13.questionType = setOfQuestions.question13.questionType;
			Question13.question = setOfQuestions.question13.question;
			Question13.correctAnswer = setOfQuestions.question13.correctAnswer;
			Question13.secondAnswer = setOfQuestions.question13.secondAnswer;
			Question13.thirdAnswer = setOfQuestions.question13.thirdAnswer;
			Question13.fourthAnswer = setOfQuestions.question13.fourthAnswer;

			Question13.save(function(err){
				if(err)
					console.log(err);
			});

			var Question14 = new Question();
			Question14.questionType = setOfQuestions.question14.questionType;
			Question14.question = setOfQuestions.question14.question;
			Question14.correctAnswer = setOfQuestions.question14.correctAnswer;
			Question14.secondAnswer = setOfQuestions.question14.secondAnswer;
			Question14.thirdAnswer = setOfQuestions.question14.thirdAnswer;
			Question14.fourthAnswer = setOfQuestions.question14.fourthAnswer;

			Question14.save(function(err){
				if(err)
					console.log(err);
			});


			var Question15 = new Question();
			Question15.questionType = setOfQuestions.question15.questionType;
			Question15.question = setOfQuestions.question15.question;
			Question15.correctAnswer = setOfQuestions.question15.correctAnswer;
			Question15.secondAnswer = setOfQuestions.question15.secondAnswer;
			Question15.thirdAnswer = setOfQuestions.question15.thirdAnswer;
			Question15.fourthAnswer = setOfQuestions.question15.fourthAnswer;

			Question15.save(function(err){
				if(err)
					console.log(err);
			});

			var Question16 = new Question();
			Question16.questionType = setOfQuestions.question16.questionType;
			Question16.question = setOfQuestions.question16.question;
			Question16.correctAnswer = setOfQuestions.question16.correctAnswer;
			Question16.secondAnswer = setOfQuestions.question16.secondAnswer;
			Question16.thirdAnswer = setOfQuestions.question16.thirdAnswer;
			Question16.fourthAnswer = setOfQuestions.question16.fourthAnswer;

			Question16.save(function(err){
				if(err)
					console.log(err);
			});

			var Question17 = new Question();
			Question17.questionType = setOfQuestions.question17.questionType;
			Question17.question = setOfQuestions.question17.question;
			Question17.correctAnswer = setOfQuestions.question17.correctAnswer;
			Question17.secondAnswer = setOfQuestions.question17.secondAnswer;
			Question17.thirdAnswer = setOfQuestions.question17.thirdAnswer;
			Question17.fourthAnswer = setOfQuestions.question17.fourthAnswer;

			Question17.save(function(err){
				if(err)
					console.log(err);
			});


			var Question18 = new Question();
			Question18.questionType = setOfQuestions.question18.questionType;
			Question18.question = setOfQuestions.question18.question;
			Question18.correctAnswer = setOfQuestions.question18.correctAnswer;
			Question18.secondAnswer = setOfQuestions.question18.secondAnswer;
			Question18.thirdAnswer = setOfQuestions.question18.thirdAnswer;
			Question18.fourthAnswer = setOfQuestions.question18.fourthAnswer;

			Question18.save(function(err){
				if(err)
					console.log(err);
			});

			var Question19 = new Question();
			Question19.questionType = setOfQuestions.question19.questionType;
			Question19.question = setOfQuestions.question19.question;
			Question19.correctAnswer = setOfQuestions.question19.correctAnswer;
			Question19.secondAnswer = setOfQuestions.question19.secondAnswer;
			Question19.thirdAnswer = setOfQuestions.question19.thirdAnswer;
			Question19.fourthAnswer = setOfQuestions.question19.fourthAnswer;

			Question19.save(function(err){
				if(err)
					console.log(err);
			});

			var Question20 = new Question();
			Question20.questionType = setOfQuestions.question20.questionType;
			Question20.question = setOfQuestions.question20.question;
			Question20.correctAnswer = setOfQuestions.question20.correctAnswer;
			Question20.secondAnswer = setOfQuestions.question20.secondAnswer;
			Question20.thirdAnswer = setOfQuestions.question20.thirdAnswer;
			Question20.fourthAnswer = setOfQuestions.question20.fourthAnswer;

			Question20.save(function(err){
				if(err)
					console.log(err);
			});


			var Question21 = new Question();
			Question21.questionType = setOfQuestions.question21.questionType;
			Question21.question = setOfQuestions.question21.question;
			Question21.correctAnswer = setOfQuestions.question21.correctAnswer;
			Question21.secondAnswer = setOfQuestions.question21.secondAnswer;
			Question21.thirdAnswer = setOfQuestions.question21.thirdAnswer;
			Question21.fourthAnswer = setOfQuestions.question21.fourthAnswer;

			Question21.save(function(err){
				if(err)
					console.log(err);
			});

			var Question22 = new Question();
			Question22.questionType = setOfQuestions.question22.questionType;
			Question22.question = setOfQuestions.question22.question;
			Question22.correctAnswer = setOfQuestions.question22.correctAnswer;
			Question22.secondAnswer = setOfQuestions.question22.secondAnswer;
			Question22.thirdAnswer = setOfQuestions.question22.thirdAnswer;
			Question22.fourthAnswer = setOfQuestions.question22.fourthAnswer;

			Question22.save(function(err){
				if(err)
					console.log(err);
			});

			var Question23 = new Question();
			Question23.questionType = setOfQuestions.question23.questionType;
			Question23.question = setOfQuestions.question23.question;
			Question23.correctAnswer = setOfQuestions.question23.correctAnswer;
			Question23.secondAnswer = setOfQuestions.question23.secondAnswer;
			Question23.thirdAnswer = setOfQuestions.question23.thirdAnswer;
			Question23.fourthAnswer = setOfQuestions.question23.fourthAnswer;

			Question23.save(function(err){
				if(err)
					console.log(err);
			});	

			var Question24 = new Question();
			Question24.questionType = setOfQuestions.question24.questionType;
			Question24.questionImage = setOfQuestions.question24.questionImage;
			Question24.question = setOfQuestions.question24.question;
			Question24.correctAnswer = setOfQuestions.question24.correctAnswer;
			Question24.secondAnswer = setOfQuestions.question24.secondAnswer;
			Question24.thirdAnswer = setOfQuestions.question24.thirdAnswer;
			Question24.fourthAnswer = setOfQuestions.question24.fourthAnswer;

			Question24.save(function(err){
				if(err)
					console.log(err);
			});

				var Question25 = new Question();
			Question25.questionType = setOfQuestions.question25.questionType;
			Question25.questionImage = setOfQuestions.question25.questionImage;
			Question25.question = setOfQuestions.question25.question;
			Question25.correctAnswer = setOfQuestions.question25.correctAnswer;
			Question25.secondAnswer = setOfQuestions.question25.secondAnswer;
			Question25.thirdAnswer = setOfQuestions.question25.thirdAnswer;
			Question25.fourthAnswer = setOfQuestions.question25.fourthAnswer;

			Question25.save(function(err){
				if(err)
					console.log(err);
			});

				var Question26 = new Question();
			Question26.questionType = setOfQuestions.question26.questionType;
			Question26.questionImage = setOfQuestions.question26.questionImage;
			Question26.question = setOfQuestions.question26.question;
			Question26.correctAnswer = setOfQuestions.question26.correctAnswer;
			Question26.secondAnswer = setOfQuestions.question26.secondAnswer;
			Question26.thirdAnswer = setOfQuestions.question26.thirdAnswer;
			Question26.fourthAnswer = setOfQuestions.question26.fourthAnswer;

			Question26.save(function(err){
				if(err)
					console.log(err);
			});

				var Question27 = new Question();
			Question27.questionType = setOfQuestions.question27.questionType;
			Question27.questionImage = setOfQuestions.question27.questionImage;
			Question27.question = setOfQuestions.question27.question;
			Question27.correctAnswer = setOfQuestions.question27.correctAnswer;
			Question27.secondAnswer = setOfQuestions.question27.secondAnswer;
			Question27.thirdAnswer = setOfQuestions.question27.thirdAnswer;
			Question27.fourthAnswer = setOfQuestions.question27.fourthAnswer;

			Question27.save(function(err){
				if(err)
					console.log(err);
			});

				var Question28 = new Question();
			Question28.questionType = setOfQuestions.question28.questionType;
			Question28.questionImage = setOfQuestions.question28.questionImage;
			Question28.question = setOfQuestions.question28.question;
			Question28.correctAnswer = setOfQuestions.question28.correctAnswer;
			Question28.secondAnswer = setOfQuestions.question28.secondAnswer;
			Question28.thirdAnswer = setOfQuestions.question28.thirdAnswer;
			Question28.fourthAnswer = setOfQuestions.question28.fourthAnswer;

			Question28.save(function(err){
				if(err)
					console.log(err);
			});	

				var Question29 = new Question();
			Question29.questionType = setOfQuestions.question29.questionType;
			Question29.questionImage = setOfQuestions.question29.questionImage;
			Question29.question = setOfQuestions.question29.question;
			Question29.correctAnswer = setOfQuestions.question29.correctAnswer;
			Question29.secondAnswer = setOfQuestions.question29.secondAnswer;
			Question29.thirdAnswer = setOfQuestions.question29.thirdAnswer;
			Question29.fourthAnswer = setOfQuestions.question29.fourthAnswer;

			Question29.save(function(err){
				if(err)
					console.log(err);
			});		

				var Question30 = new Question();
			Question30.questionType = setOfQuestions.question30.questionType;
			Question30.questionImage = setOfQuestions.question30.questionImage;
			Question30.question = setOfQuestions.question30.question;
			Question30.correctAnswer = setOfQuestions.question30.correctAnswer;
			Question30.secondAnswer = setOfQuestions.question30.secondAnswer;
			Question30.thirdAnswer = setOfQuestions.question30.thirdAnswer;
			Question30.fourthAnswer = setOfQuestions.question30.fourthAnswer;

			Question30.save(function(err){
				if(err)
					console.log(err);
			});

				var Question31 = new Question();
			Question31.questionType = setOfQuestions.question31.questionType;
			Question31.questionImage = setOfQuestions.question31.questionImage;
			Question31.question = setOfQuestions.question31.question;
			Question31.correctAnswer = setOfQuestions.question31correctAnswer;
			Question31.secondAnswer = setOfQuestions.question31.secondAnswer;
			Question31.thirdAnswer = setOfQuestions.question31.thirdAnswer;
			Question31.fourthAnswer = setOfQuestions.question31.fourthAnswer;

			Question31.save(function(err){
				if(err)
					console.log(err);
			});

				var Question32 = new Question();
			Question32.questionType = setOfQuestions.question32.questionType;
			Question32.questionImage = setOfQuestions.question32.questionImage;
			Question32.question = setOfQuestions.question32.question;
			Question32.correctAnswer = setOfQuestions.question32.correctAnswer;
			Question32.secondAnswer = setOfQuestions.question32.secondAnswer;
			Question32.thirdAnswer = setOfQuestions.question32.thirdAnswer;
			Question32.fourthAnswer = setOfQuestions.question32.fourthAnswer;

			Question32.save(function(err){
				if(err)
					console.log(err);
			});

				var Question33 = new Question();
			Question33.questionType = setOfQuestions.question33.questionType;
			Question33.questionImage = setOfQuestions.question33.questionImage;
			Question33.question = setOfQuestions.question33.question;
			Question33.correctAnswer = setOfQuestions.question33.correctAnswer;
			Question33.secondAnswer = setOfQuestions.question33.secondAnswer;
			Question33.thirdAnswer = setOfQuestions.question33.thirdAnswer;
			Question33.fourthAnswer = setOfQuestions.question33.fourthAnswer;

			Question33.save(function(err){
				if(err)
					console.log(err);
			});

				var Question34 = new Question();
			Question34.questionType = setOfQuestions.question34.questionType;
			Question34.questionImage = setOfQuestions.question34.questionImage;
			Question34.question = setOfQuestions.question34.question;
			Question34.correctAnswer = setOfQuestions.question34.correctAnswer;
			Question34.secondAnswer = setOfQuestions.question34.secondAnswer;
			Question34.thirdAnswer = setOfQuestions.question34.thirdAnswer;
			Question34.fourthAnswer = setOfQuestions.question34.fourthAnswer;

			Question34.save(function(err){
				if(err)
					console.log(err);
			});

				var Question35 = new Question();
			Question35.questionType = setOfQuestions.question35.questionType;
			Question35.questionImage = setOfQuestions.question35.questionImage;
			Question35.question = setOfQuestions.question35.question;
			Question35.correctAnswer = setOfQuestions.question35.correctAnswer;
			Question35.secondAnswer = setOfQuestions.question35.secondAnswer;
			Question35.thirdAnswer = setOfQuestions.question35.thirdAnswer;
			Question35.fourthAnswer = setOfQuestions.question35.fourthAnswer;

			Question35.save(function(err){
				if(err)
					console.log(err);
			});

				var Question36 = new Question();
			Question36.questionType = setOfQuestions.question36.questionType;
			Question36.questionImage = setOfQuestions.question36.questionImage;
			Question36.question = setOfQuestions.question36.question;
			Question36.correctAnswer = setOfQuestions.question36.correctAnswer;
			Question36.secondAnswer = setOfQuestions.question36.secondAnswer;
			Question36.thirdAnswer = setOfQuestions.question36.thirdAnswer;
			Question36.fourthAnswer = setOfQuestions.question36.fourthAnswer;

			Question36.save(function(err){
				if(err)
					console.log(err);
			});

				var Question37 = new Question();
			Question37.questionType = setOfQuestions.question37.questionType;
			Question37.questionImage = setOfQuestions.question37.questionImage;
			Question37.question = setOfQuestions.question37.question;
			Question37.correctAnswer = setOfQuestions.question37.correctAnswer;
			Question37.secondAnswer = setOfQuestions.question37.secondAnswer;
			Question37.thirdAnswer = setOfQuestions.question37.thirdAnswer;
			Question37.fourthAnswer = setOfQuestions.question37.fourthAnswer;

			Question37.save(function(err){
				if(err)
					console.log(err);
			});

				var Question38 = new Question();
			Question38.questionType = setOfQuestions.question38.questionType;
			Question38.questionImage = setOfQuestions.question38.questionImage;
			Question38.question = setOfQuestions.question38.question;
			Question38.correctAnswer = setOfQuestions.question38.correctAnswer;
			Question38.secondAnswer = setOfQuestions.question38.secondAnswer;
			Question38.thirdAnswer = setOfQuestions.question38.thirdAnswer;
			Question38.fourthAnswer = setOfQuestions.question38.fourthAnswer;

			Question38.save(function(err){
				if(err)
					console.log(err);
			});

				var Question39 = new Question();
			Question39.questionType = setOfQuestions.question39.questionType;
			Question39.questionImage = setOfQuestions.question39.questionImage;
			Question39.question = setOfQuestions.question39.question;
			Question39.correctAnswer = setOfQuestions.question39.correctAnswer;
			Question39.secondAnswer = setOfQuestions.question39.secondAnswer;
			Question39.thirdAnswer = setOfQuestions.question39.thirdAnswer;
			Question39.fourthAnswer = setOfQuestions.question39.fourthAnswer;

			Question39.save(function(err){
				if(err)
					console.log(err);
			});

				var Question40 = new Question();
			Question40.questionType = setOfQuestions.question40.questionType;
			Question40.questionImage = setOfQuestions.question40.questionImage;
			Question40.question = setOfQuestions.question40.question;
			Question40.correctAnswer = setOfQuestions.question40.correctAnswer;
			Question40.secondAnswer = setOfQuestions.question40.secondAnswer;
			Question40.thirdAnswer = setOfQuestions.question40.thirdAnswer;
			Question40.fourthAnswer = setOfQuestions.question40.fourthAnswer;

			Question40.save(function(err){
				if(err)
					console.log(err);
			});

				var Question41 = new Question();
			Question41.questionType = setOfQuestions.question41.questionType;
			Question41.questionImage = setOfQuestions.question41.questionImage;
			Question41.question = setOfQuestions.question41.question;
			Question41.correctAnswer = setOfQuestions.question41.correctAnswer;
			Question41.secondAnswer = setOfQuestions.question41.secondAnswer;
			Question41.thirdAnswer = setOfQuestions.question41.thirdAnswer;
			Question41.fourthAnswer = setOfQuestions.question41.fourthAnswer;

			Question41.save(function(err){
				if(err)
					console.log(err);
			});

				var Question42 = new Question();
			Question42.questionType = setOfQuestions.question42.questionType;
			Question42.questionImage = setOfQuestions.question42.questionImage;
			Question42.question = setOfQuestions.question42.question;
			Question42.correctAnswer = setOfQuestions.question42.correctAnswer;
			Question42.secondAnswer = setOfQuestions.question42.secondAnswer;
			Question42.thirdAnswer = setOfQuestions.question42.thirdAnswer;
			Question42.fourthAnswer = setOfQuestions.question42.fourthAnswer;

			Question42.save(function(err){
				if(err)
					console.log(err);
			});

				var Question43 = new Question();
			Question43.questionType = setOfQuestions.question43.questionType;
			Question43.questionImage = setOfQuestions.question43.questionImage;
			Question43.question = setOfQuestions.question43.question;
			Question43.correctAnswer = setOfQuestions.question43.correctAnswer;
			Question43.secondAnswer = setOfQuestions.question43.secondAnswer;
			Question43.thirdAnswer = setOfQuestions.question43.thirdAnswer;
			Question43.fourthAnswer = setOfQuestions.question43.fourthAnswer;

			Question43.save(function(err){
				if(err)
					console.log(err);
			});

				var Question44 = new Question();
			Question44.questionType = setOfQuestions.question44.questionType;
			Question44.questionImage = setOfQuestions.question44.questionImage;
			Question44.question = setOfQuestions.question44.question;
			Question44.correctAnswer = setOfQuestions.question44.correctAnswer;
			Question44.secondAnswer = setOfQuestions.question44.secondAnswer;
			Question44.thirdAnswer = setOfQuestions.question44.thirdAnswer;
			Question44.fourthAnswer = setOfQuestions.question44.fourthAnswer;

			Question44.save(function(err){
				if(err)
					console.log(err);
			});

				var Question45 = new Question();
			Question45.questionType = setOfQuestions.question45.questionType;
			Question45.questionImage = setOfQuestions.question45.questionImage;
			Question45.question = setOfQuestions.question45.question;
			Question45.correctAnswer = setOfQuestions.question45.correctAnswer;
			Question45.secondAnswer = setOfQuestions.question45.secondAnswer;
			Question45.thirdAnswer = setOfQuestions.question45.thirdAnswer;
			Question45.fourthAnswer = setOfQuestions.question45.fourthAnswer;

			Question45.save(function(err){
				if(err)
					console.log(err);
			});

				var Question46 = new Question();
			Question46.questionType = setOfQuestions.question46.questionType;
			Question46.questionImage = setOfQuestions.question46.questionImage;
			Question46.question = setOfQuestions.question46.question;
			Question46.correctAnswer = setOfQuestions.question46.correctAnswer;
			Question46.secondAnswer = setOfQuestions.question46.secondAnswer;
			Question46.thirdAnswer = setOfQuestions.question46.thirdAnswer;
			Question46.fourthAnswer = setOfQuestions.question46.fourthAnswer;

			Question46.save(function(err){
				if(err)
					console.log(err);
			});

				var Question47 = new Question();
			Question47.questionType = setOfQuestions.question47.questionType;
			Question47.questionImage = setOfQuestions.question47.questionImage;
			Question47.question = setOfQuestions.question47.question;
			Question47.correctAnswer = setOfQuestions.question47.correctAnswer;
			Question47.secondAnswer = setOfQuestions.question47.secondAnswer;
			Question47.thirdAnswer = setOfQuestions.question47.thirdAnswer;
			Question47.fourthAnswer = setOfQuestions.question47.fourthAnswer;

			Question47.save(function(err){
				if(err)
					console.log(err);
			});

				var Question48 = new Question();
			Question48.questionType = setOfQuestions.question48.questionType;
			Question48.questionImage = setOfQuestions.question48.questionImage;
			Question48.question = setOfQuestions.question48.question;
			Question48.correctAnswer = setOfQuestions.question48.correctAnswer;
			Question48.secondAnswer = setOfQuestions.question48.secondAnswer;
			Question48.thirdAnswer = setOfQuestions.question48.thirdAnswer;
			Question48.fourthAnswer = setOfQuestions.question48.fourthAnswer;

			Question48.save(function(err){
				if(err)
					console.log(err);
			});

		}
	});

};
