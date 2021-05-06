const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');
// Create Schema
const jobSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	salary: {
		type: Number,
		required: true
	},
	no_of_applicants: {
		type: Number,
		required: true
	},
	positions: {
		type: Number,
		required: true
	},
	recruitermail: {
		type: String,
		required: true
	},
	
	job_rating: {
		type: Number,
		required: true,
		default: 0
	},
	ratecount: {
		type: Number,
		required: true,
		default: 0
    },
    deadline:{
        type: Date,
		required : true,
		default:Date.now
    },
    job_type:{
        type:String,
        required:true
    },
    duration:{
        type:Number,
        required:true
    },
    skillset:{
        type:String,
        required:true
    },
    date:{
        type:Date,
		required:true,
		default:Date.now
    },
	status: {
		type: String,
		required: true,
		default: "Available"
	}
});
	
// jobSchema.plugin(mongoose_fuzzy_searching, { fields: ['title'] });
module.exports = jobs = mongoose.model("job", jobSchema);
