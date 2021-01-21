$(document).ready(function () {
  // set listener to login button
  $("#loginBtn").click(async function () {
    let data = {
      studentID: $("#studentID").val(),
      email: $("#email").val(),
    };

    fetch student permission from api server
    const response = await fetch(
      "http://localhost:3000/api/v1/users/getUserPermission",
      {
        method: "POST",
        body: data,
      }
    );
    let student = await response.json();

    if (student.data.length <= 0) {
      alert("Please check you student ID or Email address again.");
      return;
    }

    // coding to open student detail page
    
  });
});
