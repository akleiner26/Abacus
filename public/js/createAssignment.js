// NOTES
// Look into bootstrap error at bottom of code -- not sure exactly how it works
// Check post route with api-routes.j
$(document).ready(function () {
	let newAssignForm = $("form.newAssign");
	let titleInput = $("input#newAssignName");
	let description = $("input#newAssignDescrip");
	let assignDate = $("input#newAssignDate");
	let dueDate = $("input#newAssignDue");
	let subject = $("input#newAssignSubject");
	let addAssign = $("#addAssign");
	let modal = $("#myModal");
	
	addAssign.on("click", function () {
        modal.css("display", "block");
    })
	
	// Validates that email and password fields are not blank when 'create account' button is clicked
	newAssignForm.on("submit", function (event) {
		event.preventDefault();
		console.log("--------------submitted---------------");

		let assignData = {
			title: titleInput.val().trim(),
			description: description.val().trim(),
			assignment_date: assignDate.val().trim(),
			due_date: dueDate.val().trim(),
			subject: subject.val().trim(),
		};

		console.log(assignData);

		createAssign(assignData.title, assignData.description, assignData.assignment_date, assignData.due_date, assignData.subject)
		titleInput.val("");
		description.val("");
		assignDate.val("");
		dueDate.val("");
		subject.val("");

		function createAssign(title, description, assignment_date, due_date, subject) {
			$.post("/api/createAssignment", {
				title: title,
				description: description,
				assignment_date: assignment_date,
				due_date: due_date,
				subject: subject
			})
				.then(function (data) {
					window.location.replace("/assignments");
					// Throws up bootstrap alert if there is an error
				})
				//for some reason this was causing an error. then.catch is not a function
				// .catch(handleLoginErr);
		}

		function handleAssignUpdate() {
			var currentAssign = $(this)
			  .parent()
			  .parent()
			  .data("assignment");
			window.location.href = "/cms?assignment_id=" + currentAssign.id;
		  }

		function handleLoginErr(err) {
			$("#alert .msg").text(err.responseJSON);
			$("#alert").fadeIn(500);
		}
	});
});