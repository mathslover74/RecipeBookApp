import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { blueGrey, red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { flexbox } from '@material-ui/system';
import Button from '@material-ui/core/Button';
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
    // checkSignIn()
    checkUserID()
    checkSuperUser()
    console.log('Recipe use effect')
  // },[])
  })

  console.log('........')

  const [UserID, setUserID] = useState('')
  const [SuperUser, setSuperUser] = useState('')
  // console.log(superUser)
  // console.log(recipes[0].recipeName)

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const checkUserID = async () => {
    const res = await axios.get('/users/profile/')
    console.log(res)
    setUserID(res.data)
    console.log(UserID)
  }

  const checkSuperUser = async () => {
    // const res = await axios.get(id)
    // const res = await axios.get(`/users/profile/60b7910b2857d061a8ba8a8d/`)
    const res = await axios.get(`/users/profile/${UserID}/`)
    console.log(res.data.superUser)
    setSuperUser(res.data.superUser)
  }

  return(
    
    <>

      <Box display='flex' flexWrap='wrap'>
        {recipes && recipes.map((recipe,index) =>
        <Box p={1} width='30%'>
          <Card className={classes.root}>
          {/* <CardActionArea href={`/recipe/60b4ee39107017402d582fa2`} > */}
          {/* <CardActionArea href=`/recipe/${recipe._id}` > */}
          
          {/* <CardActionArea component={Link} to={`/recipe/${recipe._id}/`} >
           */}

           {SuperUser ?
             <CardActionArea component={Link} to={`/recipe/${recipe._id}`}>
               <h2>{recipe.recipeName}</h2>
               {/* <Link key={`${index}_id`} to={`/recipe/${recipe._id}`}>{recipe.recipeName} </Link>  */}
                <CardHeader
                  // title = {recipe.recipeName}
                  // subheader = {recipe._id}
                  subheader = {`Created by ${recipe.createdBy}`}
                />
                <CardMedia
                  className={classes.media}
                  // image="http://via.placeholder.com/200x200"
                  image= {recipe.imgUrl}
                  // image="https://firebasestorage.googleapis.com/v0/b/recipeapp-react.appspot.com/o/images%2F1622986005066Lays_chips.jpeg?alt=media&token=884a7579-bff9-4b07-964e-dae958557f42"
                  title= {recipe.recipeName}
                />
             </CardActionArea>
             :
             <CardActionArea component={Link} to={`/viewrecipe/${recipe._id}`}>
               <h2>{recipe.recipeName}</h2>
             {/* <Link key={`${index}_id`} to={`/viewrecipe/${recipe._id}`}>{recipe.recipeName} </Link>  */}
              <CardHeader
                // title = {recipe.recipeName}
                // subheader = {recipe._id}
                subheader = {`Created by ${recipe.createdBy}`}
              />
              <CardMedia
                className={classes.media}
                // image="http://via.placeholder.com/200x200"
                image= {recipe.imgUrl}
                // image="https://firebasestorage.googleapis.com/v0/b/recipeapp-react.appspot.com/o/images%2F1622986005066Lays_chips.jpeg?alt=media&token=884a7579-bff9-4b07-964e-dae958557f42"
                title= {recipe.recipeName}
              />
           </CardActionArea>
          }
           {/* <CardActionArea >
          {SuperUser ?
          <Link key={`${index}_id`} to={`/recipe/${recipe._id}`}>{recipe.recipeName} </Link> 
          :
          <Link key={`${index}_id`} to={`/viewrecipe/${recipe._id}`}>{recipe.recipeName} </Link>
          }
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
          </CardActionArea> */}
          


          <CardContent>
            {/* <Typography variant="body2" color="textSecondary" component="p">
              This impressive paella is a perfect party dish and a fun meal to cook together with your
              guests. Add 1 cup of frozen peas along with the mussels, if you like.
            </Typography> */}
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
      )}
      </Box>

      {/* <div>
      {recipes && recipes.map((recipe, index) => 
      <>
        <h2 key={`${index}_recipe`} > {recipe.recipeName}</h2>
        <Link key={`${index}_id`} to={`/recipe/${recipe._id}`}>{recipe.recipeName} </Link>
      </>
      )}

      </div> */}
    
    </>
  )
}


// //named exportß
// export function Mochi() {
//   return (
//     <>
//      this is a mochi
//     </>
//   )
// }