var express = require("express");
const Data = require('./message');
var mongoose = require("mongoose");
var DataModel = require("./models/Messages");


let myDatabase = function() {

}

myDatabase.prototype.displayData = function() {
  //  for (let i=0;i<this.message.length;i++) {
  //      console.log(this.message[i]);
   // }
}
myDatabase.prototype.getmessageLength = function(res) {
DataModel.count({}, function( err, count){
    if(err){
    return res.json({error:true});
   }else{
    return res.json({error:false,length:count});
   }
});
}
myDatabase.prototype.postData = function(_data,res) {
   let obj = {message:_data.message,
              id:_data.id,
              user:_data.user,
              type: _data.type,
              color:_data.color,
              comments:_data.comments,
              realMessage:_data.realMessage};   //added
  DataModel.create(obj,function(error,info) {
      if (error) {
          return res.json({error:true});
      }
      return res.json({error:false});
  });
}
myDatabase.prototype.postComment = function(id,comment,res) {

 DataModel.findOneAndUpdate({id:id},{comments:comment},function(error,oldData) {
    if (error) {
      return res.json({error:true});
    }
    else if (oldData == null) {
      return res.json({error:true});
    }
    return res.json({error:false});
  });
  return true;
}

myDatabase.prototype.getData = function(id,res) {
  DataModel.find({id:id},function(error,info) {
      if (error) {
          return res.json({error:true});
      }
      else if (info == null) {
          return res.json({error:true});
      }

      if (info.length == 1)    {
          return res.json({error:false,message:info[0].message,
                                        Id:info[0].id,
                                        user:info[0].user,
                                        type:info[0].type,
                                        color:info[0].color,
                                        comments:info[0].comments,
                                        realMessage:info[0].realMessage});
}
 else{
          return res.json({error:true});
        }
   });
}
myDatabase.prototype.getAllData = function(res) {
  DataModel.find({},function(error,info) {
      if (error) {
          return res.json({error:true});
      }
      else if (info == null) {
          return res.json({error:true});
      }

      if (info.length > 0)    {
      let chat = "";
      let newmessageId;
    for(let i =0; i<info.length;i++) {

             if(info[i].type == "Text") {
        chat += (
        '<div class="postBlock">' +
        '<p class="postli" style="background-color:'+ info[i].color +';">' + info[i].message + ": " + info[i].user + '<br>'+'<body>'+info[i].realMessage+'</body>'+'</p>'+
        '<div>' +

        "<button type=button id='" + info[i].id + "'class='collapsible' " + 'style="background-color:'+ info[i].color + ';">' + 'Comments</button>'+

        "<div id =" + "d"+ info[i].id + " class="+ "content"+"> " +"<hr>"
          +"<ul id=" + "p"+ info[i].id + ">"+info[i].comments+  " </ul>" + "<br>"
          +"<input id =" + "t" + info[i].id + " type="+ "text"+">"
          +"<input id =" + "c"+ info[i].id + " type=button name=commentb" +
          "value=PostComment onclick= " + "commentit("+  info[i].id + ")>" +"<br>"
        +"</div>"
        +"</div>"
        +"</div>"
        );
      }
      else if(info[i].type == "Image") {
        chat += (
        '<div class="postBlock">' +
        "<p class='imageUser'>" + info[i].user + "</p>" +
        "<img id='display' class='postli'" + 'style="background-color:'+ info[i].color +';" src="images/' + info[i].message +'"height="150" width="150">' +

        '<div>' +

      "<button type=button id='" + info[i].id + "'class='collapsible' " + 'style="background-color:'+ info[i].color + ';">' + 'Comments</button>'+

      "<div id =" + "d"+ info[i].id + " class="+ "content"+"> " +"<hr>"
        +"<ul id=" + "p"+ info[i].id + ">"+info[i].comments+  "</ul>" + "<br>"
        +"<input id =" + "t" + info[i].id + " type="+ "text"+">"
        +"<input id =" + "c"+ info[i].id + " type=button name=commentb" +
        "value=PostComment onclick= " + "commentit("+  info[i].id + ")>" +"<br>"
      +"</div>"
      +"</div>"
      +"</div>"
        );
      }
      else if(info[i].type == "Video") {
        chat += (
          "<div class='postBlock'>" +
          "<p class='imageUser'>" + info[i].user + "</p>" +
          "<video id='video' class='postli'" + "style='background-color:"+ info[i].color +";'" + "width='230' height='150' controls>" +
            "<source src='videos/" + info[i].message + "'type='video/mp4'>" +
          "</video>" +
          "<div>" +
          "<button type=button id ="+ info[i].id+ " class='collapsible' " + 'style="background-color:'+ info[i].color + ';">' + 'Comments</button>'+

              "<div id =" + "d"+ info[i].id + " class="+ "content"+"> " +"<hr>"
              +"<ul id=" + "p"+ info[i].id + ">"+info[i].comments+  "</ul>" + "<br>"
              +"<input id =" + "t" + info[i].id + " type="+ "text"+">"
              +"<input id =" + "c"+ info[i].id + " type=button name=commentb" +
              "value=PostComment onclick= " + "commentit("+  info[i].id + ")>" +"<br>"
            +"</div>"
            +"</div>"
            +"</div>"
        );
      }
      newmessageId = info[i].id;

    }

  res.json({error:false,test:chat, IDs:newmessageId});
}
 else{
          return res.json({error:true, IDs : 1});
        }
   });
}
myDatabase.prototype.putData = function(_data) {
  //for (let i=0;i<this.message.length;i++) {
  //  if (this.message[i] && this.message[i].id == _data.id ) {
    //  this.message[i] =
    //  new Data(_data.message,_data.id,_data.user,_data.type,_data.color,_data.comments,_data.realMessage);
      return true;
   // }
 // }
  //return false;
}

myDatabase.prototype.deleteData = function(id) {
 // for (let i=0;i<this.message.length;i++) {
  //  if (this.message[i] && id == this.message[i].id) {
  //      let tempPtr = this.message[i];
  //      this.message[i] = undefined;
  //      return tempPtr;
  //  }
//  }
  return null;
}

module.exports = myDatabase;
