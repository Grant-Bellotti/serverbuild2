function submitInfo() {
  user = $('#tempUser').val();
  pw = $('#password').val();

  $.ajax({
    url: "/yeesideLogin",
    type: "GET",
    data: {username:user,password:pw},
    success: function(data){
      if (data.error){
        alert(data.message);
      }
      else {
        location.href = "/yeeview";
      }
    } ,
    dataType: "json"
  });

  return false;
}

function showPassword() {
  var input = document.getElementById("password");
  if (input.type === "password") {
    input.type = "text";
  }
  else {
    input.type = "password";
  }
}

$(document).ready(function(){

});
