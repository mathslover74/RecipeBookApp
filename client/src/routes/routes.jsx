import React from "react";
import { Switch, Route} from "react-router-dom";
import SignIn from '.././components/SignIn'
import Dashboard from "../components/Dashboard";
import SignUp from '../components/SignUp';

function Routes(){
  return(
    <Switch>
      <Route path='/signin' component={SignIn}/>
      <Route path='/signup' component={SignUp}/>
      <Route path='/dashboard' component={Dashboard}/>
    </Switch>
  )
}

export default Routes;