$(document).ready(function () {

  var college = 'AIC';

  $("#logoAIC").click(function(){
    $("#logoSyd").addClass("imgGrayScale"); 
  if ($("#logoAIC").hasClass("imgGrayScale"))
    $("#logoAIC").removeClass("imgGrayScale");
  }
);
  
  $("#logoSyd").click(function(){
    $("#logoAIC").addClass("imgGrayScale"); 
  if ($("#logoSyd").hasClass("imgGrayScale"))
    $("#logoSyd").removeClass("imgGrayScale");
  }
);
  
  // set listener to login button
  $("#loginBtn").click(async function () {
    let data = {
      studentID: $("#studentID").val(),
      email: $("#email").val(),
    };

    //fetch student permission from api server
    const response = await fetch(
      "http://localhost:3000/api/v1/users/getUserPermission",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    let student = await response.json();

    if (!student.data) {
      alert("Please check you student ID or Email address again.");
      return;
    }

    // store variable to localstorage
    // localstorage need to store in string format.
    localStorage.setItem("studentDetail", JSON.stringify(student.data));

    // open homepage in new window
    window.open("./home.html", "_self");
  });
});
