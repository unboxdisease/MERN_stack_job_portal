const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	usertype: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	},
	skills: {
		type: String,
		default: "none"
	},
	bio:{
		type: String,
		default:"none"
	},
	contact:{
		type: Number,
		default:"00"
	},
	education:{
		type:String,
		default:"NONE"
	},
	startyear:{
		type:Number,
		default:"2001"
	},
	rating:{
		type:Number,
		default:"0"
	},
	ratecount:{
		type:Number,
		default:"0"
	},
	image: {
		data: Buffer,
		type: String
	},
	cv: {
		data: Buffer,
		type: String
	},
	no_applied:{
		type:Number,
		default:0
	},
	applied_to:{
		type:Array,
		default:[{}]

	},
	status:{
		type:String,
		default:"Waiting"
	}
});
module.exports = User = mongoose.model("users", UserSchema);
