var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = require('../mongoose/connection');
var DocumentPackage = require('../models/documentPackage');
var HighlightPackage = require('../models/highlightPackage');
var VettingNotePackage = require('../models/vettingNotePackage');
var api = require('../controllers/api');
var User = require('../models/userPackage');
var config = require('../config')

var Promise = require('bluebird'); // Import promise engine
mongoose.Promise = require('bluebird'); // Tell mongoose we are using the Bluebird promise library
Promise.promisifyAll(mongoose); // Convert mongoose API to always return promises using Bluebird's promisifyAll

// Helper query functions

//Need ObjectID to search by ObjectID
var ObjectId = require('mongodb').ObjectID;

module.exports = function(passport) {
/**
 * This Router handles GET Requests for viewing the vetting home page and specific application pages
 *
 * It also handles the POST requests for adding/updating vetting notes
 *
 * Status codes from models/DocumentPackage.js
     Codes needed are:
     Code - description
     new - new document package, has yet to be reviewed
     phone - document package has been seen, internal agent needs to contact client and verify document package information
     documents - additional documents are needed from the client before document package can proceed
     discuss - internal discussion needs to take place to determine if the document package is approved, denied, handle-it, or other
     visit - a member of catalyst must visit the property to determine the extent of repairs needed
     approval - awaiting the green light to go ahead as a project
     handle - the document package is forwarded to the handle-it team to be completed
     declined - the document package was declined for various reasons
     project - the project has been approved and the document package will be converted to a project package
 **/


router.post('/csvExport', function(req, res){
	var applicationID = req.body.application;
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var query =  "{'_id' : ObjectId("+"'"+applicationID+"'"+")}";
	var filename = lastname + ', ' + firstname + ' - ' + applicationID;
	const execFile = require('child_process').execFile;
	const exec = require('child_process').exec;
	const mongoexport_child = execFile('mongoexport', ['-d', 'catalyst',
	'-c', 'documentpackages', '--type=csv', '--fields', 	'application.name.first,application.name.last,application.address.line_1,application.address.line_2,application.address.city,application.address.state,application.address.zip,application.phone.preferred,application.phone.other,finance.mortgage.up_to_date,application.owns_home', 		'-q', query, '-o', 'public/exports/'+filename+'.csv', '--port', config.mongo.port],
	function(error, stdout, stderr) {
		if(error){
			console.error('stderr', stderr);
			throw error;
		}
		else{
			console.log('stdout', stdout);
		}
	});

	mongoexport_child.on('exit', function(code,signal){

		const rename_child = exec('cd public/exports; var="First Name,Last Name,Address Line 1,Address Line 2,City,State,Zip,Phone,Phone Other,Up to Date on Mortgage,Owns Home "; sed -i "1s/.*/$var/" ' + "'" + filename + '.csv' + "'",
			function(error, stdout, stderr){
					if(error){
						console.error('stderr', stderr);
						throw error;
					}
					else{
						console.log('stdout', stdout);
					}
		})

	rename_child.on('exit', function(code,signal){
		if(code !== 0){
			res.status(500).send("Export failed: Code 500");
			debugger
		}
		else{
			res.status(200).send({status: 'success'});
		}
	})



	});



})


router.get('/', api.getDocumentByStatus, function(req, res, next) {

    var payload = {};

    if (res.locals.results.new[0] == null) {
        console.log('[ ROUTER ] /view/status :: Unable to find Document Packages with status: \'new\'');
    } else {
        res.locals.results.new.forEach(function (element) {
            element = formatElement(element);
        });
    }
    payload.new = res.locals.results.new;

    //put declined and withdrawn in the same bucket
    payload.unapproved = [];

    if (res.locals.results.declined[0] == null) {
        console.log('[ ROUTER ] /view/status :: Unable to find Document Packages with status: \'declined\'');
    } else {
        res.locals.results.declined.forEach(function (element) {
            element = formatElement(element);
            payload.unapproved.push(element);
        });
    }

    if (res.locals.results.withdrawn[0] == null) {
        console.log('[ ROUTER ] /view/status :: Unable to find Document Packages with status: \'withdrawn\'');
    } else {
        res.locals.results.withdrawn.forEach(function (element) {
            element = formatElement(element);
            payload.unapproved.push(element);
        });
    }

    //add all other existing statuses to processing array
    payload.processing = [];

    if (res.locals.results.phone[0] == null) {
        console.log('[ ROUTER ] /view/status :: Unable to find Document Packages with status: \'phone\'');
    } else {
        //need to grab each element and push into the 'processing' array
        res.locals.results.phone.forEach(function (element) {
            element = formatElement(element);
            payload.processing.push(element);
        });
    }

    if (res.locals.results.handle[0] == null) {
        console.log('[ ROUTER ] /view/status :: Unable to find Document Packages with status: \'handle\'');
    } else {
        res.locals.results.handle.forEach(function (element) {
            element = formatElement(element);
            payload.processing.push(element);
        });
    }

    if (res.locals.results.documents[0] == null) {
        console.log('[ ROUTER ] /view/status :: Unable to find Document Packages with status: \'documents\'');
    } else {
        res.locals.results.documents.forEach(function (element) {
            element = formatElement(element);
            payload.processing.push(element);
        });
    }

    if (res.locals.results.discuss[0] == null) {
        console.log('[ ROUTER ] /view/status :: Unable to find Document Packages with status: \'discuss\'');
    } else {
        res.locals.results.discuss.forEach(function (element) {
            element = formatElement(element);
            payload.processing.push(element);
        });
    }

    if (res.locals.results.assess[0] == null) {
        console.log('[ ROUTER ] /view/status :: Unable to find Document Packages with status: \'assess\'');
    } else {
        res.locals.results.assess.forEach(function (element) {
            element = formatElement(element);
            payload.processing.push(element);
        });
    }

    if (res.locals.results.approval[0] == null) {
        console.log('[ ROUTER ] /view/status :: Unable to find Document Packages with status: \'approval\'');
    } else {
        res.locals.results.approval.forEach(function (element) {
            element = formatElement(element);
            payload.processing.push(element);
        });
    }


    if (res.locals.results.project[0] == null) {
        console.log('[ ROUTER ] /view/status :: Unable to find Document Packages with status: \'project\'');
    } else {
        res.locals.results.project.forEach(function (element) {
            element = formatElement(element);
            payload.processing.push(element);
        });
    }

	payload.user = req.user._id;

	payload.user_email = res.locals.email;


	res.render('vetting', payload);
});

/**
 * Route for adding notes
**/
router.post('/addNote', isLoggedInPost, api.postVettingNote, function(req, res, next) {
    if(res.locals.status != '200'){
        res.status(500).send("Could not add note");
    }
    else{
        res.status(200).send({ status: 'success' });
    }
});

/**
 * Route for deleting notes
 **/
router.post('/delNote', isLoggedInPost, api.removeVettingNote, function deleteNote(req, res, next) {
    if(res.locals.status != '200'){
        res.status(500).send("Could not delete note");
    }
    else{
        res.status(200).send({ status: '200'});
    }
});

/**
 * Route for updating notes
 **/
router.post('/updateNote', isLoggedInPost, api.updateVettingNote, function(req, res, next) {
    if(res.locals.status != '200'){
        res.status(500).send("Could not update note");
    }
    else{
        res.status(200).send({ status: '200'});
    }
});


/* Route to specific application by DocumentPackage Object ID */
router.get('/:id', function(req, res, next) {
    //Checking what's in params
    console.log("Rendering application " + ObjectId(req.params.id));
	console.log("user requested: ");
	console.log(req.user._id);



    /* search by _id. */
    Promise.props({
        highlight: HighlightPackage.findOne({ 'documentPackage' : ObjectId(req.params.id)}).lean().execAsync(),
        doc: DocumentPackage.findOne({_id: ObjectId(req.params.id)}).lean().execAsync(),
        vettingNotes: VettingNotePackage.find({applicationId: ObjectId(req.params.id)}).lean().execAsync()
    })
    .then(function(results) {
        // format birth date for display
        if (results.doc.application.dob.date != null) {
            var dobYear = results.doc.application.dob.date.getFullYear();
            //get month and day with padding since they are 0 indexed
            var dobDay = ( "00" + results.doc.application.dob.date.getDate()).slice(-2);
            var dobMon = ("00" + (results.doc.application.dob.date.getMonth()+1)).slice(-2);
            results.doc.application.dob.date = dobYear + "-" + dobMon + "-" + dobDay;
        }
        // format vetting notes dates
        if(results.vettingNotes.length != 0)
        {
            results.vettingNotes.forEach(function(note, index){
                var Year = note.date.getFullYear();
                //get month and day with padding since they are 0 indexed
                var Day = ( "00" + note.date.getDate()).slice(-2);
                var Mon = ("00" + (note.date.getMonth()+1)).slice(-2);
                results.vettingNotes[index].date = Mon + "/" + Day + "/" + Year;
            });
        }

        res.locals.layout = 'b3-layout';        // Change default from layout.hbs to b3-layout.hbs
        results.title = "Application View";     //Page <title> in header
		//results.user = JSON.stringify(req.user._id);
		results.user = req.user._id;

        res.render('b3-view', results);
    })
    .catch(function(err) {
        console.error(err);
    });

});

//route catches invalid post requests.
router.use('*', function route2(req, res, next) {
	if(res.locals.status == '406'){
		console.log("in error function");
        res.status(406).send("Could not update note");
		res.render('/user/login');
    }
});

function formatElement(element) {
    formatStatus(element);
    formatDate(element);
    return element;
}

/**
 * Takes the VERY long date in the DB and makes it into a nicer format
 * @param element (the document package)
 * @returns: The document package with formatted date
 */
function formatDate(element)
{
	console.log("element updated");
	console.log(element.updated);
    var Year = element.updated.getFullYear();
    //get month and day with padding since they are 0 indexed
    var Day = ( "00" + element.updated.getDate()).slice(-2);
    var Mon = ("00" + (element.updated.getMonth()+1)).slice(-2);
    element.updated = Mon + "/" + Day + "/" + Year;

	if(element.signature && element.signature.client_date != "") {
	console.log("element sig");
	console.log(element.signature.client_date);
	var appYear = element.signature.client_date.getFullYear();
	var appDay = ("00" + element.signature.client_date.getDate()).slice(-2);
	var appMon = ("00" + (element.signature.client_date.getMonth()+1)).slice(-2);
	element.signature.client_date = appMon + "/" + appDay + "/" + Year;
	}
    return element;
}

/**
 * Takes the status string from the DB and makes it more detailed for the front end
 * @param element (the document package)
 * @returns: The document package with wordier status
 */
function formatStatus(element) {
    var status;

    switch (element.status){
        case 'new':
            status = 'NEW';
            break;
        case 'phone':
            status = 'Phone Call Needed';
            break;
        case 'handle':
            status = 'Handle-It';
            break;
        case 'documents':
            status = 'Awaiting Documents';
            break;
        case 'discuss':
            status = 'On Hold - Pending Discussion';
            break;
        case 'assess':
            status = 'Site Assessment';
            break;
        case 'approval':
            status = 'Approval Process';
            break;
        case 'declined':
            status = 'Declined';
            break;
        case 'withdrawn':
            status = 'Withdrawn';
            break;
        case 'project':
            status ='Approved Project';
            break;
        default:
            status = element.status;
    }

    element.status = status;
    return element;
}

//module.exports = router;
return router;
}

//check to see if user is logged in and a vetting agent or an admin
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
							if(results.user.user_role == "VET" || results.user.user_role == "ADMIN") {
								res.locals.email = results.user.contact_info.user_email;

								return next();

							}

							else {
								console.log("user is not vet");
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

//post request authenticator.  Checks if user is an admin or vetting agent
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

						if(results.user.user_role == "VET" || results.user.user_role == "ADMIN") {
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
