	// Create new students js file for this code and connect to handlebars so it pulls on page load
	$.get("/api/students")
	.then(function (data) {
		console.log(data);
	})
