// const isAuthenticated = require("../../config/middleware/isAuthenticated");

$(document).ready(function () {
	let studentsBtn = $("#studentsBtn");

	studentsBtn.on("click", function () {
		window.location.replace("/students");
	})

	// This file just does a GET request to figure out which user is logged in
	// and updates the HTML on the page
	$.get("/api/user_data").then(function (data) {
		$(".member-name").text(data.email);
	});
	// console.log(userData)
})