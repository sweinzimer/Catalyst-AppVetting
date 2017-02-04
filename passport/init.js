var login = require('./login');
var register = require('./register');

var User = require('../models/userPackage');


module.exports = function(passport) {
	console.log("initializing passport");
	//serialize user for session
	passport.serializeUser(function(user,done) {
		console.log("serializing user");
		console.log(user);
		console.log("serial");
		//console.log(req.session.passport.user);
		done(null, user._id);
		
	});
	
	//deserialize user
	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			console.log("deserializing");
			console.log(user);
			done(err, user);
		});
	});
	
	
	//login(passport);
	//register(passport);
}


	
	