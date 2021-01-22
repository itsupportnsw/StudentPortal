$(document).ready(function () {
  //   get student detail from localstorage\
  let studentDetail = JSON.parse(localStorage.getItem("studentDetail"));

  let studentProfile = studentDetail.studentDetail;
  let timetable = studentDetail.enrolmentClass;

  console.log(studentProfile);
  console.log(timetable);

  // display student detail
  $("#studentID").html(studentProfile.studentID);

  // display timetable
  let tableHtml;
  tableHtml =
    "<table class='table table-hover'><thead><tr><th>No.</th><th>Class Name</th><th>Trainer</th><th>Class date</th><th>Class time</th><th>Unit Name/Course</th></tr></thead><tbody>";

  timetable.forEach((item, index) => {
    tableHtml +=
      "<tr><td>" +
      (index + 1) +
      "</td><td>" +
      item.className +
      "</td><td>Dom</td><td>21/01/2021</td><td>08.30am</td><td>1234</td></tr>";
  });

  tableHtml += "</tbody></table>";

  $("#tblTimetable").html(tableHtml);
});
