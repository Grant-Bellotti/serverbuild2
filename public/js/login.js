function userClicked(){
  if($("#username").val() && $("#psw").val()) {
    $.post("/login",{username:$("#username").val(), password:$("#psw").val()},function(data) {
     window.location = data.redirect;
    });

    return false;
  } else {
    alert("username and password must not be blank");
  }
}
function signupClicked(){
  location.href = "/signup";
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
