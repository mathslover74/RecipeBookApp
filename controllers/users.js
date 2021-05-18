const express = require("express");
const router = express.Router();
const User = require("../models/users");

router.get("/", (req, res) => {
  res.json({
    msg: "hello",
  });
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findUser(username, password);
  if (user) {
    res.json({
      message: "you are successfully login",
      auth: true,
    });
  } else {
    res.json({
      message: "Unable to login",
      auth: false,
    });
  }
  console.log(user);
});

router.post("/signup", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then((result) => {
      res.json({
        message: "successfully created",
        auth: true,
      });
    })
    .catch((err) => {
      res.json({
        message: "unable to create account",
        auth: false,
      });
    });
});

module.exports = router;
