//routes the new user registration and handles post routes to the API
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = require('../mongoose/connection');
var api = require('../controllers/api');

router.route('/register')
	.get(function(req, res) {
		res.render('newuserform');
	})
	.post(api.postUser, function(req, res) {
		res.json(res.locals);
	})

router.get('/userSuccess', function(req, res) {
	res.render('userSuccess');
});

module.exports = router;
