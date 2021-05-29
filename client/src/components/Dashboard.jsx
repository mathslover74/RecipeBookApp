import React from 'react';
import AuthApi from '../utils/AuthAPI'
import {signout} from '../components/auth-api'
import { Link } from 'react-router-dom';
import TopNav from './TopNav'

function Dashboard() {
  const authApi = React.useContext(AuthApi);

  const handleLogout = async ()=>{
    const res = await signout();
    authApi.setAuth(res.data.auth);
  }


  return(
    <div>
      <TopNav />
      <div className= 'topNav'>
        <h1>Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
        <Link to={'/recipe/new'}>Create new recipe</Link>

      </div>

      <div className="create-recipe">
        
      </div>
    </div>
  )
}

export default Dashboard;