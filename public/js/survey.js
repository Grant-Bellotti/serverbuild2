function submitClicked(){
  let surveyNum =(parseInt($("input:radio[name='q1']:checked").val()) + parseInt($("input:radio[name='q2']:checked").val()) +
                  parseInt($("input:radio[name='q3']:checked").val()) + parseInt($("input:radio[name='q4']:checked").val()) +
                  parseInt($("input:radio[name='q5']:checked").val()) + parseInt($("input:radio[name='q6']:checked").val()) +
                  parseInt($("input:radio[name='q7']:checked").val()) + parseInt($("input:radio[name='q8']:checked").val()) +
                  parseInt($("input:radio[name='q9']:checked").val()) + parseInt($("input:radio[name='q10']:checked").val()));
  if(!surveyNum) {
    alert("all questions must be answered");
    return
  }
  $.ajax({
    url: "/surveySubmit",
    type: "POST",
    data: {surveyNumber:surveyNum},
    success: function(data){
      if(data.error)
        alert(data.message);
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
