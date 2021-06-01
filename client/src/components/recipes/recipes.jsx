import React from 'react'
import { Link } from 'react-router-dom'

//default export
export default function Recipes({recipes}) { 
  console.log('........')
  // console.log(recipes[0].recipeName)
  return(
    
    <div>
      {recipes && recipes.map((recipe, index) => 
      <>
        <h2 key={`${index}_recipe`} > {recipe.recipeName}</h2>
        {/* <Link key={`${index}_id`} to={`/recipe/update/${recipe._id}`}>{recipe.recipeName} </Link> */}
        <Link key={`${index}_id`} to={`/recipe/${recipe._id}`}>{recipe.recipeName} </Link>
      </>
      )}
    </div>
  )
}
// //named exportß
// export function Mochi() {
//   return (
//     <>
//      this is a mochi
//     </>
//   )
// }