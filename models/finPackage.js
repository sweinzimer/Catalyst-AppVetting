/*
Financial document package - includes requested/received boxes from vetting worksheet
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

var FinPackageSchema = new Schema({
	appID: { type: ObjectId},
	name : {
		first : String,
		last : String
	},

	
	food_stamps : {
		req : Boolean,
		rec : Boolean
	},

	income_tax : {
		req : Boolean,
		rec : Boolean
	},

	employment : {
		req : Boolean,
		rec : Boolean
	},

	ss_ben : {
		req : Boolean,
		rec : Boolean
	},

	pension : {
		req : Boolean,
		rec : Boolean
	},

	house_assist : {
		req : Boolean,
		rec : Boolean,
	},

	check_account : {
		req : Boolean,
		rec : Boolean
	},

	saving_account : {
		req : Boolean,
		rec : Boolean
	},

	ret_fund : {
		req : Boolean,
		rec : Boolean
	},

	invest : {
		req : Boolean,
		rec : Boolean
	},

	physical : {
		req : Boolean,
		rec : Boolean
	},

	other_resources : {
		desc : String,
		req : Boolean,
		rec : Boolean
	},

	proof_own : {
		req : Boolean,
		rec : Boolean
	}

});


var FinPackage = mongoose.model('FinPackage', FinPackageSchema);
module.exports = FinPackage;
