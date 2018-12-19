/**
 * Project Plan Form Package
 * 
 * Once an assessment has been done, all of the prep work must be completed
 * before day 1 of on-site volunteer work starts. This Project Plan
 * form records everything that has been done towards that.
 * 
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

// Lead time is in days (before end_date) that the task needs to be done.

var ProjectPlanPackageSchema = new Schema({

  applicationId: ObjectId,

  /* assigned: {
   *   crew_cheif: { type: String, default: '' },
   *   project_advocate: { type: String, default: '' },
   *   site_host: { type: String, default: '' }
   * },
   */
  start_date: Date,
  end_date: Date,
  
  contract: {
    complete: { type: Boolean, index: true },
    completed_on: Date,
    owner: { type: ObjectId, index: true },
    lead_time: Number
  },

  activated: {
    complete: { type: Boolean, index: true },
    completed_on: Date,
    owner: { type: ObjectId, index: true },
    lead_time: Number
  },

  planning_visit: {
    complete: { type: Boolean, index: true },
    completed_on: Date,
    owner: { type: ObjectId, index: true },
    lead_time: Number
  },

  rent_porta_pottie: {
    complete: { type: Boolean, index: true },
    completed_on: Date,
    owner: { type: ObjectId, index: true },
    lead_time: Number
  },

  rent_waste_dumpster: {
    complete: { type: Boolean, index: true },
    completed_on: Date,
    owner: { type: ObjectId, index: true },
    lead_time: Number
  },

  create_page_event_schedule: {
    complete: { type: Boolean, index: true },
    completed_on: Date,
    owner: { type: ObjectId, index: true },
    lead_time: Number
  },

  volunteer_request_initial: {
    complete: { type: Boolean, index: true },
    completed_on: Date,
    owner: { type: ObjectId, index: true },
    lead_time: Number
  },

  volunteer_request_followup: {
    complete: { type: Boolean, index: true },
    completed_on: Date,
    owner: { type: ObjectId, index: true },
    lead_time: Number
  },

  volunteer_request_final: {
    complete: { type: Boolean, index: true },
    completed_on: Date,
    owner: { type: ObjectId, index: true },
    lead_time: Number
  },

  report_materials_supplies: {
    complete: { type: Boolean, index: true },
    completed_on: Date,
    owner: { type: ObjectId, index: true },
    lead_time: Number
  },

  arrange_purchase_delivery: {
    complete: { type: Boolean, index: true },
    completed_on: Date,
    owner: { type: ObjectId, index: true },
    lead_time: Number
  },

  check_weather_forecast: {
    complete: { type: Boolean, index: true },
    completed_on: Date,
    owner: { type: ObjectId, index: true },
    lead_time: Number
  },

  verify_volunteer_count: {
    complete: { type: Boolean, index: true },
    completed_on: Date,
    owner: { type: ObjectId, index: true },
    lead_time: Number
  },

  verify_site_resources: {
    complete: { type: Boolean, index: true },
    completed_on: Date,
    owner: { type: ObjectId, index: true },
    lead_time: Number,

    ipad: Boolean
  }
});



ProjectPlanPackageSchema.methods.getCompletedDate = function (name) {
  if (this[name] && this[name].completed_on !== null && this[name].completed_on !== undefined) {
    return this[name].completed_on.toLocaleDateString()
  } else {
    return ''
  }
}

// This filters tasks either unassigned or assigned to a particular userId.
ProjectPlanPackageSchema.statics.filterOwnedTasks = function (userId) {
  var owner = { $ne: null };
  if (userId) {
    owner = ObjectId(userId)
  }
  return {
    $or: [
      { "contract.owner": owner,
        "contract.complete": false },
      { "activated.owner": owner,
        "activated.complete": false },
      { "planning_visit.owner": owner,
        "planning_visit.complete": false },
      { "rent_porta_pottie.owner": owner,
        "rent_porta_pottie.complete": false },
      { "rent_waste_dumpster.owner": owner,
        "rent_waste_dumpster.complete": false },
      { "create_page_schedule_event.owner": owner,
        "create_page_schedule_event.complete": false },
      { "volunteer_request_initial.owner": owner,
        "volunteer_request_initial.complete": false },
      { "volunteer_request_followup.owner": owner,
        "volunteer_request_followup.complete": false },
      { "volunteer_request_final.owner": owner,
        "volunteer_request_final.complete": false },
      { "report_materials_supplies.owner": owner,
        "report_materials_supplies.complete": false },
      { "arrange_purchase_delivery.owner": owner,
        "arrange_purchase_delivery.complete": false },
      { "check_weather_forecast.owner": owner,
        "check_weather_forecast.complete": false },
      { "verify_volunteer_count.owner": owner,
        "verify_volunteer_count.complete": false },
      { "verify_site_resources.owner": owner,
        "verify_site_resources.complete": false }
    ]
  }
}

// Mapping of db names to UI presentation names
var labels = {
  contract: "Project postal mailed to client",
  activated: "Project activated",
  planning_visit: "Planning visit completed",
  rent_porta_pottie: "Rent porta-pottie",
  rent_waste_dumpster: "Rent waste bin",
  create_page_event_schedule: "Create project webpage, calendar event, and volunteer schedule in Endis",
  volunteer_request_initial: "Send out initial email requesting volunteers",
  volunteer_request_followup: "Send follow-up emails requesting volunteers",
  volunteer_request_final: "Send final email to signed up volunteers 3-5 days before project",
  report_materials_supplies: "Report list of materials, rentals &amp; supplies needed",
  arrange_purchase_delivery: "Arrange for purchase &amp; delivery of all materials, rentals, supplies, etc.",
  check_weather_forecast: "Check the weather forecast and make plans accordingly",
  verify_volunteer_count: "Verify number of volunteers signed up",
  verify_site_resources: "Verify site resources needed"
};

ProjectPlanPackageSchema.statics.labels = labels;

// This returns an object with only the tasks relevant to a particular user.
ProjectPlanPackageSchema.statics.getOnlyAssigned = function (plan, userId) {
  var taskNames = Object.keys(labels);
  var assigned = [];

  for (var i = 0; i < taskNames.length; i++) {
    var name = taskNames[i]
    if (plan[name].owner
        && plan[name].owner.toString() === userId.toString()
        // && plan[name].complete === false
    ) {

      if (plan[name].complete === false) {
        assigned.push(Object.assign({}, plan[name], { label: labels[name] }));
      }
    }
  }

  return assigned;
}



var ProjectPlanPackage = mongoose.model('ProjectPlanPackage', ProjectPlanPackageSchema);

ProjectPlanPackage.empty = function(applicationId) {
  return {
    applicationId: applicationId,

    start_date: null,
    end_date: null,

    contract: { complete: false, owner: null, completed_on: null, lead_time: null },
    activated: { complete: false, owner: null, completed_on: null, lead_time: null },
    planning_visit: { complete: false, owner: null, completed_on: null, lead_time: null },
    rent_porta_pottie: { complete: false, owner: null, completed_on: null, lead_time: null },
    rent_waste_dumpster: { complete: false, owner: null, completed_on: null, lead_time: null },
    create_page_event_schedule: { complete: false, owner: null, completed_on: null, lead_time: null },
    volunteer_request_initial: { complete: false, owner: null, completed_on: null, lead_time: null },
    volunteer_request_followup: { complete: false, owner: null, completed_on: null, lead_time: null },
    volunteer_request_final: { complete: false, owner: null, completed_on: null, lead_time: null },
    report_materials_supplies: { complete: false, owner: null, completed_on: null, lead_time: null },
    arrange_purchase_delivery: { complete: false, owner: null, completed_on: null, lead_time: null },
    check_weather_forecast: { complete: false, owner: null, completed_on: null, lead_time: null },
    verify_volunteer_count: { complete: false, owner: null, completed_on: null, lead_time: null },
    verify_site_resources: { complete: false, owner: null, completed_on: null, lead_time: null, ipad: false },
  }
};

module.exports = ProjectPlanPackage;
