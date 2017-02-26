/**
 * Most important note on this page. Currently this API function as middleware for an Express router.
 * Currently all functions are MIDDLEWARE in the Express app
 *      Middleware Docs:  https://expressjs.com/en/guide/using-middleware.html
 *      Inspiration:      https://medium.com/@jeffandersen/building-a-node-js-rest-api-with-express-46b0901f29b6#.6ttj8e6rs
 *                        https://medium.com/@jeffandersen/building-a-node-js-rest-api-with-express-part-two-9152661bf47#.4ofcnx1fv
 *
 * A more normal express function might look like this:
 *      router.get('/index', function(req, res) { ...do the magic }
 *
 * To use this API as middleware simply tacj the function between the route ('/index') and the function().
 *      router.get('/status', api.getDocumentByStatus, function(req, res) { ...do the magic }
 *
 * In this example getDocumentByStatus returns a JSON object
 *
 * They keep req, res, err, and next intact as they are passed around the route
 * It is best practice to store new variable in res.local.<your variable>
 */

/**
 * Import node modules and node exports
 * mongoose             - schemas, templates, queries
 * db                   - connection to the database server
 * DocumentPackage      - schema and model for DocumentPackage CRUD
 * HighlightPackage     - schema and model for HighlightPackage CRUD
 * VettingNotePackage   - schema and model for VettingNotePackage CRUD
 * bluebird             - converts mongoose API calls to ES6 promises
 *
 * Import any other required modules
 */


var mongoose = require('mongoose');
var db = require('../mongoose/connection');
var DocumentPackage = require('../models/documentPackage');
var HighlightPackage = require('../models/highlightPackage');
var VettingNotePackage = require('../models/vettingNotePackage');

var WorkItemPackage = require('../models/workItemPackage');
var UserPackage = require('../models/userPackage');
var RolePackage = require('../models/rolePackage');

var FinancialPackage = require('../models/finPackage');

var bluebird = require('bluebird');
var Promise = require('bluebird'); // Import promise engine
mongoose.Promise = require('bluebird'); // Tell mongoose to use bluebird
Promise.promisifyAll(mongoose); // Convert all of mongoose to promises with bluebird
var ObjectId = require('mongodb').ObjectId;
module.exports = {
    /**
     * Description: retrieve all Document Packages from the database
     * Type: GET
     * Params: none
     * Address: api.getAllDocuments
     * Returns: results[array of Document Packages]
     */
    getAllDocuments: function (req, res, next) {
        // Log what we are calling to the console
        console.log('[ API ] getAllDocuments :: Call invoked');

        // Create an object to be filled with promises. The object will look like:
        // .then(function (<name of object here>) {...})
        // If the name is results, use results.DocumentPackage[index].<what you need>
        // Obviously it will be an array of DocumentPackages in this example
        Promise.props({
            application: DocumentPackage.find().lean().execAsync(),
            count: DocumentPackage.find().count().execAsync()
        })
            .then(function (results) {
                // Save the results into res.locals
                res.locals.results = results;

                for (var i = 0, len = results.count; i < len; i++) {
                    console.log('[ API ] getAllDocuments :: Found document package with _id: ' + results.application[i]._id);
                }
                console.log('[ API ] getAllDocuments :: Document package count:', results.count);

                // If we are at this line all promises have executed and returned
                // Call next() to pass all of this glorious data to the next express router
                next();
            })
            .catch(function (err) {
                console.error(err);
            })
            .catch(next);
    },

    /**
     * Description: retrieve a DocumentPackage from the database by _id
     * Type: GET
     * Params: _id of Document Package
     * Address: api.getDocumentById
     * Returns: results object (mimics documentPackage.js)
     */
    getDocumentById: function (req, res, next) {
        // Log the api call we make along with the _id used by it
        console.log('[ API ] getDocumentById :: Call invoked with id: ' + req.params.id);

        // Use results.DocumentPackage.<whatever you need> to access the information
        Promise.props({
            document: DocumentPackage.findById(req.params.id).lean().execAsync()
        })
            .then(function(results) {
                if (!results) {
                    console.log('[ API ] getDocumentById :: Documents package found: FALSE');
                }
                else {
                    console.log('[ API ] getDocumentById :: Documents package found: TRUE');
                }

                res.locals.results = results;

                // If we are at this line all promises have executed and returned
                // Call next() to pass all of this glorious data to the next express router
                next();
            })
            .catch(function(err) {
                console.error(err);
            })
            .catch(next);
    },
	getUsers: function(req, res, next) {
		console.log("getting users");
		 Promise.props({
            users: UserPackage.find().lean().execAsync()
        })
            .then(function(results) {
                if (!results) {
                    console.log('No users found');
                }
                else {
                    console.log('users found');
					for(var x=0; x<results.users.length; x++) {
						results.users[x].salt = "";
						results.users[x].hash = "";
					}
					
                }

                res.locals.results = results;

                // If we are at this line all promises have executed and returned
                // Call next() to pass all of this glorious data to the next express router
                next();
            })
            .catch(function(err) {
                console.error(err);
            })
            .catch(next);
    },


	getUserRoles: function(req, res, next) {
		console.log("getting user roles");
		 Promise.props({
            roles: RolePackage.find().lean().execAsync()
        })
            .then(function(results) {
                if (!results) {
                    console.log('No roles found');
                }
                else {
                    console.log('roles found');
                }

                res.locals.results = results;

                // If we are at this line all promises have executed and returned
                // Call next() to pass all of this glorious data to the next express router
                next();
            })
            .catch(function(err) {
                console.error(err);
            })
            .catch(next);
    },
	
	findUser: function (req, res, next) {
        // Log the api call we make along with the _id used by it
        console.log('[ API ] finduser :: Call invoked with id:');
		req.body.id = ObjectId("588d02d4cc6b36283886be18");
        // Use results.DocumentPackage.<whatever you need> to access the information
        Promise.props({
            user: UserPackage.findById(req.body.id).lean().execAsync()
        })
            .then(function(results) {
                if (!results) {
                    console.log('[ API ] findUser :: user package found: FALSE');
                }
                else {
                    console.log('[ API ] findUser :: user package found: TRUE');
                }

                res.locals.results = results;

                // If we are at this line all promises have executed and returned
                // Call next() to pass all of this glorious data to the next express router
                next();
            })
            .catch(function(err) {
                console.error(err);
            })
            .catch(next);
    },


    /**
     * Description: retrieve all Document Packages from the database and group by status code
     * Type: GET
     * Params: none
     * Address: api.getDocumentByStatus
     * Returns: results.statuscode[array of Document Packages]
     * Notes: statuscode is defined as any property of Promise.props (ex: new, phone, assess)
     */
    getDocumentByStatus: function(req, res, next) {
        // Log the api call made to the console
        console.log('[ API ] getDocumentByStatus :: Call invoked');

        // Access the returned items as results.<status code>[array index].<what you need>
        // Example: results.visit[3].address.line_1 = a string
        Promise.props({
            new: DocumentPackage.find({status: "new"}).sort({'updated':-1}).lean().execAsync(),
            phone: DocumentPackage.find({status: "phone"}).lean().execAsync(),
            documents: DocumentPackage.find({status: "documents"}).lean().execAsync(),
            discuss: DocumentPackage.find({status: "discuss"}).lean().execAsync(),
            assess: DocumentPackage.find({status: "assess"}).lean().execAsync(),
            withdrawn: DocumentPackage.find({status: "withdrawn"}).lean().execAsync(),
            approval: DocumentPackage.find({status: "approval"}).lean().execAsync(),
            handle: DocumentPackage.find({status: "handle"}).lean().execAsync(),
            declined: DocumentPackage.find({status: "declined"}).sort({'updated':-1}).lean().execAsync(),
            project: DocumentPackage.find({status: "project"}).lean().execAsync()
        })
            .then(function (results) {
                if (!results) {
                    console.log('[ API ] getDocumentByStatus :: Documents package found: FALSE');
                }
                else {
                    console.log('[ API ] getDocumentByStatus :: Documents package found: TRUE');
                }
                res.locals.results = results;

                // If we are at this line all promises have executed and returned
                // Call next() to pass all of this glorious data to the next express router
                next();
            })
            .catch(function(err) {
                console.error(err);
            })
            .catch(next);
    },

    /**
     * Description: add a Document Package to the database
     * Type: POST
     * Params: none
     * Address: api.postDocument
     * Returns: HTML 200 status code
     */
    postDocument: function(req, res, next) {
        // Data will be submitted using req.body
        console.log('[ API ] postDocument :: Call invoked');
		console.log(req.body);
        // For debugging
        var debug = 0;
		//var app_name;
        if (debug == 1) {
            console.log(req.body);
        }
		Promise.props({
			docInSys: DocumentPackage.count({}).lean().execAsync()
		})
		.then(function (results) {
                if (!results) {
                    console.log('[ API ] count failed');
                }
                else {
                    console.log('[ API ] count sucuess');
					console.log(results);
					var count = results.docInSys;
					count++;
					console.log(count);
					var currentTime = new Date();
					var year = currentTime.getFullYear();
					var app_name = "A" + year.toString() + "-" + count.toString();
					console.log(app_name);
					// Normally we would create a new mongoose object to be instantiated
					// var doc = new DocumentPackage();
					// And then add data to it
					// doc.status = 'a string here';
					// doc.application.name.first = 'name here'

					// Instead we will do it in one line
					var doc = new DocumentPackage(req.body);

					// Create a corresponding highlight package
					var highlight = new HighlightPackage();

					// Make each reference the others ObectId
					// TODO: Add support for work items and site assessment
					doc.highlightPackage = highlight._id;
					doc.app_name = app_name;
					console.log(doc.app_name);
					highlight.documentPackage = doc._id;
					
					var finance = new FinancialPackage();
					finance.appID = doc._id;
					finance.name.first = req.body.application.name.first;
					console.log("fin first");
					console.log(finance.name.first);
					finance.name.last = req.body.application.name.last;

					// Save the document package to the database with a callback to handle flow control
					doc.saveAsync(function (err, doc, numAffected) {
						if (err) {
							console.error(err);
						}
						else if (numAffected == 1) {
							console.log('[ API ] postDocument :: Document created with _id: ' + doc._id);
						}
					});

					// Save the highlight package to the database with a callback to handle flow control
					highlight.saveAsync(function (err, highlight, numAffected) {
						if (err) {
							console.error(err);
						}
						else if (numAffected == 1) {
							console.log('[ API ] postDocument :: highlightPackage created with _id: ' + highlight._id);
							console.log('[ API ] postDocument :: highlightPackage references document package _id: ' + highlight.reference);
							//res.send( { status : 200 } );
						}
					});
					           
		
					finance.saveAsync(function (err, highlight, numAffected) {
						if (err) {
							console.error(err);
						}
						else if (numAffected == 1) {
							console.log('[ API ] postDocument :: finPackage created with _id: ' + finance._id);
							console.log('[ API ] postDocument :: highlightPackage references document package _id: ' + finance.appID);
							res.send( { status : 200 } );
						}
					});
		
				}

				

            })
            .catch(function(err) {
                console.error(err);
            })
            .catch(next);

    },

    /**
     * Description: update a name:value pair in a Document Package
     * Type: PUT
     * Params: _id, name, value
     * Address: api.putUpdateDocument
     * Returns: results as modified Document Package
     */
    putUpdateDocument: function(req, res, next) {
        // When executed this will apply updates to a doc and return the MODIFIED doc

        // Log the _id, name, and value that are passed to the function
        console.log('[ API ] putUpdateDocument :: Call invoked with _id: ' + req.params.id
            + ' | key: ' + req.body.name + ' | value: ' + req.body.value);
        console.log(req.body.name + ' + ' + req.body.value);

        // Build the name:value pairs to be updated
        // Since there is only one name and one value, we can use the method below
        var updates = {};
        updates[req.body.name] = req.body.value;
        // Record Update time
        //filters
        var conditions = {};
        conditions['_id'] = mongoose.Types.ObjectId(req.params.id);
        console.log("Search Filter:");
        console.log(conditions);
        console.log("Update:");
        updates['updated'] = Date.now();
        console.log(updates);

        Promise.props({
            doc: DocumentPackage.findOneAndUpdate(
                // Condition
                conditions,
                // Updates
                {
                    // $set: {name: value}
                    $set: updates
                },
                // Options
                {
                    // new - defaults to false, returns the modified document when true, or the original when false
                    new: true,
                    // runValidators - defaults to false, make sure the data fits the model before applying the update
                    runValidators: true
                }
                // Callback if needed
                // { }
            ).execAsync()
        })
            .then(function (results) {
                // TODO: Confirm true/false is correct
                if (results) {
                    console.log('[ API ] putUpdateDocument :: Documents package found: TRUE');
                }
                else {
                    console.log('[ API ] putUpdateDocument :: Documents package found: FALSE');
                }
                res.locals.results = results;
                //sending a status of 200 for now
                res.locals.status = '200';

                // If we are at this line all promises have executed and returned
                // Call next() to pass all of this glorious data to the next express router
                next();
            })
            .catch(function (err) {
                console.error(err);
            })
            .catch(next);
    },

	postUser: function(req, res, next) {
        // Data will be submitted using req.body
        console.log('[ API ] postUser :: Call invoked');
		console.log(req.body);
        // For debugging
        var debug = 0;
        if (debug == 1) {
            console.log(req.body);
        }

        //create new mongoose object
        var doc = new UserPackage(req.body);
		doc.setPassword(req.body.password);



        
        

        // Save the user package to the database with a callback to handle flow control
        doc.saveAsync(function (err, doc, numAffected) {
            if (err) {
                console.error(err);
            }
            else if (numAffected == 1) {
                console.log('[ API ] postUser :: User Created with ID: ' + doc._id);
				res.send( { status : 200 } );
            }
        });

    },

	updateUser: function(req, res, next) {
        // When executed this will apply updates to a user and return the MODIFIED user
        // Log the _id, name, and value that are passed to the function
        console.log('[ API ] updateUser :: Call invoked with _id: ' + req.body.userId
            + ' | key: ' + req.body.name + ' | value: ' + req.body.value);
        console.log(req.body.name + ' + ' + req.body.value);

        // Build the name:value pairs to be updated
        // Since there is only one name and one value, we can use the method below
        var updates = {};
        updates[req.body.name] = req.body.value;


		// Record Update time
        //filters
        var conditions = {};
        conditions['_id'] = req.body.userId;
        console.log("Search Filter:");
        console.log(conditions);
        console.log("Update:");
        updates['updated'] = Date.now();
        console.log(updates);

        Promise.props({
            user: UserPackage.findOneAndUpdate(
                // Condition
                conditions,
                // Updates
                {
                    // $set: {name: value}
                    $set: updates
                },
                // Options
                {
                    // new - defaults to false, returns the modified document when true, or the original when false
                    new: true,
                    // runValidators - defaults to false, make sure the data fits the model before applying the update
                    runValidators: true
                }
                // Callback if needed
                // { }
            ).execAsync()
        })
            .then(function (results) {
				console.log(results);
                // TODO: Confirm true/false is correct
                if (results) {
                    console.log('[ API ] putUpdateDocument :: Documents package found: TRUE');
                }
                else {
                    console.log('[ API ] putUpdateDocument :: Documents package found: FALSE');
                }
                res.locals.results = results;
                //sending a status of 200 for now
                res.locals.status = '200';

                // If we are at this line all promises have executed and returned
                // Call next() to pass all of this glorious data to the next express router
                next();
            })
            .catch(function (err) {
                console.error(err);
            })
            .catch(next);
    },

	//create user roles on initial site deployment
	createRoles: function(req, res, next) {
		var vet = new RolePackage();
		vet.role_name = "VET";
		vet.role_display = "Vetting Agent";

		var site = new RolePackage();
		site.role_name = "SITE";
		site.role_display = "Site Agent";

		var admin = new RolePackage();
		admin.role_name = "ADMIN";
		admin.role_display = "Admin";

		vet.saveAsync(function (err, doc, numAffected) {
            if (err) {
                console.error(err);
            }
            else if (numAffected == 1) {

                console.log('[ API ] role vet created');
				//res.send( { status : 200 } );
            }
        });


		site.saveAsync(function (err, doc, numAffected) {
            if (err) {
                console.error(err);
            }
            else if (numAffected == 1) {
                console.log('[ API ] role site created');
				//res.send( { status : 200 } );
            }
        });

		admin.saveAsync(function (err, doc, numAffected) {
            if (err) {
                console.error(err);
            }
            else if (numAffected == 1) {
                console.log('[ API ] role admin created');
				next();
            }
        });
	},

	updateService: function(req, res, next) {
        // When executed this will apply updates to a doc and return the MODIFIED doc

        // Log the _id, name, and value that are passed to the function
        console.log('[ API ] updateService :: Call invoked with _id: ' + req.body.appId
            + ' | key: ' + req.body.name + ' | value: ' + req.body.value);
        console.log(req.body.name + ' + ' + req.body.value);

        // Build the name:value pairs to be updated
        // Since there is only one name and one value, we can use the method below
        var updates = {};
		updates.service_area = req.body.value;

		//if out of service area, change status to "on hold, pending discussion"
		if(req.body.value == false) {
			updates.status = "discuss";
		}

		// Record Update time
        //filters
        var conditions = {};
        conditions['_id'] = req.body.appId;
        console.log("Search Filter:");
        console.log(conditions);
        console.log("Update:");
        updates['updated'] = Date.now();
        console.log(updates);

        Promise.props({
            doc: DocumentPackage.findOneAndUpdate(
                // Condition
                conditions,
                // Updates
                {
                    // $set: {name: value}
                    $set: updates
                },
                // Options
                {
                    // new - defaults to false, returns the modified document when true, or the original when false
                    new: true,
                    // runValidators - defaults to false, make sure the data fits the model before applying the update
                    runValidators: true
                }
                // Callback if needed
                // { }
            ).execAsync()
        })
            .then(function (results) {
				console.log(results);
                // TODO: Confirm true/false is correct
                if (results) {
                    console.log('[ API ] putUpdateDocument :: Documents package found: TRUE');
                }
                else {
                    console.log('[ API ] putUpdateDocument :: Documents package found: FALSE');
                }
                res.locals.results = results;
                //sending a status of 200 for now
                res.locals.status = '200';

                // If we are at this line all promises have executed and returned
                // Call next() to pass all of this glorious data to the next express router
                next();
            })
            .catch(function (err) {
                console.error(err);
            })
            .catch(next);
    },
    /**
     * Description: add a vetting note to the database
     * Type: POST
     * Params: none
     * Address: api.postVettingNote
     * Returns: _id of newly created Vetting Note
     */
    postVettingNote: function(req, res, next) {
        console.log('[ API ] postVettingNote :: call invoked');
		console.log(req.body);
		var userID = req.body.user.toString();
		Promise.props({
            user: UserPackage.findOne({'_id' : ObjectId(userID)}).lean().execAsync()
        })
            .then(function(results) {
				console.log(results);
                if (!results) {
                    console.log('[ API ] postVettingNote :: User package found: FALSE');
                }
                else {
                    console.log('[ API ] postVettingNote :: User package found: TRUE');
					var note = new VettingNotePackage(req.body);
					var firstName = results.user.contact_info.user_name.user_first;
					console.log('first name');
					console.log(firstName);
					note.vetAgent = results.user.contact_info.user_name.user_first + " " + results.user.contact_info.user_name.user_last;
					console.log(note.vetAgent);

					note.saveAsync(function (err, note, numAffected) {
						if (err) {
							console.error(err);
						}
						else if (numAffected == 1) {
							console.log('[ API ] postVettingNote :: Note created with _id: ' + note._id);
							//send note ID so it can be referenced without page refresh
							res.send( { status : 200, noteId: note._id, vetAgent: note.vetAgent } );
						}
					})



				}
			})
            .catch(function(err) {
                console.error(err);
            })
            .catch(next);


    },

	//post new work item
	addWorkItem: function(req, res, next) {
        console.log('[ API ] addWorkItem :: Call invoked');
		console.log(req.body);
        var item = new WorkItemPackage(req.body);

        item.saveAsync(function (err, note, numAffected) {
            if (err) {
                console.error(err);
            }
            else if (numAffected == 1) {
				console.log("saved!");
                console.log('[ API ] add Work Item :: Note created with _id: ' + item._id);
                //send note ID so it can be referenced without page refresh
                res.send( { status : 200, itemId: item._id } );
            }
        });

    },

    /**
     * Description: remove a vetting note from the database
     * Type: POST
     * Params: _id of Vetting Note
     * Address: api.removeVettingNote
     * Returns: confirmation of delete
     */
    removeVettingNote: function(req, res, next) {
        console.log('[ API ] removeVettingNote :: Call invoked');
		//console.log(req.locals.status);
        Promise.props({
            note: VettingNotePackage.remove(
                {
                    _id: req.body.noteId
                }
            ).execAsync()
        })
        .then(function (results) {
            if (results) {
                console.log('[ API ] removeVettingNote :: Note found: TRUE');
                res.locals.results = results;
                //sending a status of 200 for now
                res.locals.status = '200';
            }
            else {
                console.log('[ API ] removeVettingNote :: Note found: FALSE');
            }
            next();
        })
        .catch(function (err) {
            console.error(err);
        });
    },

	//delete work item
	deleteWorkItem: function(req, res, next) {
        console.log('[ API ] deleteWorkItem :: Call invoked');
		console.log(req.body)
        Promise.props({
            note: WorkItemPackage.remove(
                {
                    _id: req.body.itemId
                }
            ).execAsync()
        })
        .then(function (results) {
            if (results) {
                console.log('[ API ] deleteWorkItem :: Note found: TRUE');
                res.locals.results = results;
                //sending a status of 200 for now
                res.locals.status = '200';
            }
            else {
                console.log('[ API ] removeVettingNote :: Note found: FALSE');
            }
            next();
        })
        .catch(function (err) {
            console.error(err);
        });
    },
    /**
     * Description: update or edit a Vetting Note
     * Type: POST
     * Params: _id, name, value
     * Address: api.updateVettingNote
     * Returns: results as an updated Vetting Note
     */
    updateVettingNote: function(req, res, next) {
        // Log the _id, name, and value that are passed to the function
        console.log('[ API ] updateVettingNote :: Call invoked with note _id: ' + req.body.id
            + ' | description: ' + req.body.description);

        var updates = {};
        updates.description = req.body.description;

        //filters
        var conditions = {};
        conditions['_id'] = req.body.id;
        console.log("Search Filter:");
        console.log(conditions);
        console.log("Update:");
        console.log(updates);

        Promise.props({
            note: VettingNotePackage.findOneAndUpdate(
                // Condition
                conditions,
                // Updates
                {
                    // $set: {name: value}
                    $set: updates
                },
                // Options
                {
                    // new - defaults to false, returns the modified document when true, or the original when false
                    new: true,
                    // runValidators - defaults to false, make sure the data fits the model before applying the update
                    runValidators: true
                }
                // Callback if needed
                // { }
            ).execAsync()
        })
            .then(function (results) {
                console.log(results);
                if (results.note != null) {
                    console.log('[ API ] updateVettingNote :: Note found: TRUE');
                    res.locals.status = '200';
                }
                else {
                    console.log('[ API ] updateVettingNote :: Note found: FALSE');
                    res.locals.status = '500';
                }
                res.locals.results = results;

                // If we are at this line all promises have executed and returned
                // Call next() to pass all of this glorious data to the next express router
                next();
            })
            .catch(function (err) {
                console.error(err);
            })
            .catch(next);
    },



	updateWorkItem: function(req, res, next) {
        // Log the _id, name, and value that are passed to the function
        console.log('[ API ] WorkItem :: Call invoked with item _id: ' + req.body.id
            + ' | description: ' + req.body.description);

        var updates = {};
        updates.description = req.body.description;
		updates.cost = req.body.cost;
		updates.vettingComments = req.body.vettingComments;

        //filters
        var conditions = {};
        conditions['_id'] = req.body.id;
        console.log("Search Filter:");
        console.log(conditions);
        console.log("Update:");
        console.log(updates);

        Promise.props({
            item: WorkItemPackage.findOneAndUpdate(
			 // Condition
                conditions,
                // Updates
                {
					$set: updates
                },
                // Options
                {
                    // new - defaults to false, returns the modified document when true, or the original when false
                    new: true,
                    // runValidators - defaults to false, make sure the data fits the model before applying the update
                    runValidators: true
                }
                // Callback if needed
                // { }
            ).execAsync()
        })
            .then(function (results) {

                console.log(results);
                if (results.item != null) {
                    console.log('[ API ] updateWorkItem :: Note found: TRUE');
                    res.locals.status = '200';
                }
                else {
                    console.log('[ API ] updateWorkItem :: Note found: FALSE');
                    res.locals.status = '500';
                }
                res.locals.results = results;
				  // If we are at this line all promises have executed and returned
                // Call next() to pass all of this glorious data to the next express router
                next();
            })
            .catch(function (err) {
                console.error(err);
            })

            .catch(next);
				
					
		
	},			

	//update financial package
	updateFinance: function(req, res, next) {
        // When executed this will apply updates to a doc and return the MODIFIED doc

        // Log the _id, name, and value that are passed to the function
        console.log('[ API ] updateFinance :: Call invoked with _id: ');
        console.log(req.body);
		

        // Build the name:value pairs to be updated
        
        var updates = {};
		res.locals.status = '200';
		next();
		/*updates.GETNAME = req.body.NAME;
		
		
		
		// Record Update 
        //filters
        var conditions = {};
        conditions['_id'] = req.body.FINPACKAGEID;
        console.log("Search Filter:");
        console.log(conditions);
        console.log("Update:");
        updates['updated'] = Date.now();
        console.log(updates);

        Promise.props({
            fin: finPackage.findOneAndUpdate(
>>>>>>> fin_schema
               
<<<<<<< HEAD
                    // $set: {name: value}
=======
                    // $set: {name: VALUE}
>>>>>>> fin_schema
                    $set: updates
                },
                // Options
                {
                    // new - defaults to false, returns the modified document when true, or the original when false
                    new: true,
                    // runValidators - defaults to false, make sure the data fits the model before applying the update
                    runValidators: true
                }
                // Callback if needed
                // { }
            ).execAsync()
        })
            .then(function (results) {
<<<<<<< HEAD
                console.log(results);
                if (results.item != null) {
                    console.log('[ API ] updateWorkItem :: Note found: TRUE');
                    res.locals.status = '200';
                }
                else {
                    console.log('[ API ] updateWorkItem :: Note found: FALSE');
                    res.locals.status = '500';
                }
                res.locals.results = results;
=======
				console.log(results);
                
                if (results) {
                    console.log('[ API ] updateFinance :: Fin package found: TRUE');
                }
                else {
                    console.log('[ API ] updateFinance :: Fin package found: FALSE');
                }
                res.locals.results = results;
                //sending a status of 200 for now
                res.locals.status = '200';
>>>>>>> fin_schema

              
=======
            .catch(next);*/

    },
    /**
     * Description: retrieve a Highlight Package from the database by id
     * Type: GET
     * Params: _id
     * Address: api.getHighlightsById
     * Returns: results as a Highlight Package
     */
    getHighlightsById: function(req, res, next) {
        console.log('[ API ] getHighlightsById :: Call invoked with highlight package _id: ' + req.params.id);
        Promise.props({
            highlight: HighlightPackage.findById(req.params.id).lean().execAsync()
        })
            .then(function(results) {
                if (!results) {
                    console.log('[ API ] getHighlightsById :: Highlight package found: FALSE');
                }
                else {
                    console.log('[ API ] getHighlightsById :: Highlight package found: TRUE');
                }

                res.locals.results = results;

                // If we are at this line all promises have executed and returned
                // Call next() to pass all of this glorious data to the next express router
                next();
            })
            .catch(function(err) {
                console.error(err);
            })
            .catch(next);
    },

    /**
     * Description: invert a boolean value in a Highlight Package
     * Type: GET
     * Params: _id
     * Address: api.toggleHighlight
     * Returns: results as updated Highlight Package
     */
    toggleHighlight: function(req, res, next) {
        console.log('[ API ] toggleHighlight :: Call invoked with highlightPackage _id: %s | name: %s | value: %s',
            req.params.id, req.body.name, req.body.value);
        // Confirm a JSON {key:value} pair was sent
        if (req.accepts('application/json')) {
            var fetchDocument = Promise.props({
                highlight: HighlightPackage.findById(req.params.id).lean().execAsync()
            })
                .then(function (results) {
                    if (!results) {
                        console.log('[ API ] toggleHighlight :: Highlight package found: FALSE');
                    }
                    else {
                        console.log('[ API ] toggleHighlight :: Highlight package found: TRUE');
                    }

                    // Build the name:value pairs to be updated
                    // Since there is only one name and one value, we can use the method below
                    var updates = {};
                    // updates[req.body.name] = req.body.value;

                    var str = req.body.name;
                    var str_split = str.split('.');
                    var length = str_split.length;

                    if (length == 1) {
                        console.log(results.highlight[ str_split[0] ]);
                        if (results.highlight[str_split[0]] === true) {
                            updates[req.body.name] = false;
                        }
                        if (results.highlight[str_split[0]] === false) {
                            updates[req.body.name] = true;
                        }
                    }
                    if (length == 2) {
                        if (results.highlight[ str_split[0] ][ str_split[1] ] === true) {
                            updates[req.body.name] = false;
                        }
                        if (results.highlight[ str_split[0] ][ str_split[1] ] === false) {
                            updates[req.body.name] = true;
                        }
                    }

                    // Record Update time
                    updates['updated'] = Date.now();
                    console.log("[ API ] toggleHighlight :: Items to update: ", updates);

                    // Build variables and attach to the returned query results
                    results.id = req.params.id;
                    results.name = req.body.name;
                    // results.value = req.body.value;
                    results.updates = updates;

                    return results;
                })
                .catch(function (err) {
                    console.error(err);
                })
                .catch(next);

            fetchDocument.then(function(results) {
                Promise.props({
                    highlight: HighlightPackage.findOneAndUpdate(
                        // Condition
                        {_id: results.id},
                        // Updates
                        {
                            $set: results.updates
                        },
                        // Options
                        {
                            // new - defaults to false, returns the modified document when true, or the original when false
                            new: true,
                            // runValidators - defaults to false, make sure the data fits the model before applying the update
                            runValidators: true
                        }
                    ).execAsync()

                })
                    .then(function(results){
                        if (!results) {
                            console.log('[ API ] toggleHighlight :: Highlight package updated: FALSE');

                        }
                        else {
                            console.log('[ API ] toggleHighlight :: Highlight package updated: TRUE');
                            res.locals.results = results;
                            //sending a status of 200 for now
                            res.locals.status = '200';
                        }
                        next();
                    })
                    .catch(function (err) {
                        console.error(err);
                    })
                    .catch(next);
            })
        }
    },

    /**
     * Description: update a name:value pair in an array in a Document Package
     * Type: PUT
     * Params: _id, name, value, index
     * Address: api.putUpdateArray
     * Returns: results as modified Document Package
     */
    putUpdateArray: function(req, res, next) {
        // Log the _id, name, and value that are passed to the function
        console.log('[ API ] putUpdateArray :: Call invoked with _id: ' + req.params.id
            + ' | key: ' + req.body.name + ' | value: ' + req.body.value + ' | current value: ' + req.body.pk);
        //the $ holds the index of the element
        var updateField = req.body.name + ".$";
        var updates = {};
        updates[updateField] = req.body.value;
        // Record Update time
        updates['updated'] = Date.now();
        //filters
        var conditions = {};
        conditions['_id'] = req.params.id;
        conditions[req.body.name] = req.body.pk;
        console.log("Search Filter:");
        console.log(conditions);
        console.log("Update:");
        console.log(updates);

        Promise.props({
            doc: DocumentPackage.findOneAndUpdate(
                // Condition
                conditions,
                // Updates
                {
                    // $set: {name: value}
                    $set: updates
                },
                // Options
                {
                    // new - defaults to false, returns the modified document when true, or the original when false
                    new: true,
                    // runValidators - defaults to false, make sure the data fits the model before applying the update
                    runValidators: true
                }
                // Callback if needed
                // { }
            ).execAsync()
        })
            .then(function (results) {
                console.log(results);
                if (results.doc != null) {
                    console.log('[ API ] putUpdateArray :: Documents package found: TRUE');
                    res.locals.status = '200';
                }
                else {
                    console.log('[ API ] putUpdateArray :: Documents package found: FALSE');
                    res.locals.status = '500';
                }
                res.locals.results = results;

                // If we are at this line all promises have executed and returned
                // Call next() to pass all of this glorious data to the next express router
                next();
            })
            .catch(function (err) {
                console.error(err);
            })
            .catch(next);
    },
};
