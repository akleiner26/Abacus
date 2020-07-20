var path = require("path");
var express = require("express");
var db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

// Routes for handlebars
module.exports = function (app) {

  // Sign in page
  app.get("/signin", function (req, res) {
    res.render("signin");
  });

  // View by students page 
  app.get("/students", function (req, res) {
    db.User.findAll({})
      .then(function (studentData) {

        console.log(studentData);

        // Create JSON with data from terminal and pass through in res.render

        res.render("viewByStudents", { Users: studentData });
      });
  });

  // Sets the "homepage" as create an account. I suspect we may want to make a true homepage that gives user options.
  app.get("/userportal", isAuthenticated, function (req, res) {
    //Currently shows the user portal but without login authentication 
    res.render("index");
  });
  app.get("/assignments", function (req, res) {
    //under the assumption we use one page to create and view assignments, otherwise need to split this into two
    res.render("assignments");
  });
  app.get("/grades", function (req, res) {
    //assuming we use a grades table
    res.render("grades");
  });
  app.get("*", function (req, res) {
    res.render("createAccount");
  });

  app.get("/assignments/:assignment", function (req, res) {
    res.render("soloAssignment");
  });

  
  // app.get("/", function (req, res) {
  //   // If the user already has an account send them to the members page
  //   if (req.user) {
  //     res.redirect("/homepage");
  //   }
  //   res.sendFile(path.join(__dirname, "../public/views/index.handlebars"));
  // });

  // app.get("/login", function (req, res) {
  //   // If the user already has an account send them to the members page
  //   if (req.user) {
  //     res.redirect("/homepage");
  //   }
  //   res.sendFile(path.join(__dirname, "../public/views/signin.handlebars"));
  // });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  // app.get("/homepage", isAuthenticated, function (req, res) {
  //   res.sendFile(path.join(__dirname, "../public/views/index.handlebars"));
  // });

};
