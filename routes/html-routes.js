var path = require("path");
var express = require("express");
var db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

// Routes for handlebars
module.exports = function (app) {

	// Sign in page
	app.get("/", function (req, res) {
		res.render("signin")
	});
	app.get("/signin", function (req, res) {
		res.render("signin");
	});
	//Create Account
	app.get("/create-account", function (req, res) {
		res.render("createAccount");
	});


	//Create Assignment
	app.get("/createAssignment", function (req, res) {
		res.render("createAssignment");
	});

	//Get all assigments
	app.get("/assignments", function (req, res) {

		db.Assignment.findAll({ raw: true })
			.then(function (assignmentData) {

				// console.log(assignmentData);

				// Create JSON with data from terminal and pass through in res.render

				res.render("viewAssignments", { Assignments: assignmentData });
			});
	});

	// Get class grades for a single assignment
	app.get("/assignments/:id", isAuthenticated, function (req, res) {

		// Grabs the students based on teacher who is signed in
		db.Student.findAll({
			raw: true,
			include: [db.Grade],
			where: {
				TeacherId: req.user.id
			}
		}).then(function (studentData) {
			console.log(studentData)

			let assignmentData = [];
			let studentIdArr = [];
			let studentId = 0;

			// Goes through studentData to pull out unique student ids
			for (let i = 0; i < studentData.length; i++) {
				// console.log(req.params.id)
				// console.log(studentData[i]["Grades.AssignmentId"])
				// console.log(studentData[i]["Grades.AssignmentId"] == req.params.id)

				if ((studentData[i]["Grades.AssignmentId"] == req.params.id || studentData[i]["Grades.AssignmentId"] === null) &&
					studentIdArr.includes(studentData[i].id) === false) {
					assignmentData.push(studentData[i]);
					studentIdArr.push(studentData[i].id);
				}
			}
			console.log(assignmentData)
			console.log(studentIdArr);

			res.render("soloAssignment", { grades: assignmentData });

		})
	});

	// View by students page 
	app.get("/students", isAuthenticated, function (req, res) {

		db.Assignment.findAll({ raw: true })
			.then(function (assignmentData) {
				// let assignmentCount = assignmentData.length;

				// req.user.id grabs the id of currently signed in user from passport
				db.Student.findAll({
					raw: true,
					include: [db.Grade],
					where: {
						TeacherId: req.user.id
					}
				})
					.then(function (userData) {
						// console.log(userData);

						let studentData = [];
						let studentObj = {};
						let studentId = 0;
						let assignmentId = 0;

						for (let i = 0; i <= userData.length; i++) {

							// Pushes last student into student object
							if (i === userData.length) {
								while (assignmentId < assignmentData.length) {
									studentObj.grades.push(null);
									assignmentId++;
									// console.log(`New assignment ID is ${assignmentId}`)
								}
								studentData.push(studentObj);
							} else {

								if (studentId !== userData[i].id) {
									if (i > 0) {
										// console.log(`Current assignment ID is ${assignmentId}`)
										while (assignmentId < assignmentData.length) {
											studentObj.grades.push(null);
											assignmentId++;
											// console.log(`New assignment ID is ${assignmentId}`)
										}

										studentData.push(studentObj)
									};

									studentObj = {};
									assignmentId = 0;
									studentId = userData[i].id;
									studentObj.grades = [];

									studentObj.first_name = userData[i].first_name;
									studentObj.last_name = userData[i].last_name;
								}


								if (userData[i]['Grades.AssignmentId'] !== null) {
									assignmentId = userData[i]['Grades.AssignmentId'];

									console.log(`Reassigned assignment ID is ${assignmentId}`)

									studentObj.grades.push(userData[i]['Grades.gradeVal']);
								}
								// console.log(`Reassigned assignment ID is ${assignmentId}`)
							}
						}
						// console.log(studentData);

						res.render("viewByStudents", { students: studentData, assignments: assignmentData });
					});
			})
	});

	// Create Account
	app.get("/createAccount", function (req, res) {

		res.render("createAccount");
	});
	//Teacher Portal
	app.get("/userportal", isAuthenticated, function (req, res) {

		res.render("index");
	});

	//Grades
	app.get("/grades", isAuthenticated, function (req, res) {
		res.render("grades");
	});

	// End passport session on logout
	app.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	});

	//Catch all
	app.get("*", function (req, res) {
		res.render("index");
	});
};
