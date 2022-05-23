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
        data: {picture:tempPic},
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

  });

  $("form").submit(function(event) {
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
