var path = require("path");
var express = require("express");
var db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

// Routes for handlebars
module.exports = function (app) {
  
// Sign in page
  app.get("/", function(req, res) {
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
  //Get single assignment
  app.get("/assignments/:assignment", isAuthenticated, function (req, res) {
    res.render("soloAssignment");
  });
  //Get all assigments
  app.get("/assignments", function (req, res) {
    
    db.Assignment.findAll({ raw: true })
      .then(function (assignmentData) {

        console.log(assignmentData);

        // Create JSON with data from terminal and pass through in res.render

        res.render("viewAssignments", { Assignments: assignmentData });
      });
  });



// View by students page 
  app.get("/students", isAuthenticated, function (req, res) {
    db.Student.findAll({ raw: true })
      .then(function (userData) {
        // console.log(userData);

        res.render("viewByStudents", { students: userData });
      });
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

//Catch all
  app.get("*", function (req, res) {
    res.render("index");
  });
};
