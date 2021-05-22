import React from 'react';
import AuthApi from '../utils/AuthAPI'
import {signout} from '../components/auth-api'

function Dashboard() {
  const authApi = React.useContext(AuthApi);

  const handleLogout = async ()=>{
    const res = await signout();
    authApi.setAuth(res.data.auth);
  }
  return(
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Dashboard;