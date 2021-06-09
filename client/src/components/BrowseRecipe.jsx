import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Recipes from './recipes/recipes'

function BrowseRecipe() {

  useEffect(()=> {
  fetchRecipes()  
},[])

  const [recipes, setRecipes] = useState('');

  const fetchRecipes = async() => {
    axios.get(`/recipes`)
    .then((res)=> {
      setRecipes(res.data)
    })
  }

  return(
    <div>
      <div className= 'topNav'>
        <h1>Full List of Recipes</h1>
        <Recipes recipes={recipes} />
      </div>
    </div>
  )
}

export default BrowseRecipe;