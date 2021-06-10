const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
  superUser: { type: Boolean },
});

userSchema.statics.findUser = async function (username, password) {
  const user = await User.findOne({ username });
  if (!user) {
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
