var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = require('../mongoose/connection');
var DocumentPackage = require('../models/documentPackage');
var highlightPackage = require('../models/highlightPackage');
var VettingNotePackage = require('../models/vettingNotePackage');
var api = require('../controllers/api');


var Promise = require('bluebird'); // Import promise engine
mongoose.Promise = require('bluebird'); // Tell mongoose we are using the Bluebird promise library
Promise.promisifyAll(mongoose); // Convert mongoose API to always return promises using Bluebird's promisifyAll

// Helper query functions

//Need ObjectID to search by ObjectID
var ObjectId = require('mongodb').ObjectID;

/* Route to specific application by Object ID */
router.get('/:id', function(req, res) {
    //Checking what's in params
    console.log("Vetting Worksheet for " + ObjectId(req.params.id));

    /* search by _id. */
    Promise.props({
        doc: DocumentPackage.findOne({_id: ObjectId(req.params.id)}).lean().execAsync(),
        vettingNotes: VettingNotePackage.find({applicationId: ObjectId(req.params.id)}).lean().execAsync(),
		highlight: highlightPackage.findOne({"documentPackage": ObjectId(req.params.id)}).lean().execAsync()
    })
        .then(function(result) {
            //format birth date for display
            if(result.doc.application.dob.date != null) {
                var dobYear = result.doc.application.dob.date.getFullYear();
                //get month and day with padding since they are 0 indexed
                var dobDay = ( "00" + result.doc.application.dob.date.getDate()).slice(-2);
                var dobMon = ("00" + (result.doc.application.dob.date.getMonth()+1)).slice(-2);

                result.doc.application.dob.date = dobYear + "-" + dobMon + "-" + dobDay;
            }

            // format vetting notes dates
            if(result.vettingNotes.length != 0)
            {
                result.vettingNotes.forEach(function(note, index){
                    var Year = note.date.getFullYear();
                    //get month and day with padding since they are 0 indexed
                    var Day = ( "00" + note.date.getDate()).slice(-2);
                    var Mon = ("00" + (note.date.getMonth()+1)).slice(-2);
                    result.vettingNotes[index].date = Mon + "/" + Day + "/" + Year;
                });
            }
            res.locals.layout = 'b3-layout';

            result.title = "Vetting Worksheet";

            res.render('b3-worksheet-view', result);
        })
        .catch(function(err) {
            console.error(err);
        });

});

module.exports = router;

