module.exports = function(app, passport){

	app.route('/')
	
	
		.get(function(req, res){
			res.render('index', {title: 'Index'});
		});


	app.route('/about')
		.get(function(req, res){
			res.render('about', {title: 'About page'});
		});


	app.route('/login')
		.get(function(req, res){
			res.render('login', {title: 'Login page'});
		})

		.post(passport.authenticate('local-login', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));

	app.route('/signup')
		.get(function(req, res){
			res.render('signup', {title: 'Sign up page'});
		})

		.post(passport.authenticate('local-signup', {
			successRedirect: '/',
			failureRedirect: '/signup'
		}));

};