var express = require('express');
var router = express.Router();
var MongoClient = require("mongodb");
/* GET home page. */
router.post('/', function(req, res, next) {
  var url = "mongodb://localhost:27017/new";
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("new");
    var query = {email: req.body.email};
    console.log(query)
		dbo.collection("users")
			.find(query)
			.toArray(function(err, result) {
				if (err) throw err;
				
				res.send(result);
				db.close();
			});
	});
  // res.render('index', { title: 'Express' });
});

module.exports = router;
