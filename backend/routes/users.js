const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const keys = require("../config/keys");

// Load User model
const User = require("../models/User");

// @route GET users
// @desc get all users
// @access Public
// router.get("/hji", (req, res) => {
// 	return "HELLO";
// 	// User.find(function(err, users) {
// 	// 	if (err) {
// 	// 		console.log(err);
// 	// 	} else {
// 	// 		res.json(users);
// 	// 	}
// 	// });
// });

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
	// Form validation
	const User = require("../models/User");
	const { errors, isValid } = validateRegisterInput(req.body);
	// Check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}
	User.findOne({ email: req.body.email }).then(user => {
		if (user) {
			return res.status(400).json({ email: "Email already exists" });
		} else {
			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password,
				usertype: req.body.usertype
			});
			// Hash password before saving in database
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser
						.save()
						.then(user => res.json(user))
						.catch(err => res.send(err));
				});
			});
		}
	});
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
	// Form validation
	const { errors, isValid } = validateLoginInput(req.body);
	// Check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}
	const email = req.body.email;
	const password = req.body.password;
	// Find user by email
	User.findOne({ email }).then(user => {
		// Check if user exists
		if (!user) {
			return res.status(404).json({
				error: "Email not found",
				emailnotfound: "Email not found"
			});
		}
		// Check password
		bcrypt.compare(password, user.password).then(isMatch => {
			if (isMatch) {
				// User matched
				// Create JWT Payload
				const payload = {
					id: user.id,
					name: user.name
				};
				// Sign token
				jwt.sign(
					payload,
					keys.secretOrKey,
					{
						expiresIn: 31556926 // 1 year in seconds
					},
					(err, token) => {
						res.json({
							success: true,
							token: "Bearer " + token,
							user: user
						});
					}
				);
			} else {
				return res.status(400).json({
					error: "Password Incorrect",
					passwordincorrect: "Password incorrect"
				});
			}
		});
	});
});
router.post("/update", (req, res) => {
	
	var _id = req.body._id;
	var job = {
	  bio: req.body.bio,
	  contact:req.body.contact,
	  name:req.body.name
	  
	};
	console.log("hi");
	User.findByIdAndUpdate(_id, job, { new: true }, function(
	  err,
	  job
	) {
	  if (err) {
		console.log("err", err);
		res.status(400).send(err);
	  } else {
		console.log("success");
		res.send(job);
	  }
	});
});
router.post("/update2", (req, res) => {
	
	var _id = req.body._id;
	var job1 = {
	  skills: req.body.skills,
	  education:req.body.education,
	  startyear:req.body.startyear,
	  name:req.body.name,
	  image: req.body.image,
	  cv:req.body.cv
	  
	};
	// console.log("hi");
	User.findByIdAndUpdate(_id, job1, { new: true }, function(
	  err,
	  job
	) {
	  if (err) {
		console.log("err", err);
		res.status(400).send(err);
	  } else {
		console.log(job);
		res.send(job);
	  }
	});
});
router.post("/rate", (req, res) => {
	
	var name1 = req.body.name;
	const f = {name : name1}
	const amt = req.body.rating;
	var job = {
		$inc : {'rating' : amt,"ratecount":1}, 
	};
	// console.log("hi");
	User.findOneAndUpdate(f, job, { new: true }, function(
	  err,
	  job
	) {
	  if (err) {
		console.log("err", err);
		res.status(400).send(err);
	  } else {
		console.log("success");
		res.send(job);
	  }
	});
	
});
router.post("/applied", (req, res) => {
	
	var name1 = req.body.id;
	const f = {_id : name1}
	const amt = req.body.rating;
	var job = {
		$inc : {'no_applied' : 1},
		$push: { 'applied_to': req.body.title } ,
		
	};
	console.log(job);
	User.findOneAndUpdate(f, job, { new: true }, function(
	  err,
	  job
	) {
	  if (err) {
		console.log("err", err);
		res.status(400).send(err);
	  } else {
		console.log("success");
		res.send(job);
	  }
	});
	
});

module.exports = router;
