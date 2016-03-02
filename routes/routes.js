module.exports = function(app, passport){

	var Question = require('../models/QuizQuestion');
	app.route('/')
		.get(function(req, res){
			if(req.isAuthenticated())
				res.render('index', {title: 'Index', user: req.user});
			else
				res.render('index', {title: 'Index'});
		});

	app.route('/host')
		.get(function(req, res){
			res.render('gameHost', {title: 'Host'});
		});

	app.route('/player')
		.get(isLoggedIn,function(req, res){
			res.render('gamePlayer', {title: 'Player', userid: req.user._id});
		});

		app.route('/results')
			.get(function(req, res){
				res.render('results', {
					first_name: "Test 1", first_score: 10,
					second_name: "Test 2", second_score: 2,
					third_name: "Test 3", third_score: 2,
					loser_name: "Test Loser", loser_score: 0,
					my_score: 10
				});
			})
			.post(function(req, res){
				console.log(req.body);
				res.render('results', {
					first_name: req.body.first_name, first_score: req.body.first_score,
					second_name: req.body.second_name, second_score: req.body.second_score,
					third_name: req.body.third_name, third_score: req.body.third_score,
					loser_name: req.body.loser_name, loser_score: req.body.loser_score,
					my_score: req.body.my_score
				});
			});


	app.route('/about')
		.get(function(req, res){
			res.render('about', {title: 'About page'});
		});


	app.route('/profile')
		.get(isLoggedIn,function(req, res){
			res.render('userProfile', {
				user: req.user
			});
		});


	app.route('/stats')
		.get(isLoggedIn,function(req, res){
			res.render('stats', {
				user: req.user
			});
		});

	app.route('/addQuestion')
		.get(isLoggedIn,function(req, res){
			res.render('addQuestion', {
				user: req.user,
				script: ""
			});
		});

	app.route('/newQ')
		.post(function(req, res){
			console.log(req.body);
			var newQuestion = new Question();
			newQuestion.questionType = req.body.questionType;
			newQuestion.question = req.body.question;
			newQuestion.correctAnswer = req.body.correctAnswer;
			newQuestion.secondAnswer = req.body.answer2;
			newQuestion.thirdAnswer = req.body.answer3;
			newQuestion.fourthAnswer = req.body.answer4;

			newQuestion.save(function(err, doc){
				if(err) res.json(err);
				else res.render('addQuestion', {script: 'on'});
			});
		});


	/* LOGIN STUFF */

	app.route('/login')
		.get(function(req, res){
			res.render('login', {title: 'Login page', message: req.flash('loginMessage')});
		})

		.post(passport.authenticate('local-login', {
			successRedirect: '/profile',
			failureRedirect: '/login'
		}));

	app.route('/signup')
		.get(function(req, res){
			res.render('signup', {title: 'Sign up page', message: req.flash('signupMessage')});
		})

		.post(passport.authenticate('local-signup', {
			successRedirect: '/login',
			failureRedirect: '/signup'
		}));


	app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));

	app.get('/auth/facebook/callback',
	        passport.authenticate('facebook', {
	        	successRedirect: '/profile',
	        	failureRedirect : '/'
	        }));

	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});

};


//See if is logged in or not

function isLoggedIn(req, res, next){
	if(req.isAuthenticated())
		return next();

	res.redirect('/');
}
