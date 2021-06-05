const mongoose = require("mongoose");
const recipeSchema = new mongoose.Schema({
  recipeName: String,
  //not here as image will be in firebase
  img: String,
  // recipeId: String,
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

// firebase data schema
// img: string
// recipeId: string/number

// get('/recipe/image/{recipeId}') => image in base64

// post('/recipe/image') => { recipeId: string/number, img: string } => store

//add recipe to mongo => response : recipeId => call firebase to add image
