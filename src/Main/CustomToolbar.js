import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import AccountCircle from '@mui/icons-material/AccountCircle'; // Avatar icon
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const CustomToolbar = ({ toggleDrawer, isLoggedIn }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Toolbar variant="dense" sx={{ height: '60px' }}> {/* Increased height */}
      <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={() => toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1 }}>
        ReactApp
      </Typography>
      {isLoggedIn ? (
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
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
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
          </Menu>
        </div>
      ) : (
        <Box component="div" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', minWidth: '200px' }}>
          <Button variant="contained" color="secondary" onClick={() => navigate('/login')} sx={{ mx: 1, minWidth: '100px' }}>
            Login
          </Button>
          {/* <Typography variant="body1" color="inherit" component="span" sx={{ mx: 1 }}>
            or
          </Typography>
          <Button variant="contained" color="secondary" onClick={() => navigate('/signup')} sx={{ mx: 1, minWidth: '100px' }}>
            Signup
          </Button> */}
        </Box>
      )}
    </Toolbar>
  );
};

export default CustomToolbar;
