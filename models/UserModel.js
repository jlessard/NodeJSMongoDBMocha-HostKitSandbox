var UserModel = function (db) {

	var ObjectID = require('mongodb').ObjectID;

	var userCollection = db.collection('user');

	//// PRIVATE FUNCTIONS

	//runs through rules for each user field
	//user is valid if no error messages are generated
	var validateUser = function (options, callback) {
		var username = options.username,
			password = options.password,
			email = options.email;

		var errorMessages = [];

		if(username.length < 4 || username.length > 16){
			errorMessages.push('username must be between 4 and 16 characters long');
		}

		if(!username.match(/^[a-zA-Z0-9]+$/)){
			errorMessages.push('username can only contain letters and/or numbers');
		}

		// if(password.length < 4 || password.length > 16){
		// 	errorMessages.push('password must be between 4 and 16 characters long');
		// }

		// if(!password.match(/^([1-zA-Z0-1@.\s]{1,255})$/)){
		// 	errorMessages.push('password cannot contain the following characters: ‘,\*&$<;>');
		// }

		if(!email.match(/^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/)){
			errorMessages.push('email is invalid');
		}

		if(errorMessages.length){
			return {
				valid: false,
				errorMessages: errorMessages
			}
		} else {
			return {
				valid: true,
				username: username,
				password: password,
				email: email
			}
		}
	};

	//// CRUD
	//-------
	//creates a single user, durr
	//runs validation on user fields before inserting
	//returns new user OR list of error messages
	var _createUser = function (options, callback) {
		var username = options.username, // STRING
			password = options.password, // STRING
			email = options.email; // STRING

		var validatedUser = validateUser(options);
		if(validatedUser.valid){
			var newUser = {
				username: username,
				password: password,
				email: email,
				createdOn: new Date()
			};

			userCollection.insert(newUser, {safe: true}, function(err, result) {
				if(err) { return console.dir(err) };
				callback(result);
			});
		} else {
			callback(validatedUser);
		}
	};

	var _readUser = function (options, callback) {
		var id = options.id;

		userCollection.findOne({_id: id}, function(err, result) {
			callback(result);
		});

	};

	//removes a user, durr
	//returns true if successful
	//should look into upgraded security here?
	var _deleteUser = function (options, callback) {
		var id = options.id;

		userCollection.remove({_id:id}, {safe:true}, function(err, result) {
			if(err) { return console.dir(err) };
			callback(result);
		});
	};

	//updates a user
	//will merge the docs for the given id
	var _updateUser = function (options, callback) {

	};

	//// Nice to have functions
	//------------
	// checks the validity and uniqueness of a username
	// if valid and unique, returns true
	// else returns ['username is taken', 'username too long']
	var _checkUsername = function (options, callback) {
		var username = options.username,
			errorMessages = [];


	};

	// checks the existance of the username
	// returns relevant error messages if it doesnt exist
	// checks that the passwords match
	// return relevant error message
	// else returns user object minus password
	var _authenticateUser = function (options, callback) {

	};

	return {
		createUser: _createUser,
		readUser: _readUser,
		updateUser: _updateUser,
		deleteUser: _deleteUser,
		checkUsername: _checkUsername,
		authenticateUser: _authenticateUser
	}
};

module.exports = UserModel;