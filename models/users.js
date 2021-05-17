const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
  // fullName: {type:String},
  // email: {type:String},
  // userRecipe: [
  //   {
  //     recipeName: String,
  //     img:String,
  //     preTime:Number,
  //     cookTime:Number,
  //     // totalTime: preTime+cookTime,
  //     ingredient:[String],
  //   }
  // ]
});

userSchema.statics.findUser = async function (username, password) {
  const user = await User.findOne({ username, password });
  if (user) {
    return user;
  } else {
    return;
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
