import React,{useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {signout} from './auth-api'
import AuthApi from '../utils/AuthAPI'
import axios from "axios"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function TopNav() {

useEffect(()=>{
  checkSignIn()
  checkUserID()
  checkSuperUser()
})
// },[])

  const authApi = React.useContext(AuthApi);
  const classes = useStyles();


  const handleLogout = async ()=>{
    try {
      const res = await signout();
      authApi.setAuth(res.data.auth);
    } catch (err) {
      console.log(err)
    }
  }

  const [SignIn, setSignIn] = useState(false)
  const [UserID, setUserID] = useState('')
  const [SuperUser, setSuperUser] = useState('')

  const checkSignIn = async () => {
    const res = await axios.get('/users/hassign/')
    console.log(res.data)
    setSignIn(res.data.auth)
  }

  const checkUserID = async () => {
    const res = await axios.get('/users/profile/')
    console.log(res.data)
    setUserID(res.data)
    console.log(UserID)
    
    // const superUser = await res.json();
    // setSuperUser(superUser)
    // console.log(superUser)
  
    // console.(superUser)
  }

  // let id = `/users/profile/${UserID}/`
  // console.log(typeof `${UserID}`)
  // console.log(id)


  const checkSuperUser = async () => {
    // const res = await axios.get(id)
    // const res = await axios.get(`/users/profile/60b7910b2857d061a8ba8a8d/`)
    const res = await axios.get(`/users/profile/${UserID}/`)
    console.log(res.data.superUser)
    setSuperUser(res.data.superUser)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {SuperUser &&
          <Button href='/Dashboard' color="inherit">Edit All Recipes</Button>
          }
          {SignIn &&
          <Button href='/Dashboard' color="inherit">My Recipes</Button>
          }
          <Button href='/Dashboard' color="inherit">Browse Recipes</Button>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          {SignIn ? 
          <Button onClick={handleLogout} color="inherit">Logout</Button> :
          <Button href='/signin' color="inherit">Login</Button>
          }

          {SignIn ? 
          null:
          <Button href='/signup' color="inherit">Sign Up</Button>
          }


          {/* <Button href='/signin' color="inherit">Login</Button>
          <Button onClick={handleLogout} color="inherit">Logout</Button>
          <Button href='/signup' color="inherit">Sign Up</Button> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}
