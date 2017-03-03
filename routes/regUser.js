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
	.get(isAdmin, api.getUserRoles, function(req, res) {
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
	.get(isAdmin, api.getUsers, function(req, res) {
		console.log(res.locals.results);
		res.json(res.locals);

});


router.route('/editUser')
	.get(isLoggedIn, function(req, res) {
		//do stuff
		//console.log(res.locals.results);
		var payload = {};

		payload = res.locals.user;
		payload.user_email = res.locals.user.user.contact_info.user_email;
		res.render('useredit', payload);



	})
	.post(isLoggedInPost, api.updateUser, function(req, res) {
		console.log("in update user route");
		//TODO: compare req.user_id to pk - confirm requesting user = user to be updated
		res.json(res.locals);
	})

router.route('/editUser/:id')
	.get(isAdmin, api.findUser, function(req,res) {
		var payload = {};
		payload = res.locals.results;
		payload.user_email = res.locals.email;
		console.log(payload);
		res.render('adminuseredit', payload);

	})
	.post(isAdmin, api.updateUser, function(req, res) {
		res.json(res.locals);
	})



router.route('/editUser/changePassword')
	.post(isLoggedInPost, api.updatePassword, function(req,res) {
		console.log("in change pass route");
		if(res.locals.status != '200'){
			res.status(500).send("Could not update password");
		}
		else{
			res.json(res.locals);
		}
	});

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

//route catches invalid post requests.
router.use('*', function route2(req, res, next) {
	if(res.locals.status == '406'){
		console.log("in error function");
		//do something to gracefully exit
        res.status(406).send("Current password not correct");

    }
});

return router;
//module.exports = router;
}
//check to see if user is logged in
function isLoggedIn(req, res, next) {
		if(req.isAuthenticated()) {
			console.log("In isloggedin");
			console.log(req.body);
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
								//format user data to send to front end
								results.user.salt = "";
								results.user.hash = "";
								var dobYear = results.user.contact_info.user_dob.dob_date.getFullYear();
								//get month and day with padding since they are 0 indexed
								var dobDay = ( "00" + results.user.contact_info.user_dob.dob_date.getDate()).slice(-2);
								var dobMon = ("00" + (results.user.contact_info.user_dob.dob_date.getMonth()+1)).slice(-2);
								results.user.contact_info.user_dob.dob_date = dobYear + "-" + dobMon + "-" + dobDay;
								res.locals.user = results;

								return next();

							}

							else {
								console.log("user is not active");
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

function isAdmin(req, res, next) {
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

/*function verifyUser(req, res, next) {
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
						//VERIFY USER PASSWORD....UPDATE VARIABLE
						if(results.user.validPassword(req.body.current_password)) {
							//current password is valid, continue to api
							return next();

						}
						else {
							//password is incorrect, route to error handler
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
}*/
