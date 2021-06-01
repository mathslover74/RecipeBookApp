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
},[])

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

  const checkSignIn = async () => {
    const res = await axios.get('/users/hassign/')
    console.log(res.data.auth)
    setSignIn(res.data.auth)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Button href='/Dashboard' color="inherit">My Recipes</Button>
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
