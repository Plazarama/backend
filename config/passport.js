var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;


var User = require('../models/User');
var configAuth = require('./secret');



module.exports = function(passport){

	passport.serializeUser(function(user, done){
		done(null,user.id);
	});

	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user);
		});
	});

	passport.use('local-signup', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	}, function(req, email, password, done){

		process.nextTick(function(){

				User.findOne({'email': email}, function(err, user){
					if(err)
						return done(err);

					if(user)
						return done(null, false, req.flash('signupMessage', 'The email you are trying to use is already taken. '));

					else{
						var newUser = new User();

						newUser.email = email;
						newUser.password = newUser.generateHash(password);

						newUser.save(function(err, user){
							if(err)
								throw err;
							return done(null, newUser, req.flash('signupMessage', 'You are successful signup! '));
						});
					}
				});


		});

	}));

	passport.use('local-login', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	}, function(req, email, password, done){

		User.findOne({'email' : email},function(err, user){
			if(err)
				return done(err);

			if(!user)
				return done(null, false, req.flash('loginMessage', 'Oops! We can not find that email. '));

			if(!user.validPassword(password))
				return done(null, false, req.flash('loginMessage', 'Wrong password! '));

			return done(null, user, req.flash('loginMessage', 'You are now logged in. '));

		});

	}));


	passport.use(new FacebookStrategy({
		clientID : configAuth.facebookAuth.clientID,
		clientSecret : configAuth.facebookAuth.clientSecret,
		callbackURL : configAuth.facebookAuth.callbackURL,
		profileFields: ['id', 'displayName', 'email']

	},

	function(token, refreshToken, profile, done){
		//console.log(profile);
		process.nextTick(function(){

			//find a user in the db with the facebook.id
			User.findOne({'facebook.id' : profile.id}, function(err, user){

				if(err)
					return done(err);
				//if user is found, log him in
				if(user){
					return done(null, user);
				}
				//user not found, create new one
				else{
					var newUser = new User();

					newUser.facebook.id = profile.id;
					newUser.facebook.token = token;
					newUser.facebook.name = profile.displayName;
					newUser.facebook.email = profile.emails[0].value;

					newUser.save(function(err){
						if(err)
							throw err;

						return done(null, newUser);
					});
				}
			});

		});
	}));

};
