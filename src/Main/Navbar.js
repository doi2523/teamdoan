import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AppBar from '@mui/material/AppBar';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LogoutIcon from '@mui/icons-material/Logout'; // Icon Đăng xuất
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

// Import CustomToolbar
import CustomToolbar from './CustomToolbar';

const VdoiLogo = 'https://placekitten.com/200/200'; // Thay bằng URL thực tế của logo Vdoi

const Navbar = () => {
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const toggleDrawer = (open) => {
        setDrawerOpen(open);
    };

    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            setIsLoggedIn(false);
            navigate('/login');
        }).catch((error) => {
            console.error('Error signing out:', error);
        });
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <CustomToolbar toggleDrawer={toggleDrawer} isLoggedIn={isLoggedIn} />
            </AppBar>
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => toggleDrawer(false)}
                sx={{
                    '& .MuiDrawer-paper': {
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',  // Thêm bóng đổ cho đẹp
                    },
                }}
            >
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={() => toggleDrawer(false)}
                    onKeyDown={() => toggleDrawer(false)}
                >
                    <List>
                        <ListItem button sx={{ borderBottom: '1px solid #ccc', }}>
                            <ListItemAvatar>
                                <Avatar src={VdoiLogo} />
                            </ListItemAvatar>
                            <ListItemText primary="React Logo" />
                        </ListItem>
                        <ListItem button onClick={() => navigate('/')}>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItem>
                        {isLoggedIn ? (
                            <ListItem button onClick={handleLogout}>
                                <ListItemIcon>
                                    <LogoutIcon />
                                </ListItemIcon>
                                <ListItemText primary="Logout" />
                            </ListItem>
                        ) : (
                            <>
                                <ListItem button onClick={() => navigate('/login')}>
                                    <ListItemIcon>
                                        <LoginIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Login" />
                                </ListItem>
                                <ListItem button onClick={() => navigate('/signup')}>
                                    <ListItemIcon>
                                        <PersonAddIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Signup" />
                                </ListItem>
                            </>
                        )}
                    </List>
                </Box>
            </Drawer>
        </Box>
    );
};

export default Navbar;
