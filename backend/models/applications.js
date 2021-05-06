const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const ApplicationsSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	salary: {
		type: Number,
		required: true
	},
	
	jobid:{
		type:String,
		required : true
	},
	skills: {
		type: String,
		required: true
	},
	SOP: {
		type: String,
		required: true
	},
	recruitermail: {
		type: String,
		required: true
	},
	usermail: {
		type: String,
		required: true
	},
	date:{
		type:Date,
		required:true,
		default:Date.now
	},
	job_type:{
		type:String,
		required:true
	},
	status: {
		type: String,
		required: true,
		default: "Waiting"
	},
	rating:{
		type:Number,
		default:0
	},
	ratecount:
	{
		type:Number,
		default:0
	}

});
module.exports = Applications = mongoose.model("Applications", ApplicationsSchema);
