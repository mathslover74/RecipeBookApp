import React, { useState, useContext, useEffect } from 'react';
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
    // console.log(userID)
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
  const [img, setImg] = useState(null)
  const [url, setUrl] = useState()
  const [imgName, setImgName] = useState()
  const [previewImg, setPreviewImg] = useState('');
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

  // useEffect(() => {
  //   // fetchUserID();
  //   fetchUserData()

  // },[]);

  useEffect(() => {
    fetchUserData()
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

  const handleChangeImg = e  => {
    if (e.target.files[0]){
      setImg(e.target.files[0])
      console.log(e.target.files[0])
      // setValues()
    }
  }

  // const [recipeName, setRecipeName] = useState();
  // const [img, setImg] = useState();
  // const [createdBy, setCreatedBy] = useState();
  // const [preTime, setPreTime] = useState();
  // const [cookTime, setCookTime] = useState();
  // const [ingredients, setIngredients] = useState();
  // const [serving, setServing] = useState();
  // const [instruction, setInstruction] = useState();

  // function handleNameChange(e) {
  //   setRecipeName(e.target.value)
  // }
  // function handleImgChange(e) {
  //   setImg(e.target.value)
  // }
  // function handleCreatedByChange(e) {
  //   setCreatedBy(e.target.value)
  // }
  // function handlePreTimeChange(e) {
  //   setPreTime(e.target.value)
  // }
  // function handleChange(e) {
  //   setCookTime(e.target.value)
  // }
  // function handleNameChange(e) {
  //   setRecipeName(e.target.value)
  // }
  // function handleNameChange(e) {
  //   setRecipeName(e.target.value)
  // }
  // function handleNameChange(e) {
  //   setRecipeName(e.target.value)
  // }

  // const handleOnChange = (e) => {
  //   if(e.target.username === ' username'){
  //     // setUsername(e.target.value)
  //   }else {
  //     // setPassword(e.target.value)
  //   }
  // }

  function handleOnChange(e){
    setValues( prevState => ({ ...prevState, ...{[e.target.name] : e.target.value}}))
 }
  

  // const handleOnChange = (e) => {
  //   if(e.target.recipeName === 'recipeName'){
  //     setRecipeName(e.target.value)
  //   }

  //   if(e.target.img === 'img'){
  //     setImg(e.target.value)
  //   }

  //   if(e.target.createBy === 'createdBy'){
  //     setCreatedBy(e.target.value)
  //   }

  //   if(e.target.preTime === 'preTime'){
  //     setPreTime(e.target.value)
  //   }

  //   if(e.target.cookTime === 'cookTime'){
  //     setCookTime(e.target.value)
  //   }

  //   if(e.target.ingredients === 'ingredients'){
  //     setIngredients(e.target.value)
  //   }

  //   if(e.target.servings === 'servings'){
  //     setServing(e.target.value)
  //   }

  //   if(e.target.instruction === 'instruction'){
  //     setInstruction(e.target.value)
  //   }

  // }

  // const [valid, setValid]=useState(false)

  // const fetchUserData = async () => {
  //   const response = await fetch(`/users/profile/${match.params.userid}`);
  //   const jsonedResponse = response.json();
  //   // values.createdBy(jsonedResponse.username);
  //   console.log(jsonedResponse)
  //   return(jsonedResponse.username)
  // };

  const fetchUserData = async () => {
    // // try 
      console.log(await fetchUserID())
      axios.get(`/users/profile/${await fetchUserID()}`)
      .then((res)=>{
        console.log(res.data)
        setValues(prevState => ({...prevState, createdBy : res.data.username}))
        console.log('......')
      })
      .catch(err => console.log(err))

    // } 
  }


  const handleUpload = () => {
    const time = new Date().getTime()
   
    // const uploadTask = storage.ref(`images/${time}${img.name}`).put(img);
    const uploadTask = storage.ref(`images/${time}${img.name}`).put(img);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const name = `${time}${img.name}`
        setImgName(name)
        // setValues.imgName(name)
        setValues(prevState => ({...prevState, imgName : name}))
        // setValues.imgName(name)
        console.log(name) 
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
          // setValues.imgUrl(url)
          setValues(prevState => ({...prevState, imgUrl : url}))
          console.log(values)
          // setValues.imgUrl(url)
        })
      }
    )
  };


  const addRecipe = async () => {
    console.log(values)
    try {
      const response = await axios.post(`/recipes/create`, {
        recipeName: values.recipeName,
        imgUrl: url,
        imgName: imgName,
        createdBy: values.createdBy,
        preTime: values.preTime,
        cookTime: values.cookTime,
        ingredients: values.ingredients,
        servings: values.servings,
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
      handleUpload()
      setSubmitted(true)
      addRecipe();
      // console.log({recipeName})
      console.log(values)
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
              {/* {submitted && values.recipeName==='' ? <span>Please enter Recipe Name</span> : null} */}
            </Grid>

            <Grid item xs={12}>
            { previewImg ? (
              <img src={previewImg} style = {{width:'200px'}, {height:'200px'}} />
            ): (
              <img src='http://via.placeholder.com/200x200'/>
            )}
            <input type='file' accept='image/*' onChange={handleChangeImg} />
              {/* <TextField
                variant="outlined"
                required
                fullWidth
                name="img"
                label="img"
                type="img"
                id="img"
                onChange ={handleOnChange}
              /> */}
            </Grid>

            {/* <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value ={values.createdBy}
                name="createdBy"
                label="createdBy"
                type="createdBy"
                id="createdBy"
                onChange ={handleOnChange}
              />
            </Grid> */}

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