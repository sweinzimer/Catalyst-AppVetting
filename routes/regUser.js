//routes the new user registration and handles post routes to the API
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = require('../mongoose/connection');
var api = require('../controllers/api');

module.exports = function(passport) {
router.route('/register')
	.get(function(req, res) {
		res.render('newuserform');
	})
	.post(api.postUser, function(req, res) {
		console.log("In post request");
		res.json(res.locals);
	})
	
router.get('/userSuccess', function(req, res) {
	res.render('/');
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

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect('/user/login');
}

return router;
//module.exports = router;
}