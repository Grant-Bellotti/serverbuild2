let action = "Update";
function setAction(actionParam) {
  action = actionParam;
}

function logoutClicked(){
  $.get("/logout",function(data){
    window.location = data.redirect;
  });
  return false;
}

function showPassword() {
  var input = document.getElementById("newPassword");
  if (input.type === "password") {
    input.type = "text";
  }
  else {
    input.type = "password";
  }
}

function uploadSuccess(data) {
  if (action == "Update") {
    $.get("/getInfo",function(info){
      let tempPic = data.filename2;
      if(!$("#uploader").val())  {
        tempPic = info.picture;
      }
      $.ajax({
        url: "/update",
        type: "PUT",
        data: {picture:tempPic,yeescore:info.yeescore,yeetitle:info.yeetitle},

        success: function(data2){
          if (data2.error)
            alert(data2.message);
          else {
            alert("account updated");
            display.src = "images/" + tempPic;
          }
        } ,
      dataType: "json"
      });
      $.ajax({
        url: "/updateMessagesPropic",
        type: "PUT",
        data: {user:info.name,profilepic:tempPic},

        success: function(data2){
          if (data2.error)
            alert(data2.message);
          else
            console.log("goodUpdataeProfilePicMessage");
        } ,
      dataType: "json"
      });
    });
  }
}

$(document).ready(function(){
  $.get("/getInfo",function(data){
    $("#session").html("Edit Profile: " + data.name);
    display.src = "images/" + data.picture;
    if(data.yeescore > -1) {
      $("#yeescore").html("Yee Survey Score: " + data.yeescore);
    }
    if(data.yeetitle != "A") {
      $("#yeetitle").html("Yee Title: " + data.yeetitle);
      }


  });

////////////////////////////////////////////////////////////////////////////

  $("form").submit(function(event) {
    if($("#newPassword").val().trim()) {
      $.ajax({
        url: "/changePassword",
        type: "PUT",
        data: {newPassword:$("#newPassword").val()},
        success: function(data){
          if(data.error) {
            alert(data.message);
          } else {
            $("#newPassword").val("");
          }
        } ,
      dataType: "json"
      });
    }

    let data = new FormData($(this)[0]);
    $.ajax({
      url: '/fileupload',
      type: 'POST',
      data: data,
      processData: false, // These two are needed to prevent JQuery from processing the form data
      contentType: false,
      mimeType: 'multipart/form-data',
      dataType: 'json', // Without this, the server's response will be a string instead of a JSON object
      success: uploadSuccess
    });
    return false;
  });

});
