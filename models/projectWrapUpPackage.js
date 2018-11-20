/**
 * Project Wrap-Up Form Package
 *
 * Once a project is completed, several follow-up steps must be completed.
 * The Wrap-Up Form tracks whether all of that has happened.
 *
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ProjectWrapUpPackageSchema = new Schema({
  applicationId: ObjectId,

  signup_sheet_office: {
    complete: Boolean,
    completed_on: Date,
    owner: [String]
  },

  record_volunteer_info: {
    complete: Boolean,
    completed_on: Date,
    owner: [String]
  },

  in_kind_donations: {
    // TODO
  },

  porta_pottie_pickup: {
    required: Boolean,
    complete: Boolean,
    completed_on: Date,
    owner: [String]
  },

  waste_dumpster_pickup: {
    required: Boolean,
    complete: Boolean,
    completed_on: Date,
    owner: [String]
  },

  waste_disposal_arrangement: {
    complete: Boolean,
    completed_on: Date,
    owner: [String]
  },

  return_materials_rentals: {
    complete: Boolean,
    completed_on: Date,
    owner: [String]
  },

  turn_in_receipts: {
    complete: Boolean,
    completed_on: Date,
    owner: [String]
  },

  process_reimbursement_checks: {
    complete: Boolean,
    completed_on: Date,
    owner: [String]
  },

  upload_photos_flickr: {
    complete: Boolean,
    completed_on: Date,
    owner: [String]
  },

  report_form_submission: {
    complete: Boolean,
    completed_on: Date,
    owner: [String]
  },

  update_project_webpage: {
    complete: Boolean,
    completed_on: Date,
    owner: [String]
  },

  client_phone_followup: {
    complete: Boolean,
    completed_on: Date,
    owner: [String]
  },

  send_thank_you_email: {
    complete: Boolean,
    completed_on: Date,
    owner: [String]
  },

  determine_followup_required: {
    complete: Boolean,
    completed_on: Date,
    owner: [String]
  },

  send_closing_letter: {
    complete: Boolean,
    completed_on: Date,
    owner: [String]
  }

});
