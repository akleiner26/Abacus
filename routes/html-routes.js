// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
var express = require("express");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

// Routes for handlebars
module.exports = function (app) {

  app.get("/signin", function (req, res) {
//sign in page
    res.render("signin");
  });

  app.get("/userportal", function (req, res) {
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
//sets the "homepage" as create an account. I suspect we may want to make a true homepage that give user options.
    res.render("createAccount");
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
