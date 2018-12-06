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
    complete: Boolean,
    completed_on: Date,
    owner: ObjectId,
    lead_time: Number
  },

  activated: {
    complete: Boolean,
    completed_on: Date,
    owner: ObjectId,
    lead_time: Number
  },

  planning_visit: {
    complete: Boolean,
    completed_on: Date,
    owner: ObjectId,
    lead_time: Number
  },

  rent_porta_pottie: {
    complete: Boolean,
    completed_on: Date,
    owner: ObjectId,
    lead_time: Number
  },

  rent_waste_dumpster: {
    complete: Boolean,
    completed_on: Date,
    owner: ObjectId,
    lead_time: Number
  },

  create_page_event_schedule: {
    complete: Boolean,
    completed_on: Date,
    owner: ObjectId,
    lead_time: Number
  },

  volunteer_request_initial: {
    complete: Boolean,
    completed_on: Date,
    owner: ObjectId,
    lead_time: Number
  },

  volunteer_request_followup: {
    complete: Boolean,
    completed_on: Date,
    owner: ObjectId,
    lead_time: Number
  },

  volunteer_request_final: {
    complete: Boolean,
    completed_on: Date,
    owner: ObjectId,
    lead_time: Number
  },

  report_materials_supplies: {
    complete: Boolean,
    completed_on: Date,
    owner: ObjectId,
    lead_time: Number
  },

  arrange_purchase_delivery: {
    complete: Boolean,
    completed_on: Date,
    owner: ObjectId,
    lead_time: Number
  },

  check_weather_forecast: {
    complete: Boolean,
    completed_on: Date,
    owner: ObjectId,
    lead_time: Number
  },

  verify_volunteer_count: {
    complete: Boolean,
    completed_on: Date,
    owner: ObjectId,
    lead_time: Number
  },

  verify_site_resources: {
    complete: Boolean,
    completed_on: Date,
    owner: ObjectId,
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
