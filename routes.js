let path = require("path");
let express = require("express");
var formidable = require('formidable');
var mv = require('mv');
var passport = require("passport");

//Look at below web page for info on express.Router()
//https://scotch.io/tutorials/learn-to-use-the-new-router-in-expressjs-4
let router = express.Router();

//request is info sending to server from client.
//response is info sending to client from server.

router.use(function(req, res, next) {
  res.locals.currentUserjy = req.user;
  res.locals.errors = req.flash("error");
  res.locals.infos = req.flash("info");
  next();
});

//////////////////////////////////////////////////////

router.get("/successroot", function(req, res) {
  res.json({redirect:"/"});
});
router.get("/failroot", function(req, res) {
  res.json({redirect:"/"});
});
router.get("/successsignup", function(req, res) {
  res.json({redirect:"/profile"});
});
router.get("/failsignup", function(req, res) {
  res.json({redirect:"/profileLogin"});
});
router.get("/successlogin", function(req, res) {
  res.json({redirect:"/profile"});
});
router.get("/faillogin", function(req, res) {
  res.json({redirect:"/profileLogin"});
});

///////////////////////////////////////////////

router.get("/",function(req,res){
  res.sendFile(path.resolve(__dirname + "/public/views/home.html"));  //changed
});
router.get("/profile",function(req,res){
  let thePath;
  if (req.isAuthenticated()) {
    thePath = path.resolve(__dirname + "/public/views/profile.html");
    res.sendFile(thePath);
  } else {
    thePath = path.resolve(__dirname + "/public/views/profileLogin.html");
    res.sendFile(thePath);
  }
});
router.get("/signup", function(req, res) {
  let thePath = path.resolve(__dirname,"public/views/signup.html");
  res.sendFile(thePath);
});
router.get("/profileLogin",function(req,res){
  res.sendFile(path.resolve(__dirname + "/public/views/profileLogin.html"));  //changed
});
router.get("/survey",function(req,res){
  let thePath;
  if (req.isAuthenticated()) {
    thePath = path.resolve(__dirname + "/public/views/survey.html");
    res.sendFile(thePath);
  } else {
    thePath = path.resolve(__dirname + "/public/views/profileLogin.html");
    res.sendFile(thePath);
  }
});

router.get("/userInfo",function(req,res){
  if (req.isAuthenticated()) {
    console.log("req isAuthenticated");
    res.json({username:req.user.username});
  }
  else {
    console.log("req is not Authenticated");
    res.json(null);
  }
});
router.get("/logout", function(req, res) {
  if (req.isAuthenticated()) {
    console.log("logout successful");
    req.logout();
    res.redirect("/successroot");
  } else {
    res.redirect("/failroot");
  }
});
router.post("/login", passport.authenticate("login", {
  successRedirect: "/successlogin",
  failureRedirect: "/faillogin",
  failureFlash: true
}));

/////////////////////////////////////////////////

const myDatabase = require('./myDatabase');
let db = new myDatabase();


const mymessDatabase = require('./messageDatabase');
let messageDb = new mymessDatabase();


const Data = require('./Data');
const MessageData = require('./message');
let messageID = 1;
let filename2;

//////////////////////////////////
let thisPost;
router.get("/userPage",function(req,res){
  res.sendFile(path.resolve(__dirname + "/public/views/userPage.html"));  //changed
});

router.post("/userPage",function(req,res){
  thisPost = req.body.PostID;
  res.json({});
});

router.get("/getPostID",function(req,res){
  console.log(thisPost);
  res.json({ID:thisPost});
});


router.post('/fileupload', function(req, res) {
    console.log("router.post fileupload");
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var oldpath = files.image.path;
        var newpath = __dirname + '/public/images/' + files.image.name;
        console.log('Received image: ' + files.image.name);
        mv(oldpath, newpath, function (err) {
//            if (err) throw err;
            if (err)
                res.json({error:false,filename2: "empty.webp"});
            else
                res.json({error:false,filename2: files.image.name });
        });
    });
});
router.post('/videoupload', function(req, res) {
    console.log("router.post fileupload");
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var oldpath = files.video.path;
        var newpath = __dirname + '/public/videos/' + files.video.name;
        console.log('Received video: ' + files.video.name);
        mv(oldpath, newpath, function (err) {
//            if (err) throw err;
            if (err)
                res.json({error:false,video: "empty.webp"});
            else
                res.json({error:false,video: files.video.name });
        });
    });
});

router.post('/storeMessage', function(req, res){
  let message = req.body.message.trim();
  let id = parseInt(req.body.id.trim());
  let user = req.body.user.trim();
  let type = req.body.type.trim();
  let color = req.body.color.trim();
  let comments = req.body.comments;
  let realMessage = req.body.realMessage.trim();
  let propic = req.body.propic.trim();
 // let yeetitle = req.body.yeetitle.trim();
 //let survey= req.body.survey.trim();

  if (message == "") {
      res.json({error:true,message:"Bad Message"});
      return;
  }
  //let obj = new MessageData(message,id,user,type,color,comments,realMessage,propic,yeetitle); //the -1 is temporary, is the yee rating
  let obj = new MessageData(message,id,user,type,color,comments,realMessage,propic); //the -1 is temporary, is the yee rating
  messageID = id + 1;
  return(messageDb.postData(obj,res));

});

router.post('/storeComment', function(req, res){
  let message = req.body.text.trim();
  let id = parseInt(req.body.messageID.trim());
  let user = req.body.user.trim();
  let oldComment = req.body.oldComment;
  let color = req.body.color;
 //let survey= req.body.survey.trim();
  if (message == "") {
      res.json({error:true,message:"Bad Message"});
      return;
  }

let testComment =
`
${oldComment}
  <div class="commentStuff commentBlock" style="background-color:${color}">
  ${user}:
  ${message}
  </div>
  `

  return(messageDb.postComment(id,testComment,res));

});
router.put('/updateMessagesPropic', function(req, res){
  if (req.isAuthenticated()) {
    let user = req.user.username;
    let profilepic = req.body.profilepic.trim();
       return(messageDb.Updateprofile(user,profilepic,res));
    }
});
router.put('/updateMessagesYT', function(req, res){
  if (req.isAuthenticated()) {
    let user = req.user.username;
    let yeetitle = req.body.yeetitle.trim();
       return(messageDb.Updateyeetitle(user,yeetitle,res));
    }
});
router.get('/getmessageLength', function(req, res){
return(messageDb.getmessageLength(res))
});

router.get('/getData', function(req, res){
return(messageDb.getData(req.query.messageID,res))
});

router.get('/getstoredMessages', function(req, res){

return(messageDb.getAllData(res));

});
router.get('/getMessageid', function(req, res){
  res.json(messageID);

});
router.post('/setMessageid', function(req, res){

  messageID = req.body.ID;
  res.json(true);

});
/////Checks Login Info//////




module.exports = router;
