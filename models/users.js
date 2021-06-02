const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
  superUser: { type: Boolean },
  // fullName: {},
  // userRecipes: [
  //   {
  //     recipeName: String,
  //     img: String,
  //     preTime: Number,
  //     cookTime: Number,
  //     ingredients: [String], ///with check box for future
  //     servings: Number,
  //     instruction: String,

  //     ////for future improvement
  //     // instructions: [
  //     //   {
  //     //     stepsNo: Number,
  //     //     steps: String,
  //     //   },
  //     // ],
  //   },
  // ],
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
  const user = await User.findOne({ username });
  if (!user) {
    /// if no user return
    return; ///need input
  }

  const isMatch = await bcrypt.compare(password, user.password); /// compare user with user.password
  if (!isMatch) {
    /// if password not match
    return; /// need return error
  }
  return user;
};

///middleware
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
