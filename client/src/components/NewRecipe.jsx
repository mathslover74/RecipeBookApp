import React, { useState, useEffect } from 'react';
import {storage} from "./firebase/index";
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



const fetchUserID = async() => {
  try{
    const fetchUserID = await fetch ('/users/profile');
    const userID = await fetchUserID.json();
    return userID
  } catch (err) {
    console.log(err)
  }
}
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

export default function NewRecipe({match}) {

  const classes = useStyles();
  const authApi = React.useContext(AuthApi);

  const [submitted, setSubmitted] = useState(false)
  const [sameImg, setSameImg] = useState(true)
  const [img, setImg] = useState(null)
  const [url, setUrl] = useState()
  const [imgName, setImgName] = useState()
  const [previewImg, setPreviewImg] = useState('http://via.placeholder.com/200x200');
  const [values, setValues] = useState( {
    recipeName:'',
    imgUrl:'',
    imgName:'',
    createdBy:'',
    preTime:'',
    cookTime:'',
    ingredients:'',
    servings:'',
    instruction:'',
  })

  useEffect(() => {
    fetchUserData()
    
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
    }
  }

  function handleOnChange(e){
    setValues( prevState => ({ ...prevState, ...{[e.target.name] : e.target.value}}))
 }
  

  

  const fetchUserData = async () => {
      axios.get(`/users/profile/${await fetchUserID()}`)
      .then((res)=>{
        setValues(prevState => ({...prevState, createdBy : res.data.username}))
      })
      .catch(err => console.log(err))
  }



  const addRecipe = async (userImgURL, ImgName) => {
    try {
      const response = await axios.post(`/recipes/create`, {
        recipeName: values.recipeName,
        imgUrl: userImgURL,
        imgName: ImgName,
        createdBy: values.createdBy,
        preTime: values.preTime,
        cookTime: values.cookTime,
        ingredients: values.ingredients,
        servings: values.servings,
        instruction: values.instruction
      });
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

      const sampleURL = '"http://via.placeholder.com/200x200"'
 
      if (`${sameImg}` === 'true') {
        setSubmitted(true)
        const sampleUrlName = 'sample picture'
        const sampleImgURL = "http://via.placeholder.com/200x200"

        addRecipe(sampleImgURL,sampleUrlName);
        } else {
          const time = new Date().getTime()
      
          const uploadTask = storage.ref(`images/${time}${img.name}`).put(img);
          uploadTask.on(
            "state_changed",
            snapshot => {
              const name = `${time}${img.name}`
              setImgName(name)
              setValues(prevState => ({...prevState, imgName : name}))
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
                setUrl(url)
                setValues(prevState => ({...prevState, imgUrl : url}))
                setSubmitted(true)
                addRecipe(url,(`${time}${img.name}`));
              })
            }
          )
        }
    }

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
              <TextField
                variant="outlined"
                required
                fullWidth
                id="recipeName"
                label="Recipe Name"
                name="recipeName"
                onChange ={handleOnChange}
              />
            </Grid>

            <Grid item xs={12}>
            <img src={previewImg} style = {{width:'200px'}, {height:'200px'}} alt='preview img' />
            <input type='file' accept='image/*' onChange={handleChangeImg} />
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