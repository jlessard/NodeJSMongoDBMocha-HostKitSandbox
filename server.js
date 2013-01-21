
	// Retrieve
	var MongoClient = require('mongodb').MongoClient;

	// Connect to the db
	MongoClient.connect("mongodb://localhost:27017/HostKitModel", function(err, db) {
		if(err) { return console.dir(err); }

		var users = db.collection('users'),
			orgs = db.collection('orgs');


	});

	var init = function () {

	};
	modules.exports.init = init;