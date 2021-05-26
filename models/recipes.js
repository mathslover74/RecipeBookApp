const mongoose = require("mongoose");
const recipeSchema = new mongoose.Schema({
  recipeName: String,
  img: String,
  createdBy: String,
  //for future
  // createdBy: {
  //   type:mongoose.Schema.Types.ObjectId,
  //   ref:'User',
  // }
  preTime: Number,
  cookTime: Number,
  ingredients: String, ///with check box for future with array
  servings: Number,
  instruction: String,

  ////for future improvement
  // instructions: [
  //   {
  //     stepsNo: Number,
  //     steps: String,
  //   },
  // ],
});

const Recipes = mongoose.model("Recipes", recipeSchema);

module.exports = Recipes;
