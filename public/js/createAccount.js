// Ensure lines 49-56 are working for bootstrap error --- not sure how this works??


$(document).ready(function () {
	let registerForm = $("form.register");
	let firstNameInput = $("input#email-input");
	let lastNameInput = $("input#email-input");
	let userTypeInput = $("input#email-input");
	let emailInput = $("input#email-input");
	let passwordInput = $("input#password-input");

	// Validate that email and password are not blank when 'create account' button is clicked
	registerForm.on("submit", function (event) {
		event.preventDefault();

		let userData = {
			first_name: firstNameInput.val().trim(),
			last_name: lastNameInput.val().trim(),
			user_type: userTypeInput.val(),
			email: emailInput.val().trim(),
			password: passwordInput.val().trim()
		};

		if (!userData.email || !userData.password) {
			return;
		}
		// Run function registerUser if email and password are valid
		registerUser(userData.first_name, userData.last_name, userData.user_type,userData.email, userData.password);
		firstNameInput.val("");
		lastNameInput.val("");
		userTypeInput.val("");
		emailInput.val("");
		passwordInput.val("");
	});

	// Does a post to the register route and redirects to homepage (index) if successful
	function registerUser(first_name, last_name, user_type, email, password) {
		$.post("/api/signup", {
			first_name: first_name,
			last_name: last_name,
			user_type: user_type,
			email: email,
			password: password
		})
			.then(function (data) {
				window.location.replace("/homepage");
			// Throws up bootstrap alert if there is an error
			})
			.catch(handleLoginErr);
	}

	function handleLoginErr(err) {
		$("#alert .msg").text(err.responseJSON);
		$("#alert").fadeIn(500);
	}
});