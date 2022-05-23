function submitInfo() {
  user = $('#tempUser').val();
  pw = $('#password').val();

  $.ajax({
    url: "/check",
    type: "GET",
    data: {username:user,password:pw},
    success: function(data){
        if (data.error){
          alert(data.message);
        }
        else {
          if(user != "abc" && pw != "abc") {
            alert("that account does not have administrator privileges");
            return;
          }
          else {
            location.href = "/yeeview";
          }
        }
      } ,
    dataType: "json"
  });

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
