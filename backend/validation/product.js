const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateProductInput(data) {
	let errors = {};
	// Convert empty fields to an empty string so we can use validator functions
	data.name = !isEmpty(data.name) ? data.name : "";
	data.price = !isEmpty(data.price) ? data.price : "";
	data.quantity = !isEmpty(data.quantity) ? data.quantity : "";

	// Name checks
	if (Validator.isEmpty(data.name)) {
		errors.name = "Product Name field is required";
	}
	// Price checks
	if (Validator.isEmpty(data.price)) {
		errors.price = "Price field is required";
	} else if (!Validator.isInt(data.price)) {
		errors.price = "Price is invalid";
	} else if (data.price <= 0 || data.price > 1000000) {
		errors.price = "Price should be non zero integer below 1000000";
	}
	// Quantity checks
	if (Validator.isEmpty(data.quantity)) {
		errors.quantity = "Quantity field is required";
	} else if (!Validator.isInt(data.quantity)) {
		errors.quantity = "Quantity is invalid";
	} else if (data.quantity <= 0) {
		errors.quantity = "Quantity should be non zero integer";
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
