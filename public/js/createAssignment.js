// NOTES
// Look into bootstrap error at bottom of code -- not sure exactly how it works
// Check post route with api-routes.js

$(document).ready(function () {
	let newAssignForm = $("form.newAssign");
	let titleInput = $("input#title");
	let description = $("input#description");

	
	// Validates that email and password fields are not blank when 'create account' button is clicked
	newAssignForm.on("submit", function (event) {
		event.preventDefault();
		console.log("--------------submitted---------------");


		console.log(userTypeInput.val());
		let userData = {
			first_name: titleInput.val().trim(),
			last_name: description.val().trim(),
			user_type: userTypeInput.val(),
			email: emailInput.val().trim(),
			// Teacher ID should be added as a condition if the user is a student. We should also probably have it take in the teacher's name but then save it as the teacher id into workbench
			// teacher_id: teacherIdInput.val().trim(),
			password: passwordInput.val().trim()
		};

		console.log(userData);

		if (!userData.email || !userData.password) {
			return;
		}
		// Run function registerUser if email and password are valid
		registerUser(userData.first_name, userData.last_name, userData.user_type, userData.email, userData.password);
		titleInput.val("");
		description.val("");
		userTypeInput.val("");
		emailInput.val("");
		passwordInput.val("");

		

		// // Does a post to the register route and redirects to homepage (index) if successful
		function registerUser(first_name, last_name, user_type, email, password) {
			$.post("/api/createAccount", {
				first_name: first_name,
				last_name: last_name,
				user_type: user_type,
				email: email,
				password: password
			})
				.then(function (data) {
					window.location.replace("/userportal");
					// Throws up bootstrap alert if there is an error
				})
				//for some reason this was causing an error. then.catch is not a function
				// .catch(handleLoginErr);
		}

		function handleLoginErr(err) {
			$("#alert .msg").text(err.responseJSON);
			$("#alert").fadeIn(500);
		}
	});
});