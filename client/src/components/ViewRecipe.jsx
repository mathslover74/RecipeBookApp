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
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CardActionArea from '@material-ui/core/CardActionArea';
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

      <Box p={1} width='100%'>
          <Card className={classes.root}>
          {/* <CardActionArea href={`/recipe/60b4ee39107017402d582fa2`} > */}
          {/* <CardActionArea href=`/recipe/${recipe._id}` > */}
          <CardActionArea href={`/recipe/${recipe._id}/`}>
          {/* {SuperUser ?
          <Link key={`${index}_id`} to={`/recipe/${recipe._id}`}>{recipe.recipeName} </Link> 
          :
          <Link key={`${index}_id`} to={`/viewrecipe/${recipe._id}`}>{recipe.recipeName} </Link>
          } */}
          <CardHeader
            // title = {recipe.recipeName}
            // subheader = {recipe._id}
            subheader = {recipe.createdBy}
          />
          <CardMedia
            className={classes.media}
            // image="http://via.placeholder.com/200x200"
            image= {recipe.imgUrl}
            // image="https://firebasestorage.googleapis.com/v0/b/recipeapp-react.appspot.com/o/images%2F1622986005066Lays_chips.jpeg?alt=media&token=884a7579-bff9-4b07-964e-dae958557f42"
            title= {recipe.recipeName}
          />
          </CardActionArea>
          


          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              This impressive paella is a perfect party dish and a fun meal to cook together with your
              guests. Add 1 cup of frozen peas along with the mussels, if you like.
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            {/* <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton> */}
            {/* <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton> */}
          </CardActions>
          {/* <Collapse in={expanded} timeout="auto" unmountOnExit> */}
            {/* <CardContent>
              <Typography paragraph>Method:</Typography>
              <Typography paragraph>
                Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                minutes.
              </Typography>
              <Typography paragraph>
                Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
                and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
                pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
                saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
              </Typography>
              <Typography paragraph>
                Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
                without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
                medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
                again without stirring, until mussels have opened and rice is just tender, 5 to 7
                minutes more. (Discard any mussels that don’t open.)
              </Typography>
              <Typography>
                Set aside off of the heat to let rest for 10 minutes, and then serve.
              </Typography>
            </CardContent> */}
          {/* </Collapse> */}
          </Card>  
        </Box>
    </Container>
      </div>
    
  );
}