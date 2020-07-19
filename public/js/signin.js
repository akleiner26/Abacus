$(document).ready(function () {
	let signinForm = $("form.signin");
	let emailInput = $("input#email-input");
	let passwordInput = $("input#password-input");

	// Validates that email and password are entered when form is submitted
	signinForm.on("submit", function (event) {
		event.preventDefault();

		var userData = {
			email: emailInput.val().trim(),
			password: passwordInput.val().trim()
		};

		if (!userData.email || !userData.password) {
			return;
		}

		// Runs signinUser function if we have an email and password
		signinUser(userData.email, userData.password);
		emailInput.val("");
		passwordInput.val("");
	});

	// Does a post to our "api/signin" route and redirects us the the members page if successful
	function signinUser(email, password) {
		$.post("/api/signin", {
			email: email,
			password: password
		})
			.then(function () {
				window.location.replace("/homepage");
			})
			.catch(function (err) {
				console.log(err);
			});
	}
});
