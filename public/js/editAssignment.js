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
	let updateAssign = $(".updateAssign");
	let modal = $("#myModal");
	let updateModal = $("#updateModal");
	let deleteBtn = $(".del-btn");
	let updateForm = $("form.updateForm")
	let updateAssignTitle = $("#updateAssignName");
	let updateAssignDescription = $("#updateAssignDescrip");
	let updateAssignDate = $("#updateAssignDate");
	let updateAssignDue = $("#updateAssignDue");
	let updateAssignSubject = $("#updateAssignSubject");
	let id;
	let closeBtn3 = $("#closeBtn3")

	function getForm() {
		return {
			title: updateAssignTitle.val().trim(),
			description: updateAssignDescription.val().trim(),
			assignment_date: updateAssignDate.val().trim(),
			due_date: updateAssignDue.val().trim(),
			subject: updateAssignSubject.val().trim()
		}
	}

	// Closes "Update Assignment" modal
	closeBtn3.on("click", function (event) {
		updateModal.css("display", "block");
	})

	updateAssign.on("click", function () {
		id = $(this).attr("data-id");
		let title = $(this).attr("data-title");
		let descriptionVal = $(this).attr("data-description")
		let assignDateVal = $(this).attr("data-assignDate");
		let dueDateVal = $(this).attr("data-dueDate");
		let subjectVal = $(this).attr("data-subject");
		console.log(id);
		updateAssignTitle.val(title);
		updateAssignDescription.val(descriptionVal);
		updateAssignDate.val(assignDateVal);
		updateAssignDue.val(dueDateVal);
		updateAssignSubject.val(subjectVal);
		updateModal.css("display", "block");

	});


	updateForm.on("submit", function (event) {
		event.preventDefault();
		console.log("WOOOHOOO")
		console.log(id);
		const updatedAssignment = getForm()
		$.ajax("/api/assignments/" + id, {
			type: "PUT",
			data: updatedAssignment
		}).then(
			function (data) {
				console.log("Changed Assignment to: " + data);
				location.reload();
			});
	})

	deleteBtn.on("click", function () {
		let id = $(this).attr("data-id");
		console.log(id);
		$.ajax("/api/assignments/" + id, {
			type: "DELETE"
		}).then(function (id) {
			console.log(`Deleted Assignment with ID = ${id}`)
			location.reload();
		})
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
				})
		}
	});
});