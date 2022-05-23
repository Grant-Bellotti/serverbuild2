var mongoose = require("mongoose");

var Data = mongoose.model("infos",{
  name: String,
  picture: String,
  yeescore: Number

});

module.exports = Data;
