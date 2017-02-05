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
	
	food_stamps {
		fs_req : Boolean,
		fs_rec : Boolean
	},
	
	income_tax {
		it_req : Boolean,
		it_rec : Boolean
	},
	
	employment {
		emp_req : Boolean,
		emp _rec : Boolean
	},
	
	ss_ben {
		ss_req : Boolean,
		ss_rec : Boolean
	},
	
	pension {
		pen_req : Boolean,
		pen_rec : Boolean
	},
	
	house_assist {
		ha_req : Boolean,
		ha_rec : Boolean,
	},
	
	check_account {
		ca_req : Boolean,
		ca_rec : Boolean
	},
	
	saving_account {
		sa_req : Boolean,
		sa_rec : Boolean
	},
	
	ret_fund {
		rf_req : Boolean,
		rf_rec : Boolean
	},
	
	invest {
		in_req : Boolean,
		in_rec : Boolean
	},
	
	physical {
		pa_req : Boolean,
		pa_rec : Boolean
	},
	
	other_resources {
		pa_desc : String,
		pa_req : Boolean,
		pa_rec : Boolean
	},
	
	proof_own {
		po_req : Boolean,
		po_rec : Boolean
	}
	
});

var FinPackage = mongoose.model('FinPackage', FinPackageSchema);
module.exports = FinPackage;