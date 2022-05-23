let ident;

let messageid;
let socket = io();
$.ajax({
  url: "/getmessageid",
  type: "GET",
  data: {'id':0},
  success: function(data){
    messageid = data;
  } ,
  dataType: "json"
});

//Get message from server.
socket.on('welcome', function(data) {
  let storedMessages = "4455";
  $.ajax({
    url: "/getstoredMessages",
    type: "GET",
    data: {'id':0},
    success: function(data2){
      if(data2.IDs > 1){
      storedMessages = data2.test;
      $("#messages").append(storedMessages);
      for(let i =2; i<=data2.IDs;i++) {
        collapseIt(i);
      }
    }
    let newID = data2.IDs +1;
    messageid = newID;
    $.ajax({
      url: "/setmessageid",
      type: "POST",
      data: {'ID':newID},
      success: function(data){
        console.log(data);
      } ,
      dataType: "json"
    });
  } ,
  dataType: "json"
  });
});

//Get message from server.
socket.on('update', (data) => {
  let para = document.createElement("div");

if(data.type == "Text") {
  $("#messages").append(
    '<div class="postBlock">' +
    '<p class="postli" style="background-color:'+ data.color +';">' + data.msg + ": " + data.user + '<br>'+'<body>'+data.bodyMSG+'</body>'+'</p>'+
    '<div>'+
    "<button type=button id ="+ messageid+ " class='collapsible' " + 'style="background-color:'+ data.color + ';">' + 'Comments</button>'+

        "<div id =" + "d"+ messageid + " class="+ "content"+"> " +"<hr>"
        +"<ul id=" + "p"+ messageid + "></ul>" + "<br>"
        +"<input id =" + "t" + messageid + " type="+ "text"+">"
        +"<input id =" + "c"+ messageid + " type=button name=commentb" +
        "value=PostComment onclick= " + "commentit("+  messageid + ")>" +"<br>"
      +"</div>"
      +"</div>"
      +"</div>"
  );
}
else if(data.type == "Image") {
  $("#messages").append(
    "<div class='postBlock'>" +
    "<p class='imageUser'>" + data.user + "</p>" +
    "<img id='display' class='postli'" + 'style="background-color:'+ data.color +';" src="images/' + data.msg +'"height="150" width="150">' +
    "<div>" +
    "<button type=button id ="+ messageid+ " class='collapsible' " + 'style="background-color:'+ data.color + ';">' + 'Comments</button>'+

        "<div id =" + "d"+ messageid + " class="+ "content"+"> " +"<hr>"
        +"<ul id=" + "p"+ messageid + "></ul>" + "<br>"
        +"<input id =" + "t" + messageid + " type="+ "text"+">"
        +"<input id =" + "c"+ messageid + " type=button name=commentb" +
        "value=PostComment onclick= " + "commentit("+  messageid + ")>" +"<br>"
      +"</div>"
      +"</div>"
      +"</div>"
  );
}
else if(data.type == "Video") {
  $("#messages").append(
    "<div class='postBlock'>" +
    "<p class='imageUser'>" + data.user + "</p>" +
    "<video id='video' class='postli'" + "style='background-color:"+ data.color +";'" + "width='230' height='150' controls>" +
      "<source src='videos/" + data.msg + "'type='video/mp4'>" +
    "</video>" +
    "<div>" +
    "<button type=button id ="+ messageid+ " class='collapsible' " + 'style="background-color:'+ data.color + ';">' + 'Comments</button>'+

        "<div id =" + "d"+ messageid + " class="+ "content"+"> " +"<hr>"
        +"<ul id=" + "p"+ messageid + "></ul>" + "<br>"
        +"<input id =" + "t" + messageid + " type="+ "text"+">"
        +"<input id =" + "c"+ messageid + " type=button name=commentb" +
        "value=PostComment onclick= " + "commentit("+  messageid + ")>" +"<br>"
      +"</div>"
      +"</div>"
      +"</div>"
  );
}

collapseIt(messageid);
$.ajax({
    url: "/getmessageid",
    type: "GET",
    data: {'id':0},
    success: function(data){
      messageid = data;
     } ,
     dataType: "json"
   });
});

socket.on('updateComments',(data) => {
  $("#"+"p"+data.messageID).append("<p> "+ data.user + ": " + data.text +  " <p>");
});

function changeView() {
  if ($("input:radio[name='type']:checked").val() == "Text") {
    document.getElementById("postC2").style.visibility = "visible";
    document.getElementById("postC").style.visibility = "visible";
    document.getElementById("uploader").style.visibility = "hidden";
    document.getElementById("uploader2").style.visibility = "hidden";
    document.getElementById("uploader3").style.visibility = "hidden";
    document.getElementById("uploader4").style.visibility = "hidden";
  }
  else if ($("input:radio[name='type']:checked").val() == "Image") {
    document.getElementById("postC").style.visibility = "hidden";
    document.getElementById("postC2").style.visibility = "hidden";
    document.getElementById("uploader").style.visibility = "visible";
    document.getElementById("uploader2").style.visibility = "visible";
    document.getElementById("uploader3").style.visibility = "hidden";
    document.getElementById("uploader4").style.visibility = "hidden";
  }
  else if ($("input:radio[name='type']:checked").val() == "Video") {
    document.getElementById("postC").style.visibility = "hidden";
    document.getElementById("postC2").style.visibility = "hidden";
    document.getElementById("uploader").style.visibility = "hidden";
    document.getElementById("uploader2").style.visibility = "hidden";
    document.getElementById("uploader3").style.visibility = "visible";
    document.getElementById("uploader4").style.visibility = "visible";
  }
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;

}

function uploadSuccess(data) {
  if (data.error) {
    alert(data.message);
    return;
  }
  $.get("/checkAuthenticated",function(info){
    if(info.error) {
      alert(info.message);
      return false;
    } else {
      let type = $("input:radio[name='type']:checked").val();
      let user = info.user;
      let msg = "";
      let bodyMSG = ''
      let color = getRandomColor()

      if (type == "Text") {
        msg = $('#postT').val();
        bodyMSG = $('#postC').val();

        if(msg == "") {
          alert ("title is required");
          return;
        }
        else if(bodyMSG == "") {
          alert ("message is required");
          return;
        }

      }
      else if (type == "Image") {
        msg = data.filename2;

        if(msg == "empty.webp") {
          alert ("image is required");
          return;
        }
      }
      else if (type == "Video") {
        console.log("===========" + data.video);
        msg = data.video;

        if(msg == "empty.webp") {
          alert ("video is required");
          return;
        }
      }

      $.ajax({
        url: "/storeMessage",
        type: "POST",
        data: {message:msg,id:messageid,user:user,type:type,color:color,comments:"",realMessage:bodyMSG},
        success: function(data){

        } ,
        dataType: "json"
      });
      socket.emit('update', {'type':type, 'msg': msg,'user':user,'color':color,'bodyMSG':bodyMSG});
      $('#postT').val("");
      $('#postC').val("");
      $('#uploader').val("");
    }
  });
}

function commentit(id){
  let text = $("#"+"t"+id).val();
  if(text != "") {
    $.get("/checkAuthenticated",function(info){
      if(info.error) {
        alert(info.message);
        return false;
      } else {
        let user = info.user;
        $.ajax({
          url: "/getData",
          type: "GET",
          data: {messageID:id},
          success: function(data){
            let oldComment = data.comments;
            console.log(oldComment);
            $.ajax({
              url: "/storeComment",
              type: "POST",
             data: {text: text,messageID:id,user:user,oldComment:oldComment},
              success: function(data2){

              } ,
              dataType: "json"
            });
          } ,
          dataType: "json"
        });
       socket.emit("updateComments",{"text":text,"messageID":id,"user":user})
       $("#t" + id).val("");
      }
    });
  }
}

function collapseIt(messageID){
  var coll = document.getElementById(messageID);
  coll.addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
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
  $("form").submit(function(event) {
    let data = new FormData($(this)[0]);
    if($("input:radio[name='type']:checked").val() == "Video") {
      $.ajax({
        url: '/videoupload',
        type: 'POST',
        data: data,
        processData: false, // These two are needed to prevent JQuery from processing the form data
        contentType: false,
        mimeType: 'multipart/form-data',
        dataType: 'json', // Without this, the server's response will be a string instead of a JSON object
        success: uploadSuccess
      });
    } else {
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
    }
    return false;
  });
  changeView();

  $.get("/getInfo",function(data){
    if(data)
      $("#session").html("Welcome, " + data.name);

  });
});
