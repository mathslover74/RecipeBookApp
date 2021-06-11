const express = require("express");
const router = express.Router();
const User = require("../models/users");
const Recipes = require("../models/recipes");

// router.get("/", (req, res) => {
//   Recipes.find({}, (err, foundRecipes) => {
//     res.json(foundRecipes);
//   });
// });

///get All Recipes
router.get("/", (req, res) => {
  Recipes.find({}, (err, foundRecipes) => {
    res.json(foundRecipes);
  });
});

///create
router.post("/create", (req, res) => {
  Recipes.create(req.body, (err, createRecipe) => {
    res.json(createRecipe);
  });
});

router.put("/create", (req, res) => {
  Recipes.create(req.body, (err, createRecipe) => {
    res.json(createRecipe);
  });
});

///get one Recipe
router.get("/:id", (req, res) => {
  Recipes.findById(req.params.id, (err, foundRecipes) => {
    res.json(foundRecipes);
  });
});

///edit Recipes
router.put("/:id", (req, res) => {
  Recipes.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedRecipe) => {
      res.json(updatedRecipe);
    }
  );
});

///delete Recipe
router.delete("/:id", (req, res) => {
  Recipes.findByIdAndDelete(req.params.id, (err, deleteRecipes) => {
    res.json(deleteRecipes);
  });
});

router.get("/userRecipe/:username", (req, res) => {
  Recipes.find({ createdBy: req.params.username }, (err, user) => {
    res.json(user);
  });
});

module.exports = router;

// console.log(products);
// var b = JSON.parse(products); //unexpected token o

// JSON.parse is waiting for a String in parameter. You need to stringify your JSON object to solve the problem.

// products = [{"name":"Pizza","price":"10","quantity":"7"}, {"name":"Cerveja","price":"12","quantity":"5"}, {"name":"Hamburguer","price":"10","quantity":"2"}, {"name":"Fraldas","price":"6","quantity":"2"}];
// console.log(products);
// var b = JSON.parse(JSON.stringify(products));  //solves the problem
