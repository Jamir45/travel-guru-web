import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import './Header.css'
import { Link, useHistory } from 'react-router-dom';
import { Avatar, Button, Fab } from '@material-ui/core';
import { useData } from '../AuthProvider/AuthProvider';

const UserMenu = () => {
   const history = useHistory()

   const contexts = useData()
   const user = contexts.user

   const [anchorEl, setAnchorEl] = React.useState(null);
   const open = Boolean(anchorEl);
   
   const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
   };
   
   const handleClose = () => {
      setAnchorEl(null);
   };

   return (
      <div className='text-center d-flex'>
         {
            user ? 
            <div onClick={handleMenu}>
               { 
                  user.picture ? 
                  <Avatar 
                     alt="Remy Sharp" 
                     style={{cursor:'pointer'}} 
                     src={user.picture} 
                  />
                     : 
                  <Fab 
                     className='userName'
                     size="medium" 
                     variant="extended"
                  >
                     {user.name}
                  </Fab>
               }
            </div>
               :
            <Button 
               onClick={handleMenu} 
               className='logInBtn login' 
               variant="contained"
            >
               Login
            </Button>
         }
         <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
               vertical: 'top',
               horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
               vertical: 'top',
               horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
         >
            <MenuItem onClick={handleClose}>
               {
                  user ? <Link> Profile </Link> : 
                  <Link to="/signin"> Sign In </Link>
               }
            </MenuItem>
            <MenuItem onClick={handleClose}>
               {
                  user ? 
                  <Link onClick={() => contexts.signOut(history)}> 
                     Sign Out 
                  </Link> 
                     : 
                  <Link to="/signup"> 
                     Sign Up 
                  </Link>
               }
            </MenuItem>
         </Menu>
      </div>
   );
};

export default UserMenu;