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
	let addModal = $("#addModal");
	let closeBtn2 = $("#closeBtn2")
	
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
			})
	}

	addAssign.on("click", function () {
        addModal.css("display", "block");
	})

	// Closes "Create Assignment" modal
	closeBtn2.on("click", function (event) {
        addModal.css("display", "none");
	})

	newAssignForm.on("submit", function (event) {
		event.preventDefault();
		// console.log("--------------submitted---------------");

		let assignData = {
			title: titleInput.val().trim(),
			description: description.val().trim(),
			assignment_date: assignDate.val().trim(),
			due_date: dueDate.val().trim(),
			subject: subject.val().trim(),
		};

		// console.log(assignData);

		createAssign(assignData.title, assignData.description, assignData.assignment_date, assignData.due_date, assignData.subject)
		titleInput.val("");
		description.val("");
		assignDate.val("");
		dueDate.val("");
		subject.val("");
	});
});