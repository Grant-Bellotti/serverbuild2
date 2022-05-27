var mongoose = require("mongoose");

var Data = mongoose.model("infos",{
  name: String,
  picture: String,
  yeescore: Number,
  yeetitle: String,

});

module.exports = Data;
