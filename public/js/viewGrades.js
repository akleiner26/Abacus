$(document).ready(function () {
    let viewGradesBtn = $(".viewGradesBtn");


    // Shows modal when "+ Add Student" button is clicked
    viewGradesBtn.on("click", function () {
        console.log($(this).attr("data-id"));
        console.log($(this).attr("data-title"));
        
        let id = $(this).attr("data-id");
        let title = $(this).attr("data-title");
        window.location.href="/assignments/" +id
    })
});