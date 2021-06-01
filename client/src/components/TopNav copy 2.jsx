import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {signout} from './auth-api'
import AuthApi from '../utils/AuthAPI'
import { Redirect } from 'react-router';

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const authApi = React.useContext(AuthApi);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async ()=>{
    const res = await signout();
    authApi.setAuth(res.data.auth);
  }

  const handleCreateNewRecipe = () => {
    return <Redirect to='/signin'/>
  }

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Open Menu
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleCreateNewRecipe}>Create New Recipe</MenuItem>
        <MenuItem onClick={handleCreateNewRecipe}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
      
    </div>
  );
}
