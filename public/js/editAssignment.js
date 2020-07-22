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
	
	addAssign.on("click", function () {
        modal.css("display", "block");
	})

	updateAssign.on("click", function () {
		updateModal.css("display", "block");
		let id = $(this).attr("data-id");
		let title = $(this).attr("data-title");
		let descriptionVal = $(this).attr("data-description")
		let assignDateVal= $(this).attr("data-assignDate");
		let dueDateVal = $(this).attr("data-dueDate");
		let subjectVal = $(this).attr("data-subject");
		console.log(id);
		titleInput.val(title);
		description.val(descriptionVal);
		assignDate.val(assignDateVal);
		dueDate.val(dueDateVal);
		subject.val(subjectVal);
		 updatedAssignment = {
			id: id,
			title: title,
			description: descriptionVal,
			assignment_date: assignDateVal,
			due_date: dueDateVal,
			subject: subjectVal
		} 
		updateForm.on("submit", function (event) {
		$.ajax("/api/assignments/" + id, {
			type: "PUT",
			data: updatedAssignment
		}).then (
			function (updatedAssignment){
				console.log("Changed Assignment to: " + updatedAssignment);
				location.reload();
			});
		})
	
		});

	deleteBtn.on("click", function(){
		let id = $(this).attr("data-id");
		console.log(id);
		$.ajax("/api/assignments/" + id, {
			type: "DELETE"
		}).then (function(id){
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