module.exports = function(app, passport){

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
				res.render('results', {title: 'Results'});
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

	app.route('/addQuestion')
		.post('/newQ', function(req, res){
			new QuizQuestion({
			questionType: req.body.questionType,
			question: req.body.question,
			correctAnswer: req.body.correctAnswer,
			secondAnswer: req.body.answer2,
			thirdAnswer: req.body.answer3,
			fourthAnswer: req.body.answer4}).save(function(err, doc){
				if(err) res.json(err);
				else res.send('Question added sucessfully!');
			})
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
