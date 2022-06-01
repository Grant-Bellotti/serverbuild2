let ident;

let messageid;
let socket = io();

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
      for(let i=2; i<=data2.IDs;i++) {
        collapseIt(i);
      }
    }
    let newID = data2.IDs +1;
    messageid = newID;

  } ,
  dataType: "json"
  });
});

//Get message from server.
socket.on('update', (data) => {
  let para = document.createElement("div");
if(data.type == "Text") {
  $("#messages").append(
    `<div class="postBlock" id=${data.id}>` +
    '<p class="postli" style="background-color:'+ data.color +';">' + data.user + ": " + data.msg + '<br>'+'<body>'+data.bodyMSG+'</body>'
    +'</p>'
      +"</div>"
  );
}
else if(data.type == "Image") {
  $("#messages").append(
    `<div class="postBlock" id=${data.id}>` +
    `<p class='postli' style="background-color:${data.color};">`+ data.user + ": " +  data.bodyMSG +
    "<img id='display' class='postli'" + 'style="background-color:'+ data.color +';" src="images/' + data.msg +'"height="100" width="100">' +"</p>"
     +"</div>"
  );
}
else if(data.type == "Video") {
  $("#messages").append(

    `<div class="postBlock" id=${data.id}>` +
    `<p class='postli' style="background-color:${data.color};">`+ data.user + ": " +  data.bodyMSG +
    "<video id='video'" + "style='background-color:"+ data.color +";'" + "width='150' height='90' controls>" +
    "<source src='videos/" + data.msg + "'type='video/mp4'>" +
    "</video>" +"</p>"
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
   messageid++;
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
      let bodyMSG = $('#postC').val();
      let color = getRandomColor()

      if (type == "Text") {
        msg = $('#postT').val();

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
        bodyMSG = $('#postT').val();
        if(msg == "empty.webp") {
          alert ("image is required");
          return;
        }
        else if(bodyMSG == "") {
          alert ("title is required");
          return;
        }
      }
      else if (type == "Video") {
        bodyMSG = $('#postT').val();
        msg = data.video;

        if(msg == "empty.webp") {
          alert ("video is required");
          return;
        }
        else if(bodyMSG == "") {
          alert ("title is required");
          return;
        }
      }


          $.ajax({
          url: "/getInfo",
          type: "GET",
          data: {},
          success: function(data2){
            $.ajax({
              url: "/storeMessage",
              type: "POST",
              data: {message:msg,id:messageid,user:user,type:type,color:color,comments:"",realMessage:bodyMSG,propic:data2.picture,yeetitle:data2.yeetitle},
              success: function(data){

              } ,
              dataType: "json"
                  });
             socket.emit('update', {'id':messageid,'type':type, 'msg': msg,'user':user,'color':color,'bodyMSG':bodyMSG,'picture':data2.picture,'yeetitle':data2.yeetitle});
          } ,
          dataType: "json"
          });

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
  $.ajax({
      url: "/userPage",
      type: "POST",
      data: {PostID:messageID},
      success: function(data){
        window.open("/userPage", "_blank");
        //window.location = '/userPage'
      } ,
      dataType: "json"
    });

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

dragElement(document.getElementById("mydiv"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
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
