const ls = require("local-storage");
var MongoClient = require("mongodb");
var express = require("express");
var router = express.Router();
const jobs = require("../models/job");
const User = require("../models/User");
// const validateProductInput = require("../validation/product");

// @route POST /product/create
// @desc create product
// @access Public
router.post("/create", (req, res) => {
	const job = require("../models/job");
	// const { errors, isValid } = validateProductInput(req.body);
	// // Check validation
	// if (!isValid) {
	// 	return res.status(400).json(errors);
	// } else {
		const newjob = new job({
			title:req.body.title,
			salary:req.body.salary,
			no_of_applicants:req.body.no_of_applicants,
			recruitermail:req.body.recruitermail,
			deadline:req.body.deadline,
			job_type:req.body.job_type,
			duration:req.body.duration,
			skillset:req.body.skillset,
			positions:req.body.positions
	
		});
		newjob
			.save()
			.then(newjob => res.send(newjob))
			.catch(err => {
				return res.status(400).json(err);
			});
	// }
});

// @route POST /product/view
// @desc view all products
// @access Public
router.post("/view", (req, res) => {
	var url = "mongodb://localhost:27017/new";
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("new");
		var mail = req.body.mail;
		var query = { recruitermail: mail, status: "Available" };
		dbo.collection("jobs")
			.find(query)
			.toArray(function(err, result) {
				if (err) throw err;
				console.log(mail);
				res.send(result);
				db.close();
			});
	});
});

// @route POST /product/view
// @desc view all products
// @access Public
router.post("/edit", (req, res) => {
	const application = require("../models/applications");
	const newapplication = new application({
		name: req.body.name,
		title: req.body.title,
		salary:req.body.salary,
		jobid:req.body.jobid,
		skills: req.body.skills,
		SOP: req.body.sop,
		recruitermail: req.body.recruitermail,
		usermail: req.body.usermail,
		job_type:req.body.job_type,
		rating:req.body.rating,
		ratecount:req.body.ratecount
		
	});
	
	newapplication
		.save()
		.then(newapplication => res.send(newapplication))
		.catch(err => {
			console.log("error");
			return res.status(400).json(err);
		});

	
});

// @route POST /product/dispatch
// @desc view all ready to dispatch products
// @access Public
router.post("/accepted", (req, res) => {
	var url = "mongodb://localhost:27017/new";
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("new");
		var mail = req.body.mail;
		var query = { recruitermail: mail, status: "Accepted" };
		dbo.collection("applications")
			.find(query)
			.toArray(function(err, result) {
				if (err) throw err;
				console.log(result);
				res.send(result);
				db.close();
			});
	});
});

// @route POST /product/dispatched
// @desc dispatch products
// @access Public
router.post("/edit2", (req, res) => {
	const job = require("../models/job")
	var _id = req.body.jobid;
	var edit = {
	  duration: req.body.dura,
	  no_of_applicants:req.body.no_app,
	  positions:req.body.pos
	  
	};
	console.log(edit);
	job.findByIdAndUpdate(_id, edit, { new: true }, function(
	  err,
	  resu
	) {
	  if (err) {
		console.log("err", err);
		res.status(400).send(err);
	  } else {
		console.log("success");
		res.send(resu);
	  }
	});


// 	var url = "mongodb://localhost:27017/new";
// 	MongoClient.connect(url, function(err, db) {
// 		if (err) throw err;
// 		var dbo = db.db("new");
// 		var name = req.body.name;
// 		var vendorid = req.body.mail;
// 		var query = { name: name, vendormail: vendorid };
// 		var set = { $set: { status: "Dispatched" } };
// 		dbo.collection("orders").updateMany(query, set, function(err, result) {
// 			if (err) throw err;
// 			res.send(result);
// 			db.close();
// 		});
// 	});
});
const application = require("../models/applications");
// @route POST /product/dispatchedproducts
// @desc dispatch products
// @access Public
router.post("/accept", (req, res) => {
	var usermail1 = req.body.usermail;
	application.updateMany({usermail:usermail1},  
		{status:"Rejected"}, function (err, docs) { 
		if (err){ 
			console.log(err) 
		} 
		else{ 
			console.log("Updated Docs : ", docs); 
		} 
	}); 
	
	var _id = req.body.applicationid;
	var job = {
	  status:"Accepted"
	  
	};
	console.log("hi");
	application.findByIdAndUpdate(_id, job, { new: true }, function(
	  err,
	  job1
	) {
	  if (err) {
		console.log("err", err);
		res.status(400).send(err);
	  } else {
		console.log("success");
		
	  }
	});
	
	//send email
	var nodemailer = require('nodemailer');
	
	var title = req.body.title;
	var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'mernjobsaudagar@gmail.com',
		pass: 'mernassignment'
	}
	});

	var mailOptions = {
	from: 'mernjobsaudagar@gmail.com',
	to: usermail1,
	subject: 'Application Accepted',
	text: 'Your Application to job ' + title + " has been accepted."
	};

	transporter.sendMail(mailOptions, function(error, info){
	if (error) {
		console.log(error);
	} else {
		console.log('Email sent: ' + info.response);
	}
	});
	userid = {
		email:usermail1
	};
	todo = {
		status:"Accepted"
	}
	User.findOneAndUpdate(userid, todo, { new: true }, function(
		err,
		job2
	  ) {
		if (err) {
		  console.log("err", err);
		  res.status(400).send(err);
		} else {
		  console.log("success");
		  
		}
	  });

	var name1 = req.body.jobid;
	const f = {_id : name1}
	
	var job1 = {
		$inc : {'positions' : -1}, 
	};
	// console.log("hi");
	jobs.findOneAndUpdate(f, job1, { new: true }, function(
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
router.post("/accept2", (req, res) => {
	var _id = req.body.applicationid;
	var job = {
	  status:"Accepted"
	  
	};
	console.log("hi");
	application.findByIdAndUpdate(_id, job, { new: true }, function(
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
router.post("/reject", (req, res) => {
	var _id = req.body.applicationid;
	var job = {
	  status:"Rejected"
	  
	};
	console.log("hi");
	application.findByIdAndUpdate(_id, job, { new: true }, function(
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

// @route POST /product/cancel
// @desc cancel product
// @access Public
router.post("/cancel", (req, res) => {
	var url = "mongodb://localhost:27017/new";
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("new");
		var name = req.body.name;
		var vendorid = req.body.mail;
		var query = { title: name, recruitermail: vendorid };
		var set = { $set: { status: "Cancelled" } };
		dbo.collection("jobs").updateMany(query, set, function(
			err,
			result
		) {
			if (err) throw err;
			res.send(result);
			db.close();
		});
	});

// 	var url = "mongodb://localhost:27017/new";
// 	MongoClient.connect(url, function(err, db) {
// 		if (err) throw err;
// 		var dbo = db.db("new");
// 		var name = req.body.name;
// 		var vendorid = req.body.mail;
// 		var query = { name: name, vendormail: vendorid };
// 		var set = { $set: { status: "Cancelled" } };
// 		dbo.collection("orders").updateMany(query, set, function(err, result) {
// 			if (err) throw err;
// 			res.send(result);
// 			db.close();
// 		});
// 	});
});

router.post("/rate", (req, res) => {
	
	var name1 = req.body.id;
	const f = {_id : name1}
	const amt = req.body.rating;
	var job = {
		$inc : {'job_rating' : amt,"ratecount":1}, 
	};
	// console.log("hi");
	jobs.findOneAndUpdate(f, job, { new: true }, function(
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
router.post("/apply", (req, res) => {
	
	var name1 = req.body.id;
	const f = {_id : name1}
	
	var job = {
		$inc : {'no_of_applicants' : -1}, 
	};
	// console.log("hi");
	jobs.findOneAndUpdate(f, job, { new: true }, function(
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