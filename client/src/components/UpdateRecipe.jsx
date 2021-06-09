import React, { useState, useEffect } from 'react';
import {storage} from "./firebase/index";
import { useHistory } from 'react-router';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
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

export default function UpdateRecipe({match}) {

  const history = useHistory();
  const [img, setImg] = useState(null)
  const [sameImg, setSameImg] = useState(true)
  const [submitted, setSubmitted] = useState(false)
  const [url, setUrl] = useState()
  const [imgName, setImgName] = useState()
  const [previewImg, setPreviewImg] = useState('');
  const[recipe, getRecipe] = useState('');
  const classes = useStyles();

const fetchOneRecipe = async () => {

  axios.get(`/recipes/${match.params.id}`)
  .then((res)=>{
    getRecipe(res.data)
  })
  .catch(err => console.log(err))
}

  useEffect(()=>{
    fetchOneRecipe();
    if (img) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImg(reader.result)
        setSameImg(false)
      }
      reader.readAsDataURL(img);
    }else {
    }
  },[img])

  const handleChangeImg = e  => {
    if (e.target.files[0]){
      setImg(e.target.files[0])
      console.log(e.target.files[0])
    }
  }
  
  const deleteRecipe = async () => {
    deleteImg()
    try{
      await axios.delete(`/recipes/${match.params.id}`);
      history.go(0)
    } catch (err) {
      console.log(err)
    }
  }
  
  const modifiedRecipe = async (userImg,ImgName) => {
    try {
      const response = await axios.put(`/recipes/${match.params.id}`, {
        recipeName: recipe.recipeName,
        imgUrl: userImg,
        imgName: ImgName,
        createdBy: recipe.createdBy,
        preTime: recipe.preTime,
        cookTime: recipe.cookTime,
        ingredients: recipe.ingredients,
        servings: recipe.serving,
        instruction: recipe.instruction
      });
    } catch (err) {
      console.log(err)
    }
  }

  const deleteImg = () => {
    const storageRef = storage.ref() 
    console.log(`${recipe.imgName}`)
    const imgRef = storageRef.child(`images/${recipe.imgName}`);
    imgRef.delete().then(()=>{
      console.log(' img file deleted')
    }).catch((err) => {
      console.log(err)
    })
  }
  
  function handleOnChange(e){
    getRecipe( prevState => ({ ...prevState, ...{[e.target.name] : e.target.value}}))
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();

    if (`${sameImg}` === 'true') {
      const url = `${recipe.imgUrl}`
      const imgName = `${recipe.imgName}`
      setSubmitted(true)
      modifiedRecipe(url,imgName);
      console.log(`${recipe.imgName}` === 'sample picture')

    } else {
       if (`${recipe.imgName}` === 'sample picture') {

       } else {
         deleteImg()
       }

      const time = new Date().getTime()
      console.log(time)
      console.log(`${img.name}`)
      const timeName = `${time}${img.name}`
      console.log(timeName)
      // const uploadTask = storage.ref(`images/${time}${img.name}`).put(img);
      const uploadTask = storage.ref(`images/${timeName}`).put(img);
        uploadTask.on(
          "state_changed",
          snapshot => {
            const name = `${time}${img.name}`
            setImgName(name)
            getRecipe (prevState => ({...prevState, imgName : name}))
          },
          error => {
            console.log(error)
          },
          () => {
            
            storage
            .ref("images")
            .child(`${time}${img.name}`)
            .getDownloadURL()
            .then(url => {
              console.log(url)
              setUrl(url)
              setSubmitted(true)
              modifiedRecipe(url,(`${time}${img.name}`));
            })
          }
        )
      }
    }
  
  return (
      <div>
        <TopNav/>
        <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
         Update Recipe
        </Typography>
        <form className={classes.form} noValidate>
          {submitted ? <div className="success-message">Succesfully Updated!</div> : null}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
              
                variant="outlined"
                required
                fullWidth
                value={String(recipe.recipeName)}
                id="recipeName"
                label="Recipe Name"
                name="recipeName"
                onChange ={handleOnChange}
              />
            </Grid>
            <Grid item xs={12}>
            {!img ? 
            (<img src={recipe.imgUrl} style = {{width:'200px'}, {height:'200px'}}/>)
            : 
            (<img src={previewImg} style = {{width:'200px'}, {height:'200px'}} />)
            }
            <input type='file' accept='image/*' onChange={handleChangeImg} />
            </Grid>
  
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={String(recipe.preTime)}
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
                value={String(recipe.cookTime)}
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
                value={String(recipe.ingredients)}
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
                value={String(recipe.servings)}
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
                value={String(recipe.instruction)}
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
            onClick={handleSubmit}
  
          >
           Update Recipe
          </Button>
  
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => deleteRecipe()}
  
          >
           Delete Recipe
          </Button>
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