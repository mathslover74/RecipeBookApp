import React, { useState, useContext, useEffect } from 'react';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   useParams
// } from "react-router-dom";
import { useParams , use} from 'react-router-dom';
import { useHistory , Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AuthApi from '../utils/AuthAPI';
import TopNav from './TopNav'
const axios = require('axios');



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function ViewRecipe({match}) {

  const history = useHistory();
// const { id } = useParams();


  useEffect(()=>{
    // console.log(JSON.stringify({id}))
    fetchOneRecipe();
  },[])
  
  const[recipe, getRecipe] = useState('');
  // console.log(match.params)

  const fetchOneRecipe = async () => {
    // console.log({id})
    // axios.get(`/recipes/60abba232d26b32014c74bb1`)
    axios.get(`/recipes/${match.params.id}`)
    .then((res)=>{
      // console.log(res.data)
      getRecipe(res.data)
    })
    .catch(err => console.log(err))
  }
  
  
  const classes = useStyles();
  const authApi = useContext(AuthApi)
  
  
  function handleOnChange(e){
    getRecipe( prevState => ({ ...prevState, ...{[e.target.name] : e.target.value}}))
  }

  // const [valid, setValid]=useState(false)
  
  
  
  
  const handleSubmit = (event) => {
    event.preventDefault();
    }

  
  return (
      <div>
        <TopNav/>

        <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Button variant='contained' color='primary' onClick={() => {
          history.push('/browseRecipe')
        }}>Return to Browse Recipe
        </Button>
        <br />
        <Typography component="h1" variant="h5">
         {recipe.recipeName}
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
              
                variant="outlined"
                required
                fullWidth
                value={recipe.recipeName}
                id="recipeName"
                // label="Recipe Name"
                name="recipeName"
                onChange ={handleOnChange}
              />
              {/* {submitted && values.recipeName==='' ? <span>Please enter Recipe Name</span> : null} */}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={recipe.img}
                name="img"
                // label="img"
                type="img"
                id="img"
                onChange ={handleOnChange}
              />
            </Grid>
  
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={recipe.preTime}
                name="preTime"
                // label="Preparation Time (Min)"
                type="preTime"
                id="preTime"
                onChange ={handleOnChange}
              />
            </Grid>
  
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={recipe.cookTime}
                name="cookTime"
                // label="Cook Time (Min)"
                type="cookTime"
                id="cookTime"
                onChange ={handleOnChange}
              />
            </Grid>
  
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={recipe.ingredients}
                name="ingredients"
                // label="Ingredients"
                type="ingredients"
                id="ingredients"
                onChange ={handleOnChange}
              />
            </Grid>
  
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={recipe.servings}
                name="servings"
                // label="Number of Servings"
                type="servings"
                id="servings"
                onChange ={handleOnChange}
              />
            </Grid>
  
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={recipe.instruction}
                name="instruction"
                // label="Instruction/Steps"
                type="instruction"
                id="instruction"
                onChange ={handleOnChange}
              />
            </Grid>
            
          </Grid> 
  
          <Grid container justify="flex-end">
          </Grid>
        </form>        
      </div>
      <Box mt={5}>
      </Box>
    </Container>
      </div>
    
  );
}