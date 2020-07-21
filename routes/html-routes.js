var path = require("path");
var express = require("express");
var db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

// Routes for handlebars
module.exports = function (app) {
  app.get("/", function (req, res) {
    res.render("signin")
  });

  app.get("/create-account", function (req, res) {
    res.render("createAccount");
  });

  // Sign in page
  app.get("/signin", function (req, res) {
    res.render("signin");
  });

  app.get("/createAssignment", function (req, res) {
    //assuming we use a grades table
    res.render("createAssignment");
  });

  // View by students page 
  app.get("/students", isAuthenticated, function (req, res) {

    db.Assignment.findAll({ raw: true })
      .then(function (assignmentData) {
        // let assignmentCount = assignmentData.length;



        db.Student.findAll({ raw: true, include: [db.Grade] })
          .then(function (userData) {
            console.log(userData);

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
                  console.log(`New assignment ID is ${assignmentId}`)
                }
                studentData.push(studentObj);
              } else {

                if (studentId !== userData[i].id) {
                  if (i > 0) {
                    console.log(`Current assignment ID is ${assignmentId}`)
                    while (assignmentId < assignmentData.length) {
                      studentObj.grades.push(null);
                      assignmentId++;
                      console.log(`New assignment ID is ${assignmentId}`)
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
                  
              }

            } console.log(studentData);

            res.render("viewByStudents", { students: studentData, assignments: assignmentData });
            // });
          });
      })
  });

  // Sets the "homepage" as create an account. I suspect we may want to make a true homepage that gives user options.
  app.get("/createAccount", function (req, res) {
    //Currently shows the user portal but without login authentication 
    res.render("createAccount");
  });
  app.get("/userportal", isAuthenticated, function (req, res) {
    //Currently shows the user portal but without login authentication 
    res.render("index");
  });

  app.get("/assignments", function (req, res) {
    //under the assumption we use one page to create and view assignments, otherwise need to split this into two
    db.Assignment.findAll({ raw: true })
      .then(function (assignmentData) {

        console.log(assignmentData);

        // Create JSON with data from terminal and pass through in res.render

        res.render("viewAssignments", { Assignments: assignmentData });
      });
  });

  app.get("/grades", isAuthenticated, function (req, res) {
    //assuming we use a grades table
    res.render("grades");
  });


  app.get("/assignments/:assignment", isAuthenticated, function (req, res) {
    res.render("soloAssignment");
  });

  app.get("*", function (req, res) {
    res.render("index");
  });
};
