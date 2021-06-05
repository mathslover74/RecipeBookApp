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
    // checkUserID()
    // checkUsername()
    // fetchRecipes();
    getUserRecipe()
    console.log('........ use effect')
  },[])
  // })

  const authApi = React.useContext(AuthApi);
  
  const handleLogout = async ()=>{
    const res = await signout();
    authApi.setAuth(res.data.auth);
  }

  const [recipes, setRecipes] = useState('');
  const [UserID, setUserID] = useState('')
  const [Username, setUsername] = useState('')

  const checkUserID = async () => {
    // const res = await axios.get('/users/profile/')
    // console.log(res)
    // setUserID(res.data)
    // console.log(UserID)

    return axios.get('/users/profile/')
    .then((res) => {
      console.log(res)
      setUserID(res.data)
      console.log(UserID)
      return res.data
    })
    
    // const superUser = await res.json();
    // setSuperUser(superUser)
    // console.log(superUser)
  
    // console.(superUser)
  }


  const checkUsername = async (id) => {
    // const res = await axios.get(id)
    // const res = await axios.get(`/users/profile/60b7910b2857d061a8ba8a8d/`)
    
    return axios.get(`/users/profile/${id}/`)
    .then((res) => {
      console.log(res)
      setUsername(res.data.username)
      return res.data.username 
      console.log(Username)
    })
    
    // const res = await axios.get(`/users/profile/${UserID}/`)
    // console.log(res.data.username)
    // setUsername(res.data.username)
    // console.log(Username)
  }



  // const fetchRecipes = async() => {
  //   axios.get(`/recipes`)
  //   .then((res)=> {
  //     // debugger
  //     setRecipes(res.data)
  //     console.log(recipes)

  //     // console.log(res.data)
  //   })
  // }

    const getUserRecipe = async () => {
      console.log(Username)
    // const res = await axios.get(`/recipes/userRecipe/${Username}/`)
    // console.log(res)
    // setRecipes(res.data)
    // console.log(recipes)
    try {
      let userid = await checkUserID()
      let username = await checkUsername(userid)
      axios.get(`/recipes/userRecipe/${username}/`)
      .then((res)=>{
        console.log(res)
        setRecipes(res.data)
        console.log(recipes)
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
        {/* <button onClick={fetchRecipes}>Get Recipes</button> */}
        {/* {recipes && <Recipes recipes={recipes}/>} */}
        
        <MyRecipes recipes={recipes} />
        {/* <MyRecipes /> */}
        
      

      </div>
    </div>
  )
}

export default MyRecipe;