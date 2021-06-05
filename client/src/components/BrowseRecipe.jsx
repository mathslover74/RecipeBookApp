import React, {useState, useEffect} from 'react';
import AuthApi from '../utils/AuthAPI'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Recipes from './recipes/recipes'

function BrowseRecipe() {

  useEffect(()=> {
    // checkSignIn()
  fetchRecipes()  
},[])
  // })

  const authApi = React.useContext(AuthApi);

  const [recipes, setRecipes] = useState('');

  const fetchRecipes = async() => {
    axios.get(`/recipes`)
    .then((res)=> {
      // debugger
      setRecipes(res.data)
      console.log(recipes)

      // console.log(res.data)
    })
  }

  


  return(
    <div>
      <div className= 'topNav'>
        <h1>Full List of Recipes</h1>
        {/* <button onClick={fetchRecipes}>Get Recipes</button> */}
        {/* {recipes && <Recipes recipes={recipes}/>} */}
        
        <Recipes recipes={recipes} />
        
      

      </div>
    </div>
  )
}

export default BrowseRecipe;