import React from "react";
import { Switch, Route, Redirect} from "react-router-dom";
import SignIn from '.././components/SignIn'
import BrowseRecipe from "../components/BrowseRecipe";
import SignUp from '../components/SignUp';
import  NewRecipe from '../components/NewRecipe';
import UpdateRecipe from '../components/UpdateRecipe'
import MyRecipe from '../components/MyRecipe'
import ViewRecipe from '../components/ViewRecipe'
import AuthAPI from "../utils/AuthAPI";
import TopNav from '../components/TopNav'
import Firebase from '../components/firebase/FirebaseImg'



function Routes(){
  return(
    <Switch>

      <RouteReg path='/firebase' component={() => withLayout(Firebase)}/>
      <RouteReg path='/signin' component={() => withLayout(SignIn)}/>
      <RouteReg path='/signup' component={() => withLayout(SignUp)}/>

      <RouteProtected exact path='/browseRecipe' component={() => withLayout(BrowseRecipe)}/>
      <RouteProtected exact path='/viewrecipe/:id' component={ViewRecipe}/>
      <RouteProtected exact path='/recipe' component={() => withLayout(MyRecipe)}/>
      <RouteProtected exact path='/recipe/new' component={() => withLayout(NewRecipe)}/>
      <RouteProtected exact path='/recipe/:id' component={UpdateRecipe}/>

    </Switch>
  )
}

// Higher order component
function withLayout(WrappedComponent) {
  return (
    <>
          <TopNav />
         <WrappedComponent />
    </>
  )
}

const RouteReg =({component: Component, ...rest}) => {
  const authApi = React.useContext(AuthAPI);
  return (
    <Route
      {...rest} 
      render = {props => 
        !authApi.auth ? <Component {...props}/> : <Redirect to='/browseRecipe'/>
      } 
    />
  );
}

const RouteProtected =({component: Component, ...rest}) => {
  const authApi = React.useContext(AuthAPI);
  return (
    <Route
      {...rest} 
      render = {props => 
        authApi.auth ? <Component {...props}/> : <Redirect to='/signin'/>
      } 
    />
  );
}

export default Routes;