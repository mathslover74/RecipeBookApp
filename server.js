const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const app = express();
const session = require("express-session");
const db = mongoose.connection;
const bcrypt = require("bcrypt");
require("dotenv").config();
const users = [];

// Enviroment variables
const mongoURI = process.env.MONGODB_URI;
const PORT = process.env.PORT;
const path = require("path");

//Controller
const usersController = require("./controllers/users");
const recipesController = require("./controllers/recipes");

const bodyParser = require("body-parser");

// Middleware
// allows us to use put and delete methods
app.use(express.static(path.join(__dirname, "client", "build")));
app.use(express.json());
app.use(methodOverride("_method"));
// parses info from our input fields into an object
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: "hello",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Database
mongoose.connect(
  mongoURI,
  { useNewUrlParser: true, useUnifiedTopolog: true, useCreateIndex: true },
  () => {
    console.log("MongoDB connection establish,");
  }
);

// Error / Disconnection
db.on("error", (err) => console.log(`${err.message} is Mongod not running?`));
db.on("disconnected", () => console.log("mongo disconnected"));

//Routes
app.use("/users", usersController);
app.use("/recipes", recipesController);

app.listen(PORT, () => console.log("server is running on port", PORT));
