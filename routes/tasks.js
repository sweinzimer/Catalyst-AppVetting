var express = require('express');
var mongoose = require('mongoose');
var Promise = require('bluebird'); // Import promise engine
mongoose.Promise = Promise;
Promise.promisifyAll(mongoose); 

var db = require('../mongoose/connection');
var api = require('../controllers/api');
var User = require('../models/userPackage');
var DocumentPackage = require('../models/documentPackage.js');
var ProjectPlanPackage = require('../models/projectPlanPackage.js');
var ProjectWrapUpPackage = require('../models/projectWrapUpPackage.js');


module.exports = function(passport) {
  var router = express.Router();
  
  router.get('/', isLoggedIn,  function (req, res) {

    Promise.props({
      plan: ProjectPlanPackage.find(ProjectPlanPackage.filterOwnedTasks(req.params.id)).execAsync()
    }).then(function(results) {
      var plans = results.plan;
      console.log(plans);
      appids = [];
      for (var i = 0; i < results.plan.length; i++) {
        var oid = mongoose.Types.ObjectId(results.plan[i].applicationId);
        appids.push(oid);
      }

      if (appids.length > 0) {
        applications = DocumentPackage.find({ "_id": { $in: appids } }, function (err, applications) {
          var apps = {}
          for (var i = 0; i < applications.length; i++) {
            apps[ applications[i]._id ] = applications[i]
          }
          
          res.render('usertasks', {
            userId: req.user._id,
            plan: plans,
            applications: apps
          });
        });
      } else {
        res.render('usertasks', {
          user_roles: req.user.user_roles,
          userId: req.user._id,
          plan: plans,
          applications: []
        });
      }
    });
  });

  return router;
}














//check to see if user is logged in and a vetting agent or site or an admin
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
                 res.locals.assign_tasks = results.user.assign_tasks;
                 
							   if(results.user.user_role == "VET" || results.user.user_role == "ADMIN" || results.user.user_role == "SITE") {
								   res.locals.email = results.user.contact_info.user_email;
								   res.locals.role = results.user.user_role;
								   res.locals.user_roles = results.user.user_roles;
                   res.locals.assign_tasks = results.user.assign_tasks;
								   return next();

							   }
							   else if(results.user.user_roles !== undefined && results.user.user_roles.indexOf('PROJECT_MANAGEMENT') > -1) {
								   res.locals.email = results.user.contact_info.user_email;
								   res.locals.role = results.user.user_role;
								   res.locals.user_roles = results.user.user_roles;
								   return next();

							   }

							   else {
								   console.log("user is not required role");
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

//post request authenticator.  Checks if user is an admin or vetting or site agent
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
						   if(results.user.user_status == "ACTIVE") {
							   if(results.user.user_role == "VET" || results.user.user_role == "ADMIN" || results.user.user_role == "SITE") {
								   res.locals.email = results.user.contact_info.user_email;
								   res.locals.role = results.user.user_role;
								   return next();

							   }
							   else if (results.user.user_roles !== undefined && results.user.user_roles.indexOf('PROJECT_MANAGEMENT') >-1)
							     {
								     res.locals.role = results.user.user_role;
								     res.locals.user_roles = results.user.user_roles;
								     return next();
							     }

						   }
						   else {
							   //user is not active
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
