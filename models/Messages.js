var mongoose = require("mongoose");

var message = mongoose.model("Message",{
  	message: String,
    id: Number,
    user: String,
    type: String,
    color: String,
    comments:String,
    realMessage: String,
    propic: String,
    yeetitle: String,
});

 

module.exports = message;