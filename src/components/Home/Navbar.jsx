// NavBar.js

import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Avatar } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import HomeIcon from '@mui/icons-material/Home';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import InfoIcon from '@mui/icons-material/Info';
import PetsIcon from '@mui/icons-material/Pets';
import logo from './logo.jpg';

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          
          <img src={logo} alt="Logo" style={{ marginLeft: '10px', height: '40px', width: '40px', mixBlendMode: 'multiply' }} />
        </div>
        <IconButton component={Link} to="/Home2" color="inherit">
          <HomeIcon />
        </IconButton>
        <IconButton component={Link} to="/about" color="inherit">
          <InfoIcon />
        </IconButton>
        <IconButton component={Link} to="/cart" color="inherit">
          <AddShoppingCartIcon />
        </IconButton>
        <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
