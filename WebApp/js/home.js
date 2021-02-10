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
  let tableHtml = "";

  timetable.forEach((item, index) => {
    tableHtml += '<div class="Card col12 col-md-4"><div><span class="th">Class Name : </span><span>'+
    item.className +'</span></div><div><span class="th">Unit Name :  </span><span>'+ item.unitName +' </span></div><div><span class="th">Class Start :  </span><span>'+ item.classStart +'</span></div><div><span class="th">Class End :  </span><span>'+ item.classEnd +'</span></div></div>'

  });

  console.log(tableHtml)

  
  $("#timetalbeCard").html(tableHtml)
});
