function submitClicked(){ 
  $.ajax({
    url: "/surveySubmit",
    type: "POST",
    data: { q1:$("input:radio[name='q1']:checked").val() , q2:$("input:radio[name='q2']:checked").val() ,
            q3:$("input:radio[name='q3']:checked").val() , q4:$("input:radio[name='q4']:checked").val() ,
            q5:$("input:radio[name='q5']:checked").val() , q6:$("input:radio[name='q6']:checked").val() ,
            q7:$("input:radio[name='q7']:checked").val() , q8:$("input:radio[name='q8']:checked").val() ,
            q9:$("input:radio[name='q9']:checked").val() , q10:$("input:radio[name='q10']:checked").val()},
    success: function(data){
      if(data.error)
        alert("you may need to select all the questions first");
      else {
        alert("your survey number is " + data.num);
        location.href = "/profile";
      }
    },
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
  $.get("/getInfo",function(data){
    if(data)
      $("#session").html("Welcome, " + data.name);

  });
});
