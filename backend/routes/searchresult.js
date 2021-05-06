var MongoClient = require("mongodb");
var express = require("express");
var router = express.Router();

// @route POST /searchresult
// @desc view all products  of search result
// @access Public
router.post("/", (req, res) => {
	// var url = "mongodb://localhost:27017/new";
	// MongoClient.connect(url, function(err, db) {
	// 	if (err) throw err;
	// 	var dbo = db.db("new");
	// 	var search = req.body["search"];
	// 	var query = { title: search };
	// 	dbo.collection("jobs")
	// 		.find(query)
	// 		.toArray(function(err, result) {
	// 			if (err) throw err;
	// 			console.log(result);
	// 			res.send(result);
	// 			db.close();
	// 		});
	// });

	const jobs = require("../models/job");
	var search = req.body.search;

	if (search === "") {
		jobs.find({}).then(resp => {
			newresp = resp.filter(function(a) {
				return a.no_of_applicants >= 0 && a.status == "Available";
			});
			res.send(newresp);
		});
	} else {
		jobs.find({title:search}).then(resp => {
			newresp = resp.filter(function(a) {
				return a.no_of_applicants >= 0 && a.status == "Available";
			});
			res.send(newresp);
		});
	}
});




// @route POST /searchresult/myorders
// @desc view all products  of search result sorted
// @access Public
router.post("/myapplications", (req, res) => {
	var url = "mongodb://localhost:27017/new";
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("new");
		var mail = req.body["email"];
		var query = { usermail: mail };
		dbo.collection("applications")
			.find(query)
			.toArray(function(err, result) {
				if (err) {
					res.json(400).json(err);
					return;
				}
				// console.log(result);
				else {
					final_result = [];
					let i = 0;
					// console.log(result.length);
					for (let resp of result) {
						// obj = resp;
						MongoClient.connect(url, function(err, db) {
							if (err) throw err;
							var dbo = db.db("new");
							var query = {
								_id: resp.jobid,
								
							};
							dbo.collection("jobs")
								.find(query)
								.toArray(function(err, result2) {
									if (err) {
										console.log("EROR");
										res.json(400).json(err);
										return;
									}
									// resp["remaining"] = result2[0].no_of_applicants;
									final_result.push(resp);
									if (i === result.length - 1) {
										res.send(final_result);
									}
									i++;
									db.close();
								});
						});
					}
					db.close();
				}
			});
	});
});
router.post("/myapplication", (req, res) => {
	var url = "mongodb://localhost:27017/new";
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("new");
		var mail = req.body["email"];
		var id = req.body.jobid;
		var query = { recruitermail: mail ,jobid : id ,status:"Waiting"};
		dbo.collection("applications")
			.find(query)
			.toArray(function(err, result) {
				if (err) {
					res.json(400).json(err);
					return;
				}
				
				else {
					final_result = [];
					console.log(result);
					res.send(result);
					db.close();
				}
			});
	});
});
// router.post("/myorders", (req, res) => {
// 	var url = "mongodb://localhost:27017/new";
// 	MongoClient.connect(url, function(err, db) {
// 		if (err) throw err;
// 		var dbo = db.db("new");
// 		var mail = req.body["email"];
// 		var query = { usermail: mail };
// 		dbo.collection("orders")
// 			.aggregate([
// 				{
// 					$lookup: {
// 						from: "products",
// 						localField: "vendormail",
// 						foreignField: "vendormail",
// 						$match: { usermail: mail },
// 						as: "join"
// 					}
// 				}
// 			])
// 			.toArray(function(err, res) {
// 				console.log(res);
// 				db.close();
// 			});
// 	});
// });

module.exports = router;
