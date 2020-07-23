$(document).ready(function () {
    let modal = $("#myModal");
    let addBtn = $("#addBtn");
    let saveBtn = $("#saveBtn")
    let closeBtn = $("#closeBtn")
    let firstNameInput = $("input#first-name-input");
    let lastNameInput = $("input#last-name-input");
    let teacherIdInput = $("input#teacher-id-input");
    // Shows modal when "+ Add Student" button is clicked
    addBtn.on("click", function () {
        modal.css("display", "block");
    })
    $(window).on("click", function (event) {
        if (event.target == modal) {
            modal.css("display", "none");
        }
    })

    // Closes modal to add student
    closeBtn.on("click", function (event) {
        modal.css("display", "block");
    })

    // // Does a post to the createStudent route and redirects to students if successful
    function addStudent(first_name, last_name, teacher_id) {
        $.post("/api/createStudent", {
            first_name: first_name,
            last_name: last_name,
            TeacherId: teacher_id
        })
            .then(function (data) {
                // window.location.replace("/students");
                window.location.href = "/students";
                console.log("successfully saved!")
            })
    }

    saveBtn.on("click", function (event) {
        event.preventDefault();

        // console.log("clicked");

        let newStudent = {
            first_name: firstNameInput.val().trim(),
            last_name: lastNameInput.val().trim(),
            teacher_id: teacherIdInput.val().trim()
        }

        console.log(newStudent);
        if (!newStudent.first_name || !newStudent.last_name || !newStudent.teacher_id) {
            return;
        }

        // Run function addStudent if fields are valid
        addStudent(newStudent.first_name, newStudent.last_name, newStudent.teacher_id);
        firstNameInput.val("");
        lastNameInput.val("");
        teacherIdInput.val("");

    })
});