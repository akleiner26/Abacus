$(document).ready(function () {
    let viewGradesBtn = $(".viewGradesBtn");


    // Shows modal when "+ Add Student" button is clicked
    viewGradesBtn.on("click", function () {
        console.log($(this).attr("data-id"));
        
        let id = $(this).attr("data-id");
        window.location.href="/assignments/" +id
    })

    // function handleAssignUpdate() {
    //     var currentAssign = $(this)
    //       .parent()
    //       .parent()
    //       .data("assignment");
    //     window.location.href = "/cms?assignment_id=" + currentAssign.id;
    //   }



    // Pull the assignment ID that matches the assignment title from the Assignments table
    // Then go to Grades table,and pull all grades where AssignmentId matches
    // For each AssignmentId/gradeVal pulled, grab the correlating StudentId 
    // Then go to Students table and pull the name of the student where Grades.StudentId matches Students.id
});