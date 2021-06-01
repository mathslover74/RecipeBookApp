const express = require("express");
const router = express.Router();
const User = require("../models/users");

// router.get("/", (req, res) => {
//   res.json({
//     msg: "hello",
//   });

///find all users
router.get("/", (req, res) => {
  User.find({}, (err, foundUsers) => {
    res.json(foundUsers);
  });
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findUser(username, password);
  if (user) {
    req.session.user = user._id;
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
  req.session.user = user._id;
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

router.get("/hassign", (req, res) => {
  if (req.session.user) {
    return res.json({
      auth: true,
      message: "your are sign in",
    });
  }
  return res.json({
    authi: false,
    message: "you are not login",
  });
});

router.get("/signout", (req, res) => {
  req.session.destroy();
  res.json({
    auth: false,
  });
});

///get user id
router.get("/profile", async (req, res) => {
  let userdata = req.session.user;
  res.json(userdata);
});

router.get("/profile/:userid", (req, res) => {
  User.findById(req.params.userid, (err, foundUser) => {
    res.json(foundUser);
  });
});

module.exports = router;
