const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const app = express();
const db = mongoose.connection;
const bcrypt = require("bcrypt");
require("dotenv").config();
const users = [];

// Enviroment variables
const mongoURI = process.env.MONGODB_URI;
const PORT = process.env.PORT;

//Controller
const usersController = require("./controllers/users");

// Middleware
// allows us to use put and delete methods
app.use(express.json());
app.use(methodOverride("_method"));
// parses info from our input fields into an object
app.use(express.urlencoded({ extended: false }));

// Database
mongoose.connect(
  mongoURI,
  { useNewUrlParser: true, useUnifiedTopolog: true },
  () => {
    console.log("MongoDB connection establish,");
  }
);

// Error / Disconnection
db.on("error", (err) => console.log(`${err.message} is Mongod not running?`));
db.on("disconnected", () => console.log("mongo disconnected"));

//Routes
app.use("/users", usersController);

app.listen(PORT, () => console.log("server is running on port", PORT));
