import React from 'react'

//default export
export default function Recipes({recipes}) { 
  console.log('........')
  // console.log(recipes[0].recipeName)
  return(
    <div>
      {recipes && recipes.map((recipe, index) => 
      <>
        <h2 key={`${index}_recipe`} > {recipe.recipeName}</h2>
        <h3>{recipe.preTime}</h3>
      </>
      )}
    </div>
  )
}
// //named export
// export function Mochi() {
//   return (
//     <>
//      this is a mochi
//     </>
//   )
// }