/**
 * Assessment Form Package
 * 
 * Assessments of the future work site must happen before any work is done, plus
 * other arrangements need to be made for the days and times of work (Porta-johns,
 * tool rentals, etc.). 
 * 
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;


var AssessmentPackageSchema = new Schema({

  applicationId: ObjectId,

  materials: [{
    name: String,
    cost: Number
  }],

  hazard_safety: {
    has_lead: { type: String, default: "unsure" },
    has_asbestos: { type: String, default: "unsure" },
    safety_plan: String
  },

  tool_rentals: [{
    name: String,
    cost: { type: Number, default: 0 }
  }],

  subcontractors: String,

  other_costs: {
    permit: [{
      name: String,
      cost: Number
    }],
    porta_pottie: {
      required: Boolean,
      cost: { type: Number, default: 0 },
    },
    waste_dumpster: {
      required: Boolean,
      cost: { type: Number, default: 0 },
    }    
  },

  estimates: {
    total_cost: Number,
    volunteers_needed: Number
  },
  
  proposed_dates: [{
    name: String,
    date: Date
  }]
});


module.exports = mongoose.model('AssessmentPackage', AssessmentPackageSchema);
