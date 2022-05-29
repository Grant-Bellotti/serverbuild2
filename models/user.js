var bcrypt = require("bcrypt-nodejs");
var SALT_FACTOR = 10;

var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  valueJY: { type: Number }
});


var noop = function() {};

userSchema.pre("save", function(done) {
  var user = this;

  if (!user.isModified("password")) {
    console.log("!user.isModified")
    return done();
  }
  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) { return done(err); }
    bcrypt.hash(user.password, salt, noop, function(err, hashedPassword) {
console.log("bcrypt.hash function callback  " + hashedPassword)
      if (err) { return done(err); }
      user.password = hashedPassword;
      user.valueJY = Math.floor(Math.random()*1000);
      done();
    });
  });
});

userSchema.methods.checkPassword = function(guess, done) {
  console.log("userSchema.methods.checkPassword")
  bcrypt.compare(guess, this.password, function(err, isMatch) {
  console.log("bcrypt.compare function callback isMatch = " + isMatch)
    done(err, isMatch);
  });
};

userSchema.methods.changePassword = function(newPassword,name,User,res) {
  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) { res.json({error:true ,message: "error" }); }
    bcrypt.hash(newPassword, salt, noop, function(err, hashedPassword) {
      if (err) { res.json({error:true ,message: "error" }); }
      User.findOneAndUpdate({username:name},{password:hashedPassword}, function(err, user) {
        if (err) { res.json({error:true ,message: "error" }); }
        res.json({error:false ,message: "account password updated" });
      });
    });
  });
};

userSchema.methods.name = function() {
  return this.displayName || this.username;
};

var User = mongoose.model("User", userSchema);

module.exports = User;
