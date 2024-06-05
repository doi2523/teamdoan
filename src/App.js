import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './Main/Navbar';
import AppRoutes from './MainRouter/RouterLogin';
import Footer from './Main/Footer';

export default function App() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <CssBaseline />
      <Router>
        <Navbar />
        <Box sx={{ flexGrow: 1 }}>
          <AppRoutes />
        </Box>
      </Router>
      <Footer />
    </Box>
  );
}