import React, {useState, useEffect} from 'react';
import AuthApi from '../utils/AuthAPI'
import {signout} from './auth-api'
import { Link } from 'react-router-dom';
import TopNav from './TopNav'
import axios from 'axios';
import MyRecipes from './recipes/Myrecipes'
import Button from '@material-ui/core/Button';

function MyRecipe() {

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
        <br></br>
        <Link to={'/recipe/new'} >
        <Button variant='contained' color='primary'>Create New Recipe
        </Button>
        </Link>
        <h1>My Recipes</h1>
        {/* <button onClick={fetchRecipes}>Get Recipes</button> */}
        {/* {recipes && <Recipes recipes={recipes}/>} */}
        
        <MyRecipes recipes={recipes} />
        
      

      </div>
    </div>
  )
}

export default MyRecipe;