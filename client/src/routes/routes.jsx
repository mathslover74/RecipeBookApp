import React from "react";
import { Switch, Route, Redirect} from "react-router-dom";
import SignIn from '.././components/SignIn'
import Dashboard from "../components/Dashboard";
import SignUp from '../components/SignUp';
import  NewRecipe from '../components/NewRecipe';
import AuthAPI from "../utils/AuthAPI";

function Routes(){
  return(
    <Switch>
      <RouteReg path='/signin' component={SignIn}/>
      <RouteReg path='/signup' component={SignUp}/>
      <RouteProtected path='/dashboard' component={Dashboard}/>
      <RouteProtected path='/recipe/new' component={NewRecipe}/>
    </Switch>
  )
}

const RouteReg =({component: Component, ...rest}) => {
  const authApi = React.useContext(AuthAPI);
  return (
    <Route
      {...rest} 
      render = {props => 
        !authApi.auth ? <Component {...props}/> : <Redirect to='/dashboard'/>
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