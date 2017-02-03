/*var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/userPackage');

module.exports = function(passport) {
	
console.log("in register.js");


//local signup configuration
	passport.use('register', new LocalStrategy({
		//console.log("in passport use");
		console.log(req.body);
		usernameField : 'req.body.local.email',
		passwordField : 'req.body.local.password',
		passReqToCallback : true
	},
	//console.log("in passport register");
	function(req, username, password, done) {
		process.nextTick(function() {
			console.log("in passport signup");
			console.log(req.body);
			//determine if user already exists
			User.findOne({ 'local.email' : req.body.local.email}, function(err, user) {
				if(err)
					return done(err);
				if (user) {
					//user exists!
					console.log("user exists");
					return done(null, false, req.flash('message', 'User exists'));
				}
				else {
					var newUser = new User();
					newUser.local.email = req.body.local.email;
					newUser.local.password = newUser.generateHash(req.body.local.password);
				
				    newUser.save(function(err) {
						if(err)
							throw err;
						console.log('registration success');
						return done(null, newUser);
					});
				}
				});
				
				
				
				
			});
		}
	));
	
	
	
};
*/