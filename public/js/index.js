const isAuthenticated = require("../../config/middleware/isAuthenticated");

$(document).ready(function() {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data", isAuthenticated).then(function(data) {
      $(".member-name").text(data.email);
    });
    console.log(userData)
  }).then();
  