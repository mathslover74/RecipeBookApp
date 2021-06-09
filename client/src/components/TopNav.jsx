import React,{useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {signout} from './auth-api'
import AuthApi from '../utils/AuthAPI'
import axios from "axios"
import { Link } from 'react-router-dom';
import './styles/nav.css';

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
    console.log(res)
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
    console.log(res.data)
    setSuperUser(res.data.superUser)
  }

  const navigation = [
  // {
  //   display: SignIn,
  //   path: SignIn ? '/browseRecipe' : '/signin',
  //   title: 'JiakSiMe?'
  // }, 
  {
    display: SignIn,
    path: '/recipe',
    title: 'My Recipes',
  }, {
    display: SignIn,
    path: '/browseRecipe',
    title: SuperUser ? 'Browse & Edit All Recipes' : 'Browse Recipes',
  }, {
 
  } ]

  return (
    <div className={classes.root}>
      <AppBar position="static">
      
        <Toolbar>
          {SignIn ? 
          <Button color="inherit" component= {Link} to='/browseRecipe' ><span id='fonts'>JiakSiMe?</span></Button>:
          <Button href='/signin' color="inherit"><span id ='fonts'>JiakSiMe?</span></Button>
        }
          {navigation.map((n, index) => (
            n.display && <Link to={n.path}>
              <Button style={{color: 'rgba(255,255,255)'}} > {n.title} </Button>
            </Link>
          ))}
          {/* {SignIn &&
          // <Button href='/recipe' color="inherit">My Recipes</Button>
            <Link to={`/recipe`} style={{textDecoration: 'none'}, {color: 'rgba(255,255,255)'}}>
              <Button href='/recipe' color="inherit">
              My Recipes
              </Button>
              </Link>
          } */}
          
          {/* {SuperUser ? 
          // <Button href='/browseRecipe' color="inherit">Browse & Edit All Recipes</Button> 
          <Link to={`/browseRecipe`} style={{textDecoration: 'none'},{color: 'rgba(255,255,255)'}}>
            <Button color="inherit">Browse & Edit All Recipes</Button> 
          </Link> :
          <Link to={`/browseRecipe`} style={{textDecoration: 'none'},{color: 'rgba(255,255,255)'}}>
          <Button color="inherit">Browse Recipes</Button>
          </Link>
        } */}

          <Typography variant="h6" className={classes.title}>
          
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
