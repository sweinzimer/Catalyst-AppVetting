var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/userPackage');


module.export = function(passport) {
	
	//serialize user for session
	passport.serializeUser(function(user,done) {
		done(null, user.id);
		
	});
	
	//deserialize user
	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});
	
	//local signup configuration
	passport.use('local-signup', new LocalStrategy({
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true
	},
	
	function(req, email, password, done) {
		process.nextTick(function() {
			//determine if user already exists
			User.findOne({ 'local.email' : email}, function(err, user) {
				if(err)
					return done(err);
				if (user) {
					//user exists!
				}
				else {
					var newUser = new User();
					newUser.local.email = email;
					newUser.local.password = newUser.generateHash(password);
				
				    newUser.save(function(err)) {
						if(err)
							throw err;
						return done(null, newUser);
					}
				}
				});
				
				
				
				
			});
		}
	));
	
	
	
};