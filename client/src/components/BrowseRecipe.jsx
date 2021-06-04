import React, {useState, useEffect} from 'react';
import AuthApi from '../utils/AuthAPI'
import {signout} from './auth-api'
import { Link } from 'react-router-dom';
import TopNav from './TopNav'
import axios from 'axios';
import Recipes from './recipes/recipes'

function BrowseRecipe() {

  useEffect(()=> {
    fetchRecipes();
  },[])

  const authApi = React.useContext(AuthApi);
  
  const handleLogout = async ()=>{
    const res = await signout();
    authApi.setAuth(res.data.auth);
  }

  const [recipes, setRecipes] = useState('');

  const fetchRecipes = async() => {
    axios.get(`/recipes`)
    .then((res)=> {
      // debugger
      setRecipes(res.data)

      // console.log(res.data)
    })
  }


  return(
    <div>
      <div className= 'topNav'>
        <h1>All Recipes</h1>
        <Link to={'/recipe/new'}>Create new recipe</Link>
        <h1>Full List of Recipes</h1>
        {/* <button onClick={fetchRecipes}>Get Recipes</button> */}
        {/* {recipes && <Recipes recipes={recipes}/>} */}
        
        <Recipes recipes={recipes} />
        
      

      </div>
    </div>
  )
}

export default BrowseRecipe;