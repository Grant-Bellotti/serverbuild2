function userClicked(){
  if($("#username").val() && $("#psw").val()) {
    $.post("/create",{username:$("#username").val(), password:$("#psw").val()},function(data) {
      if (data.redirect == "/profile") {
        createClicked();
      }
      window.location = data.redirect;
    });

    return false;
  } else {
    alert("username and password must not be blank");
  }
}
function showPassword() {
  var input = document.getElementById("psw");
  if (input.type === "password") {
    input.type = "text";
  }
  else {
    input.type = "password";
  }
}
function backClicked(){
  location.href = "/profile";
}
function createClicked(){
  $.ajax({
    url: "/createUserInfo",
    type: "POST",
    data: {picture:"empty.webp",yeescore:-1,yeetitle:"Has not taken survey"},
    success: function(data){

    } ,
    dataType: "json"
  });
}

$(document).ready(function(){

       $("#username").keydown( function( event ) {
           if ( event.which === 13 ) {
             userClicked();
             event.preventDefault();
             return false;
           }
       });

       $("#psw").keydown( function( event ) {
           if ( event.which === 13 ) {
             userClicked();
             event.preventDefault();
             return false;
           }
       });

});
