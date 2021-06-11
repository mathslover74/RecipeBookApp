import React, { useState, useContext, useEffect } from 'react';
import { useHistory} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
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

  const [img, setImg] = useState(null)
  const history = useHistory();
  const[recipe, getRecipe] = useState('');
  const [previewImg, setPreviewImg] = useState('');
  const classes = useStyles();


  useEffect(()=>{
    fetchOneRecipe();
    if (img) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImg(reader.result)
        
      }
      reader.readAsDataURL(img);
    }else {
      setPreviewImg(null)
    }
  },[img])
 
  // console.log(match.params)

  const fetchOneRecipe = async () => {
    axios.get(`/recipes/${match.params.id}`)
    .then((res)=>{
      getRecipe(res.data)
    })
    .catch(err => console.log(err))
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
         
         <h1>{recipe.recipeName}</h1>
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
            {!img ? 
            (<img src={recipe.imgUrl} style = {{width:'200px'}, {height:'200px'}}/>)
            : 
            (<img src='http://via.placeholder.com/300x400' style = {{width:'200px'}, {height:'200px'}} />)
            }

            <CardContent>
              <h3>Instruction</h3>
            <Typography variant="body2" color="textSecondary" component="p">
              {recipe.instruction}
            </Typography>
            </CardContent>
  
              <h3>Ingredients Required</h3>
            <Typography variant="body2" color="textSecondary" component="p">
              {recipe.ingredients}
            </Typography>

            <CardContent>
              <h4>Preparation Time : {recipe.preTime}</h4>
              <h4>Cooking Time : {recipe.cookTime}</h4>
              <h4>Number of Servings: {recipe.servings}</h4>

            </CardContent>
              
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