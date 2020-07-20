var path = require("path");
var express = require("express");
var db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

// Routes for handlebars
module.exports = function (app) {

  // Sign in page
  app.get("/", function (req, res) {
    res.render("signin");
  });
  app.get("/createAssignment", function (req, res) {
    //assuming we use a grades table
    res.render("createAssignment");
  });
  // View by students page 
  app.get("/students", isAuthenticated, function (req, res) {
    db.Student.findAll({ raw: true })
      .then(function (userData) {
        // console.log(userData);

        res.render("viewByStudents", { students: userData });
      });
  });

  // Sets the "homepage" as create an account. I suspect we may want to make a true homepage that gives user options.
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
