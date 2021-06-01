import React from "react";
import { Switch, Route, Redirect,useParams} from "react-router-dom";
import SignIn from '.././components/SignIn'
import Dashboard from "../components/Dashboard";
import SignUp from '../components/SignUp';
import  NewRecipe from '../components/NewRecipe';
import UpdateRecipe from '../components/UpdateRecipe'
// import About from '../components/'
import AuthAPI from "../utils/AuthAPI";
import TopNav from '../components/TopNav'

// function recipeID() {
//   let { recipeID } = useParams();
//   return <div>{recipeID}</div> 
// }

// function Recipe() {
//   let { recipeID } = useParams();
//   return <div>Now showing post JSON.stringify(recipeID)</div>;
// }


function Routes(){
  return(
    <Switch>
      {/* <Redirect to='/signin'/> */}
      {/* <Route path='/recipe/update/:id' component={About}>
        <Recipe />
      </Route> */}
      <RouteReg path='/signin' component={() => withLayout(SignIn)}/>
      <RouteReg path='/signup' component={SignUp}/>
      {/* <RouteReg path='/recipe/update' component={UpdateRecipe}/> */}
      {/* <RouteReg path='/recipe/update/:id' component={UpdateRecipe}/> */}
      <RouteProtected path='/dashboard' component={Dashboard}/>
      <RouteProtected path='/recipe/new' component={NewRecipe}/>
      <RouteProtected path='/recipe/:id' component={UpdateRecipe}/>
      {/* <RouteProtected exact path='/recipe/update' component={UpdateRecipe}/> */}
      {/* <RouteProtected path='/recipe/update/:id' component={UpdateRecipe}/> */}
        {/* <Recipe /> */}
      {/* <RouteProtected /> */}
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
        !authApi.auth ? <Component {...props}/> : <Redirect to='/dashboard'/>
        // !authApi.auth ? <Redirect to='/signin'/> : <Redirect to='/dashboard'/>
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


// function GrandChild() {
//   const { auth, setAuth } = React.useContext(MochiContext)
//   return (
//     <>
//      <button onClick={() => setAuth(!auth)}>change auth value</button>
//      {String(auth)}
//     </>
//   )
// }

// const MochiContext = React.createContext({ auth: false, setAuth: () => {} })

// function Child() {
//   // const { mochi } = React.useContext(MochiContext)
//   return (
//     <>
//     {/* {mochi} */}
//      child
//       <GrandChild />
//     </>
//   )
// }


// export function Parent() {
//   const [ auth, setAuth ] = React.useState(false)
//   return (
//     <MochiContext.Provider value={{ auth, setAuth }}>
//      <Child />
//     </MochiContext.Provider>
//   )
// }