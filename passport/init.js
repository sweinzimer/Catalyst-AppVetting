var login = require('./login');


var User = require('../models/userPackage');


module.exports = function(passport) {
	console.log("initializing passport");
	//serialize user for session
	passport.serializeUser(function(user,done) {
		console.log("serializing user");
		console.log(user);
		done(null, user._id);
		
	});
	
	//deserialize user
	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			console.log("deserializing");
			//console.log(user);
			done(err, user);
		});
	});
	
	
}


	
	