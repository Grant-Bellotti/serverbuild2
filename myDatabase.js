
var express = require("express");
var mongoose = require("mongoose");
var DataModel = require("./models/userData");

const Data = require('./Data');

let myDatabase = function() {
}



myDatabase.prototype.postData = function(data,res) {
//  let obj = {ident:data.ident,name:data.name};
console.log(data.name + data.name);
  let obj = {name:data.name,picture:data.picture,yeescore:data.yeescore};   //added
  DataModel.create(obj,function(error,info) {
      if (error) {
          return res.json({error:true});
      }
      return res.json({error:false});
  });
}

myDatabase.prototype.getData = function(name,res) {

  DataModel.find({name:name},function(error,info) {
      if (error) {
          return res.json({error:true});
      }
      else if (info == null) {
          return res.json({error:true});
      }

      if (info.length == 1)
          return res.json({error:false,name:info[0].name,picture:info[0].picture,yeescore:info[0].yeescore});
      else
          return res.json({error:true});
   });
}

myDatabase.prototype.surveyNumber = function(name,num,res) {
  DataModel.find({name:name},function(error,info) {
      if (error) {
          return res.json({error:true});
      }
      else if (info == null) {
          return res.json({error:true});
      }
      if (info.length == 1 && parseInt(info[0].yeescore) < 0) {
        let retNum = num;
        let done = false;
        for(let i=10; i>0; i--) {
          if(retNum >= (4*i) && !done) {
            retNum = i;
            done = true;
          }
        }
        console.log("Yee survey num: " + retNum);
        DataModel.findOneAndUpdate({name:name},{yeescore:retNum},function(error,oldData) {
          if (error) {
            return res.json({error:true});
          }
          else if (oldData == null) {
            return res.json({error:true});
          }
          return res.json({error:false,num:retNum});
        });
      } else {
          return res.json({error:true,message:"the survey has already been taken on this account"});
      }
   });
}

myDatabase.prototype.putData = function(data,res) {
  DataModel.findOneAndUpdate({name:data.name},{picture:data.picture},function(error,oldData) {
    if (error) {
      return res.json({error:true});
    }
    else if (oldData == null) {
      return res.json({error:true});
    }
    return res.json({error:false});
  });
}

myDatabase.prototype.deleteData = function(ident,res) {
    DataModel.remove({name:name},function(error,removed) {
        if (error) {
            return res.json({error:true});
        }
        if (removed.result.n == 0)
            return res.json({error:true});
        return res.json({error:false});
    });
}

module.exports = myDatabase;
