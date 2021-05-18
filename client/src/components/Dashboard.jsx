import React from 'react';
import AuthApi from '../utils/AuthAPI'

function Dashboard() {
  const authApi = React.useContext(AuthApi);
  const handleLogout = ()=>{
    authApi.setAuth(false);

  }
  return(
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Dashboard;