// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/signin", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });
  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/createAccount", function(req, res) {
    console.log("---------------------------------------posted--------------------------------------------");
    db.Teacher.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
    })

    // res.redirect(307);
      .then(function() {
        console.log("---------------------redirecting-----------------------");
        res.redirect(307, "/api/signin");
      })
      // .catch(function(err) {
      //   res.status(401).json(err);
      // });
  });

  // Post request to add a student to database comes from createStudent.js
  app.post("/api/createStudent", function(req, res) {
    console.log("--------------etudiant cree-----------------------");
    console.log(req.body);
    db.Student.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      TeacherId: req.body.TeacherId
    })
    .then(function(data) {
      console.log(data);
    })
    res.status(200).end();
    res.redirect(307);
  });

// Route for logging user out
  app.get("/logout", isAuthenticated, function(req, res) {
    req.logout();
    res.redirect("/");
  });

// Route for getting some data about our user to be used client side
  app.get("/api/user_data", isAuthenticated, function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      // isAuthenticated();
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
//Student
  app.get("/api/students", isAuthenticated, function(req, res) {
    db.Student.findAll({})
      .then(function(studentData) {
        res.json(studentData);
      });
  });

  app.post("/api/createStudent", function(req, res) {
    console.log("---------------------------------------created student--------------------------------------------");
    db.Student.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      teacherId: req.body.teacherId,
    })
  });

//Assignment
  app.get("/api/assignments", isAuthenticated, function(req, res) {
    db.Assignment.findAll({})
      .then(function(assignmentData) {
        res.json(assignmentData);
      });
      console.log("--------------------------");
  });
  app.post("/api/createAssignment", function(req, res) {
    console.log("---------------------------------------created assignment--------------------------------------------");
    db.Assignment.create({
      title: req.body.title,
      description: req.body.description,
      assignment_date: req.body.assignment_date,
      due_date: req.body.due_date,
      subject: req.body.subject
    }).then (function (){res.end();})
      // .then(function() {
      //   console.log("---------------------redirecting-----------------------");
      //   res.redirect(307, "");
      // })
      // .catch(function(err) {
      //   res.status(401).json(err);
      // });
  });

  app.put("/api/assignments", function(req, res) {
    db.Assignment.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbAssignment) {
      res.json(dbAssignment);
    });
  });

  app.delete("/api/assignments/:id", function(req, res) {
    db.Assignment.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbAbacus) {
      res.json(dbAbacus);
    });
  });

//Grade
app.get("/api/grades", isAuthenticated, function(req, res) {
  db.Grade.findAll({})
    .then(function(gradeData) {
      res.json(gradeData);
    });
    console.log("--------------------------");
});
app.post("/api/addGrade", function(req, res) {
  console.log("---------------------------------------added grade--------------------------------------------");
  db.Grade.create({
    gradeVal: req.body.gradeVal,
    assignmentId: req.body.assignmentId,
    studentId: req.body.studentId,
  })
});

};
