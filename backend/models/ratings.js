const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const RatingSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	rating: {
		type: Number,
		required: true
	},
	review: {
		type: String,
		required: true
	},
	vendormail: {
		type: String,
		required: true
	},
	usermail: {
		type: String,
		required: true
	}
});
module.exports = ratings = mongoose.model("ratings", RatingSchema);
