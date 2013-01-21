var assert = require('assert'),
	MongoClient = require('mongodb').MongoClient;

var userCollection,
	UserModel,
	testUserID;

describe('UserModel', function(done) {

	before(function(done){
		MongoClient.connect("mongodb://localhost:27017/HostKitModel-Test", function(err, db) {
			if(err) { return console.dir(err); }
			//db.collection('user').remove(); //empty out test users collection
			userCollection = db.collection('user');
			UserModel = require('./../models/UserModel')(db);
			done();
		});
	});

	beforeEach(function(done){
		//removes all documents from collection
		userCollection.remove(false,{safe:true}, function(err, result) {});

		//creates test user, stores ID in public scope
		var testUser = {
				username: 'username',
				password: 'password',
				email: 'email@email.com',
				createdOn: new Date()
			};

			userCollection.insert(testUser, {safe: true}, function(err, result) {
				if(err) { return console.dir(err) };
				testUserID = result[0]._id;
				done();
			});

	});

	after(function(done){
		//removes all documents from collection
		userCollection.remove(false,{safe:true}, function(err, result) { done() });
	});

	describe('createUser()', function(){
		it('inserts a user into the database', function(done){
			UserModel.createUser({
				username: 'username',
				password: 'password',
				email: 'email@email.com'
			}, function(response){
				var user = response[0];
				assert.equal(user.username, 'username');
				assert.equal(user.password, 'password');
				assert.equal(user.email, 'email@email.com');
				done();
			});
		});
		describe('Validation', function(){
			it('username must be between 4 and 16 characters', function(done){
				UserModel.createUser({
					username: 'use',
					password: 'password',
					email: 'email@email.com'
				}, function(response){
					assert.equal(response.valid, false);
					assert.equal(response.errorMessages.length, 1);
					done();
				});
			});
			it('username can only contain letters and numbers', function(done){
				UserModel.createUser({
					username: 'usefdas@',
					password: 'password',
					email: 'email@email.com'
				}, function(response){
					assert.equal(response.valid, false);
					assert.equal(response.errorMessages.length, 1);
					done();
				});
			});
			// it('password must be between 4 and 16 characters', function(done){
			// 	UserModel.createUser({
			// 		username: 'username',
			// 		password: 'passwordpasswordpassword',
			// 		email: 'email@email.com'
			// 	}, function(response){
			// 		assert.equal(response.valid, false);
			// 		assert.equal(response.errorMessages.length, 1);
			// 		done();
			// 	});
			// });
			// it('password cannot contain the following characters: ‘,\*&$<;>', function(done){
			// 	UserModel.createUser({
			// 		username: 'username',
			// 		password: 'passw,ord',
			// 		email: 'email@email.com'
			// 	}, function(response){
			// 		assert.equal(response.valid, false);
			// 		assert.equal(response.errorMessages.length, 1);
			// 		done();
			// 	});
			// });
			it('email must be valid', function(done){
				UserModel.createUser({
					username: 'username',
					password: 'password',
					email: 'emailemail.com'
				}, function(response){
					assert.equal(response.valid, false);
					assert.equal(response.errorMessages.length, 1);
					done();
				});
			});
		});
	});

	describe('readUser()', function(){
		it('should return the test user', function(done){
			UserModel.readUser({
				id: testUserID
			}, function (resp) {
				assert.equal(String(resp._id), String(testUserID));
				done();
			});
		});
	});

	describe('updateUser()', function(){
		it('should update the test user', function(){
		});
	});

	describe('deleteUser()', function(){
		it('should remove the test user', function(done){
			UserModel.deleteUser({
				id: testUserID
			}, function (resp) {
				assert.equal(resp, 1);
				done();
			});
		});
	});

});

// Connect to the db
// MongoClient.connect("mongodb://localhost:27017/HostKitModel", function(err, db) {
	
// 	if(err) { return console.dir(err); }

// 	var UserModel = require('./../models/UserModel')(db);

//   	describe('UserModel', function() {
//   		describe('#createUser()', function(){
// 		  	it('should create and return a test user', function() {
// 		 	});

// 		  	it('remove the test user', function() {
// 		  	});
//   		});
// 	});

	
// });
