var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var express = require("express");
var bodyParser = require('body-parser');   //added

var flash = require("connect-flash");
var mongoose = require("mongoose");
var passport = require("passport");
var path = require("path");
var session = require("express-session");
let http = require('http');


var setUpPassport = require("./setuppassport");
var routes = require("./routes");
var routesUser = require("./routesUser");


//var setUpPassport = require("./setuppassport");


var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


mongoose.connect("mongodb://127.0.0.1:27017/group1db");
//mongoose.connect("mongodb://localhost:27017/group1db"); //change localhost to 127.0.0.1
setUpPassport();

app.use('/favicon.ico', express.static('public/favicon.webp'));
app.use('/style.css', express.static('public/css/style.css'));
app.use('/js', express.static('./public/js'));
//app.use('/',express.static('./public'));

app.use(express.static(path.join(__dirname, "public")));

//app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: "LUp$Dg?,I#i&owP3=9su+OB%`JgL4muLF5YJ~{;t",
  resave: true,
  saveUninitialized: true
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);
app.use(routesUser);

////////Socekt Code//////////
let server = http.createServer(app);
let io = require('socket.io')(server);

io.on('connection', function(socket) {

  socket.emit('welcome', { message: 'Welcome!', id: socket.id });

  socket.on('update', function (data) {
      io.emit('update', data);
  });
  socket.on('updateComments', function (data) {
      io.emit('updateComments', data);
  });
});
//////////////////////////////

var port = process.env.PORT || 3001;
server.listen(port);
