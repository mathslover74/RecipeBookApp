import React, { useState, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {signup} from './auth-api'
import AuthApi from '../utils/AuthAPI';

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

export default function NewRecipe() {
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
  // const [recipeName, setRecipeName] = useState();
  // const [img, setImg] = useState();
  // const [createdBy, setCreatedBy] = useState();
  // const [preTime, setPreTime] = useState();
  // const [cookTime, setCookTime] = useState();
  // const [ingredients, setIngredients] = useState();
  // const [serving, setServing] = useState();
  // const [instruction, setInstruction] = useState();
  const classes = useStyles();
  const authApi = useContext(AuthApi)


  const handleOnChange = (e) => {
    if(e.target.username === ' username'){
      // setUsername(e.target.value)
    }else {
      // setPassword(e.target.value)
    }
  }

  const [submitted, setSubmitted] = useState(false)
  // const [valid, setValid]=useState(false)

  const handleSubmit = (event) => {
    event.preventDefault();
      // if(values.recipeName){
      //   setValid(true)
      // } 
      setSubmitted(true)
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
         Create New Recipe
        </Typography>
        <form className={classes.form} noValidate>
          {submitted ? <div className="success-message">Succesfully Created!</div> : null}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <label>Recipe name</label>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="recipeName"
                label="recipeName"
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
                label="preTime"
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
                label="cookTime"
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
                label="ingredients"
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
                label="servings"
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
                label="instruction"
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
            Post New Recipe
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