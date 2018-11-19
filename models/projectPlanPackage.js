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

  assigned: {
    crew_cheif: { type: String, default: '' },
    project_advocate: { type: String, default: '' },
    site_host: { type: String, default: '' }
  },

  start_date: Date,
  end_date: Date,

  contract: {
    complete: Boolean,
    owner: String,
    lead_time: Number
  },

  activated: {
    complete: Boolean,
    owner: String,
    lead_time: Number
  },

  planning_vistit: {
    complete: Boolean,
    owner: String,
    lead_time: Number
  },

  rent_porta_pottie: {
    complete: Boolean,
    owner: String,
    lead_time: Number
  },

  rent_waste_dumpster: {
    complete: Boolean,
    owner: String,
    lead_time: Number
  },

  create_page_event_schedule: {
    complete: Boolean,
    owner: String,
    lead_time: Number
  },

  volunteer_request_initial: {
    complete: Boolean,
    owner: String,
    lead_time: Number
  },

  volunteer_request_followup: {
    complete: Boolean,
    owner: String,
    lead_time: Number
  },

  volunteer_request_final: {
    complete: Boolean,
    owner: String,
    lead_time: Number
  },

  report_materials_supplies: {
    complete: Boolean,
    owner: String,
    lead_time: Number
  },

  arrange_purchase_delivery: {
    complete: Boolean,
    owner: String,
    lead_time: Number
  },

  check_weather_forecast: {
    complete: Boolean,
    owner: String,
    lead_time: Number
  },

  verify_volunteer_count: {
    complete: Boolean,
    owner: String,
    lead_time: Number
  },

  verify_site_resources: {
    complete: Boolean,
    owner: String,
    lead_time: Number,

    ipad: Boolean
  }
});


var ProjectPlanPackage = mongoose.model('ProjectPlanPackage', ProjectPlanPackageSchema);

module.exports = ProjectPlanPackage;
