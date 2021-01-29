$(document).ready(function () {
  //   get student detail from localstorage\
  let studentDetail = JSON.parse(localStorage.getItem("studentDetail"));

  let studentProfile = studentDetail.studentDetail;
  let timetable = studentDetail.enrolmentClass;

  console.log(studentProfile);
  console.log(timetable);

  // display student detail
  $("#studentID").html(studentProfile.studentID);
  $("#fullName").html(studentProfile.fullName);
  $("#emailAddress").html(studentProfile.emailAddress);
  $("#phone").html(studentProfile.phone);

  // display timetable
  let tableHtml;
  tableHtml =
    "<table class='table table-hover'><thead><tr><th>No.</th><th>Class Name</th><th>Unit Name</th><th>Class start</th><th>Class End</th><th>Delivery day</th></tr></thead><tbody>";

  timetable.forEach((item, index) => {
    tableHtml +=
      "<tr><td>" +
      (index + 1) +
      "</td><td>" +
      item.className +
      "</td><td>" +
      item.unitName + 
      "</td><td>" +
      item.classStart +
      "</td><td>" +
      item.classEnd +
      "</td></tr>";
  });

  tableHtml += "</tbody></table>";

  $("#tblTimetable").html(tableHtml);
});

