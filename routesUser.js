var express = require("express");
var passport = require("passport");
var path = require("path");

var User = require("./models/user");
var router = express.Router();

const myDatabase = require('./myDatabase');    //added
let db = new myDatabase();


const Data = require('./Data');

router.use(function(req, res, next) {
  res.locals.currentUserjy = req.user;
  res.locals.errors = req.flash("error");
  res.locals.infos = req.flash("info");
  next();
});

///////////////////////////////////////////////////////////////////

router.post("/createUserInfo", function(req, res) {
  if (req.isAuthenticated()) {
    let name = req.user.username;
    let picture = req.body.picture;
    let yeescore = parseInt(req.body.yeescore);
    let yeetitle  = req.body.yeetitle;
    let obj = new Data(name,picture,yeescore,yeetitle);
    return(db.postData(obj,res));

  }
  else {
    res.json(null);
  }
});

router.post("/create", function(req, res, next) {
  let username = req.body.username.trim();
  let password = req.body.password.trim();

  User.findOne({ username: username }, function(err, user) {
    if (err) {
      return next(err);
    }
    if (user) {
      req.flash("error", "User already exists");
      return res.redirect("/failsignup");
    }
    var newUser = new User({
      username: username,
      password: password
    });
    newUser.save(next);    //goes to user.js (userSchema.pre(save))
  });


}, passport.authenticate("login", {       //goes to setuppassport.js  (passport.use("login"))
  successRedirect: "/successsignup",
  failureRedirect: "/failsignup",
  failureFlash: true
}));

router.get("/getInfo", function(req, res) {
  if (req.isAuthenticated()) {
    let name = req.user.username;
    return(db.getData(name,res));

  } else {
    res.json(null);
  }
});

router.get('/checkAuthenticated', function(req, res){
  if (req.isAuthenticated()) {
    res.json({error:false,user:req.user.username});
  } else {
    res.json({error:true,message:"user is not authenticated"});
  }
});

router.put('/update', function(req, res){
  if (req.isAuthenticated()) {
    let name = req.user.username;
    let picture = req.body.picture.trim();


    let yeescore = parseInt(req.body.yeescore);
    let yeetitle = req.body.yeetitle;
    if (picture == "") {
        picture = "images/empty.webp";
    }

    let obj = new Data(name,picture,yeescore,yeetitle);
    return(db.putData(obj,res));

  } else {
    res.json({error:true});
  }

});

router.put('/changePassword', function(req, res){
  if (req.isAuthenticated()) {
    let name = req.user.username;
    let newPassword = req.body.newPassword.trim();
    User.findOne({username:name}, function(err, user) {
      if (err) {
        res.json({error:true ,message: "error" });
      }
      if (user) {
        return (user.changePassword(newPassword,name,User,res));
      }
    });
  } else {
    res.json({error:true});
  }
});

router.post('/surveySubmit', function(req, res){
  if (req.isAuthenticated()) {
    let name = req.user.username;

    if(!(parseInt(req.body.q1)+parseInt(req.body.q2)+
      parseInt(req.body.q3)+parseInt(req.body.q4)+
      parseInt(req.body.q5)+parseInt(req.body.q6)+
      parseInt(req.body.q7)+parseInt(req.body.q8)+
      parseInt(req.body.q9)+parseInt(req.body.q10))){
     return(res.json({error:true}));

    }else{
    let surveyNum =(parseInt(req.body.q1.substring(5,6))+parseInt(req.body.q2.substring(5,6))
                    +parseInt(req.body.q3.substring(5,6))+parseInt(req.body.q4.substring(5,6))
                    +parseInt(req.body.q5.substring(5,6))+parseInt(req.body.q6.substring(5,6))
                    +parseInt(req.body.q7.substring(5,6))+parseInt(req.body.q8.substring(5,6))
                    +parseInt(req.body.q9.substring(5,6))+parseInt(req.body.q10.substring(5,6)));
    console.log(surveyNum);
    return(db.surveyNumber(name,surveyNum,res));
    }

  }
});

module.exports = router;
