import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import { red } from '@material-ui/core/colors';
import CardActionArea from '@material-ui/core/CardActionArea';
import Box from '@material-ui/core/Box';

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



export default function MyRecipes({recipes}) { 

  const classes = useStyles();

  return(
    
    <>

      <Box display='flex' flexWrap='wrap' >
        {recipes && recipes.map((recipe,index) =>
        <Box  key = {`My${index}._id`} p={1} width='30%' > 
          <Card  key = {`MyCard${index}._id`}className={classes.root}>
          <CardActionArea key = {`MyCardAction${index}._id`} component={Link} to={`/recipe/${recipe._id}`} >
          <h2>{recipe.recipeName} </h2>
          <CardHeader key = {`MyHeader${index}._id`}
            subheader = {`Created by ${recipe.createdBy}`}
          />
          <CardMedia key = {`MyMedia${index}._id`}
            className={classes.media}
            image= {recipe.imgUrl}
            title= {recipe.recipeName}
          />
          </CardActionArea>
          </Card>  
        </Box>
      )}
      </Box>
    </>
  )
}

