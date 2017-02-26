//routes the new user registration and handles post routes to the API
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = require('../mongoose/connection');
var api = require('../controllers/api');

var User = require('../models/userPackage');

var Promise = require('bluebird'); // Import promise engine
mongoose.Promise = require('bluebird'); // Tell mongoose we are using the Bluebird promise library
Promise.promisifyAll(mongoose); // Convert mongoose API to always return promises using Bluebird's promisifyAll

module.exports = function(passport) {
router.route('/register')
	.get(isLoggedIn, api.getUserRoles, function(req, res) {
		console.log(res.locals.results);
		var payload = {};
		payload.roles = res.locals.results.roles;
		payload.rolesString = JSON.stringify(res.locals.results.roles)
		payload.user_email = res.locals.email;
		res.render('newuserform', payload);
	})
	.post(isLoggedInPost, api.postUser, function(req, res) {
		console.log("In post request");
		res.json(res.locals);
	})

router.get('/userSuccess', function(req, res) {
	res.render('/');
});

router.route('/userList')
	.get(isLoggedIn, api.getUsers, function(req, res) {
		console.log(res.locals.results);
		res.json(res.locals);

});


router.route('/editUser')
	.get(isLoggedIn, api.findUser, function(req, res) {
		//do stuff
		console.log(res.locals.results);
		res.json(res.locals);
		
	})
	.post(isLoggedInPost, api.updateUser, function(req, res) {
		res.json(res.locals);
	})

router.route('/login')
	.get(function(req, res) {
		res.render('userloginform');
	})
	.post(passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/user/login',
		failureFlash: true})
	);

router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/user/login');
});

return router;
//module.exports = router;
}
//check to see if user is logged in and is an admin
function isLoggedIn(req, res, next) {
		if(req.isAuthenticated()) {
			console.log(req.user._id);
			var userID = req.user._id.toString();

			console.log("userID");
			console.log(userID);
			var ObjectId = require('mongodb').ObjectID;
			Promise.props({
				user: User.findOne({'_id' : ObjectId(userID)}).lean().execAsync()
			})
			.then(function (results) {
				console.log(results);

					if (!results) {
						res.redirect('/user/logout');
					}
					else {
						if(results.user.user_status == "ACTIVE") {
							if(results.user.user_role == "ADMIN") {
								res.locals.email = results.user.contact_info.user_email;
								return next();

							}

							else {
								console.log("user is not admin");
								res.redirect('/user/logout');
							}
						}
						else {
							//user not active
							console.log("user not active");
							res.redirect('/user/logout');
						}
					}



			})

		.catch(function(err) {
                console.error(err);
        })
         .catch(next);
		}
		else {
			console.log("no user id");
			res.redirect('/user/login');
		}
}

//post request authenticator.  Checks if user is an admin
function isLoggedInPost(req, res, next) {
		if(req.isAuthenticated()) {
			console.log(req.user._id);
			var userID = req.user._id.toString();

			var ObjectId = require('mongodb').ObjectID;

			Promise.props({
				user: User.findOne({'_id' : ObjectId(userID)}).lean().execAsync()
			})
			.then(function (results) {
				console.log(results);

					if (!results) {
						//user not found in db.  Route to error handler
						res.locals.status = 406;
						return next('route');
					}
					else {

						if(results.user.user_role == "ADMIN") {
							return next();

						}
						else {
							//user is not a vetting agent or admin, route to error handler
							res.locals.status = 406;
							return next('route');
						}
					}



			})

		.catch(function(err) {
                console.error(err);
        })
         .catch(next);
		}
		else {
			//user is not logged in
			console.log("no user id");
			res.locals.status = 406;
			return next('route');
		}
}
