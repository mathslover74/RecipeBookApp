import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MyRecipes from './recipes/Myrecipes'
import Button from '@material-ui/core/Button';

function MyRecipe() {

  useEffect(()=> {
    getUserRecipe()
  },[])

  const [recipes, setRecipes] = useState('');
  const [UserID, setUserID] = useState('')
  const [Username, setUsername] = useState('')

  const checkUserID = async () => {
    return axios.get('/users/profile/')
    .then((res) => {
      setUserID(res.data)
      return res.data
    })
    
  }


  const checkUsername = async (id) => {
    return axios.get(`/users/profile/${id}/`)
    .then((res) => {
      setUsername(res.data.username)
      return res.data.username 
    })
  }

    const getUserRecipe = async () => {
    try {
      let userid = await checkUserID()
      let username = await checkUsername(userid)
      axios.get(`/recipes/userRecipe/${username}/`)
      .then((res)=>{
        setRecipes(res.data)
      })
    } catch (err){
      console.log(err)
    }
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
        <MyRecipes recipes={recipes} />
      </div>
    </div>
  )
}

export default MyRecipe;