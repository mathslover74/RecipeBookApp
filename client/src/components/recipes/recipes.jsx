import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import { red } from '@material-ui/core/colors';
import CardActionArea from '@material-ui/core/CardActionArea';
import Box from '@material-ui/core/Box';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

//default export
export default function Recipes({recipes}) { 

  useEffect(()=> {
    checkUserID()
    checkSuperUser()
  })
  
  const [UserID, setUserID] = useState('')
  const [SuperUser, setSuperUser] = useState('')
  const classes = useStyles();

  const checkUserID = async () => {
    const res = await axios.get('/users/profile/')
    setUserID(res.data)
  }

  const checkSuperUser = async () => {
    const res = await axios.get(`/users/profile/${UserID}/`)
    setSuperUser(res.data.superUser)
  }

  return(
    
    <>
      <Box display='flex' flexWrap='wrap'>
        {recipes && recipes.map((recipe,index) =>
        <Box key ={recipe._id} p={1} width='30%'>
          <Card key = {`${index}._id`}className={classes.root}>
          
           {SuperUser ?
             <CardActionArea key = {`Super${index}._id`} component={Link} to={`/recipe/${recipe._id}`}>
               <h2>{recipe.recipeName}</h2>
               {/* <Link key={`${index}_id`} to={`/recipe/${recipe._id}`}>{recipe.recipeName} </Link>  */}
                <CardHeader key = {`SuperCard${index}._id`}
                  // title = {recipe.recipeName}
                  // subheader = {recipe._id}
                  subheader = {`Created by ${recipe.createdBy}`}
                />
                <CardMedia key = {`SuperMedia${index}._id`}
                  className={classes.media}
                  image= {recipe.imgUrl}
                  title= {recipe.recipeName}
                />
             </CardActionArea>
             :
             <CardActionArea key = {`Norm${index}._id`} component={Link} to={`/viewrecipe/${recipe._id}`}>
               <h2>{recipe.recipeName}</h2>
              <CardHeader key = {`NormCard${index}._id`}
                subheader = {`Created by ${recipe.createdBy}`}
              />
              <CardMedia key = {`NormMedia${index}._id`}
                className={classes.media}
                image= {recipe.imgUrl}
                title= {recipe.recipeName}
              />
           </CardActionArea>
          }
          </Card>  
        </Box>
      )}
      </Box>

 
    </>
  )
}
