import React, { useState, useContext } from 'react';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AuthApi from '../utils/AuthAPI';
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

export default function UpdateRecipe() {
  const [values, setValues] = useState( {
    recipeName:'',
    img:'',
    createdBy:'',
    preTime:'',
    cookTime:'',
    ingredients:'',
    servings:'',
    instruction:'',
  })


  const classes = useStyles();
  const authApi = useContext(AuthApi)


  function handleOnChange(e){
    setValues( prevState => ({ ...prevState, ...{[e.target.name] : e.target.value}}))
 }



  const [submitted, setSubmitted] = useState(false)
  // const [valid, setValid]=useState(false)


  const addRecipe = async () => {
    try {
      const response = await axios.post(`/recipes/create`, {
        recipeName: values.recipeName,
        img: values.img,
        createdBy: values.createdBy,
        preTime: values.preTime,
        cookTime: values.cookTime,
        ingredients: values.ingredients,
        serving: values.serving,
        instruction: values.instruction
      });
      console.log(JSON.stringify(values.RecipeName))
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
      // if(values.recipeName){
      //   setValid(true)
      // } 
      setSubmitted(true)
      addRecipe();
      // console.log({recipeName})
      console.log(values)
    }

  //   const handleSignUp = async (e) =>{
  //     e.preventDefault()
  //     const res = await signup({username,password});
  //     if (res.data.auth){
  //       authApi.setAuth(true)
  //     }
  // }
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
         Update Recipe
        </Typography>
        <form className={classes.form} noValidate>
          {submitted ? <div className="success-message">Succesfully Created!</div> : null}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
              
                variant="outlined"
                required
                fullWidth
                value='hello'
                id="recipeName"
                label="Recipe Name"
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
                value='hello'
                name="img"
                label="img"
                type="img"
                id="img"
                onChange ={handleOnChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                type='hidden'
                name="createdBy"
                label="createdBy"
                type="createdBy"
                id="createdBy"
                onChange ={handleOnChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="preTime"
                label="Preparation Time (Min)"
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
                name="cookTime"
                label="Cook Time (Min)"
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
                name="ingredients"
                label="Ingredients"
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
                name="servings"
                label="Number of Servings"
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
                name="instruction"
                label="Instruction/Steps"
                type="instruction"
                id="instruction"
                onChange ={handleOnChange}
              />
            </Grid>
            
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            // onClick={handleSignUp}
            onClick={handleSubmit}

          >
           Update Recipe
          </Button>
          <Grid container justify="flex-end">
          </Grid>
        </form>
      </div>
      <Box mt={5}>
      </Box>
    </Container>
  );
}