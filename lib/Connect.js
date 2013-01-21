// @Returns db - reference to Host Kit Mongo

var Connect = function (options, callback) {
	// Connect to the db
	MongoClient.connect("mongodb://localhost:27017/HostKitModel", function(err, db) {
		
		if(err) { callback(err); }

		callback(db);
		
	});
}