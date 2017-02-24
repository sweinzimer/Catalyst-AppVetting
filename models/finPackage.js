/*
Financial document package - includes requested/received boxes from vetting worksheet
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

var FinPackageSchema = new Schema({
	appID: { type: ObjectId},
	name : String,

	food_stamps : {
		req : Boolean,
		rec : Boolean,
		na  : Boolean
	},

	income_tax : {
		req : Boolean,
		rec : Boolean,
		na  : Boolean
	},

	employment : {
		req : Boolean,
		rec : Boolean,
		na  : Boolean
	},

	ss_ben : {
		req : Boolean,
		rec : Boolean,
		na  : Boolean
	},

	pension : {
		req : Boolean,
		rec : Boolean,
		na  : Boolean
	},

	house_assist : {
		req : Boolean,
		rec : Boolean,
		na  : Boolean
	},

	check_account : {
		req : Boolean,
		rec : Boolean,
		na  : Boolean
	},

	saving_account : {
		req : Boolean,
		rec : Boolean,
		na  : Boolean
	},

	ret_fund : {
		req : Boolean,
		rec : Boolean,
		na  : Boolean
	},

	invest : {
		req : Boolean,
		rec : Boolean,
		na  : Boolean
	},

	physical : {
		req : Boolean,
		rec : Boolean,
		na  : Boolean
	},

	other_resources : {
		desc : String,
		req : Boolean,
		rec : Boolean,
		na  : Boolean
	},

	proof_own : {
		req : Boolean,
		rec : Boolean,
		na  : Boolean
	}

});


var FinPackage = mongoose.model('FinPackage', FinPackageSchema);
module.exports = FinPackage;
