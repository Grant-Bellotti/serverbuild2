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
              realMessage:_data.realMessage,
              propic: _data.propic,
              yeetitle:_data.yeetitle};   //added
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
myDatabase.prototype.Updateprofile = function(user,picture,res) {

 DataModel.updateMany({user:user},{propic:picture},function(error,oldData) {
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
myDatabase.prototype.Updateyeetitle = function(user,yeetitle,res) {

 DataModel.updateMany({user:user},{yeetitle:yeetitle},function(error,oldData) {
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
  //console.log(id,"DATABASE");
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
                                        realMessage:info[0].realMessage,
                                        propic:info[0].propic,
                                        yeetitle:info[0].yeetitle
                                      });
}
 else{
          return res.json({error:true});
        }
   });
}

myDatabase.prototype.getComments = function(id,res) {
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
                              realMessage:info[0].realMessage,
                              propic:info[0].propic,
                              yeetitle:info[0].yeetitle});
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
          `<div class="postBlock" id=${info[i].id}>` +
          '<p class="postli" style="background-color:'+ info[i].color +';"' + `id=${info[i].id}>`  + info[i].user + ": " + info[i].message + '<br>'+'<body>'+info[i].realMessage+'</body>'+'</p>'
          +"</div>"
          );
      }
      else if(info[i].type == "Image") {


        chat += (
          `<div class="postBlock" id=${info[i].id}>` +
          `<p class='postli' style="background-color:${info[i].color};">` + info[i].user + ": " + info[i].realMessage +
          "<img id='display' class='postli'" + 'style="background-color:'+ info[i].color +';" src="images/' + info[i].message +'"height="150px" width="150px">' +"</p>"
                +"</div>"
          );

      }
      else if(info[i].type == "Video") {
        chat += (
          `<div class="postBlock" id=${info[i].id}>` +
          `<p class='postli' style="background-color:${info[i].color};">`+ info[i].user + ": " +  info[i].realMessage +
          "<video id='video'" + "style='background-color:"+ info[i].color +";'" + "width='150' height='90' controls>" +
          "<source src='videos/" + info[i].message + "'type='video/mp4'>" +
          "</video>" +"</p>"
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
