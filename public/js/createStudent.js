// $(document).ready(function () {
//     let addStudentBtn = $("#addStudentBtn");

//     addStudentBtn.on("click", function () {
//         console.log("clicked");
//     })
// });

$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })