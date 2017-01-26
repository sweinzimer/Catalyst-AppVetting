//This file routes our application and handles post routes to the API
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = require('../mongoose/connection');
var api = require('../controllers/api');

router.route('/add') 
    .get(function(req, res) {
        res.render('applicationform');
    })
    .post(api.postDocument, function(req, res) {
        res.json(res.locals);
    })

router.get('/success', function(req, res) {
    //render the success page
    res.render('applicationsuccess');
});

/* GET ALL DOCUMENTS AND PRINT TO CONSOLE */
/* BONUS HANDLEBARS TEMPLATE EXAMPLE */
router.get('/show', function(req, res) {
    // Static list is passed and referenced in rest-list.hbs
    var staticList = { restname: ['mcdonald', 'burger king', 'subway'] };

    // Load in the application model
    var query = Application.find({}, function(err, docs) {
        if (err) throw err;
        console.log(docs);
        return docs;
    });

    res.render('rest-list', staticList);
});

/* GET ALL DOCUMENTS AND RETURN A JSON FILE */
router.get('/show-all', function(req, res) {
    Application.find(function(err, docs) {
        if (err)
            res.send(err);
        res.json(docs);
    });
});

/* USING HELP QUERY FROM /mongoose/query-helpers.js */
/* THIS EXAMPLE SEARCHES BY LAST NAME */
/* Last names in DB: fitzpatrick, washington, west */
router.get('/helper-last-name', function(req, res) {
    Application.findLastName("West", function(err, docs) {
        if (err) console.error(err);
        console.log(docs);
        res.json(docs);
    })
});

/* INSERT */
router.post('/insert_user', function(req, res) {
    // get the db instance
    var db = req.db;

    // get POST values from html page
    var building = req.body.a_building;
    var coord1 = req.body.a_coord_1;
    var coord2 = req.body.a_coord_2;
    var street = req.body.a_street;
    var zip = req.body.a_zip;
    var borough = req.body.borough;
    var cuisine = req.body.cuisine;
    var name = req.body.name;
    var restid = req.body.restaurant_id;

    console.log('POST VALUES: ' + '\n' + building + '\n' + coord1 + '\n' + coord2
        + '\n' + street + '\n' + zip + '\n' + borough + '\n' + cuisine + '\n' +
        name  + '\n' + restid + '\n');

    res.send("Insert a new rest (C)");
});

module.exports = router;
