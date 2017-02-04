var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//var mongoose = require('mongoose');
var User = require('../models/userPackage');


passport.use(new LocalStrategy({
	usernameField: 'email'
},

function(username, password, done) {
	User.findOne({ 'contact_info.user_email' : username}, function(err, user) {
		if (err)
		{return done(err);}
		if(!user) {
			console.log("user does not exist");
			return done(null, false, {message: 'User not found'});
		}
		
		if(!user.validPassword(password)) {
			console.log("wrong password");
			return done(null, false, {message: 'Wrong password'});
		}
		//credentials correct
		console.log("login successful!");
		console.log(user);
		return done(null, user);
	});
}


));


