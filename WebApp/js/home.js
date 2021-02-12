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


  // convert photo data to base64
  function bufferToBase64(dataArray) {
    var data = new Uint8Array(dataArray);
    var image = Array.prototype.map.call(data, function (ch) {
        return String.fromCharCode(ch);
    }).join('');
    console.log("hi");
    return btoa(image);
}
console.log(studentProfile.photoData.data)
  var base64 = bufferToBase64(studentProfile.photoData.data); 
  var studentImage = "data:image/jpg;base64,"+base64;

  console.log(studentImage);

  // change image source to ProfileImage. (search jquery)

  $("#ProfileImg").attr('src',studentImage);

console.log("hello");


  // display timetable
  let tableHtml = "";

  timetable.forEach((item, index) => {
    tableHtml += '<div class="Card col12 col-md-4"><div><span class="th">Class Name : </span><span>'+
    item.className +'</span></div><div><span class="th">Unit Name :  </span><span>'+ item.unitName +' </span></div><div><span class="th">Class Start :  </span><span>'+ item.classStart +'</span></div><div><span class="th">Class End :  </span><span>'+ item.classEnd +'</span></div></div>'

  });

  console.log(tableHtml)

  
  $("#timetalbeCard").html(tableHtml)
});
