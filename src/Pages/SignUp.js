import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, fetchSignInMethodsForEmail } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { database } from '../Firebase/RealtimeDatabase';
import { auth } from '../Firebase/Authentication';

import AlertSignUp from '../Alert/AlertSignUp';

const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState('');
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    const firstName = data.get('firstName');
    const lastName = data.get('lastName');

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        
        writeUserData(user.uid, firstName, lastName, email, null);
        navigate('/login');
        // Send email verification
        // sendEmailVerification(user)
        //   .then(() => {
        //     console.log('Verification email sent');
        //     setSuccess(true);
        //     setError('Verification email sent. Please check your inbox.');
        //     setOpen(true);
        //   })
        //   .catch((error) => {
        //     console.error('Error sending verification email:', error.message);
        //     setError('Failed to send verification email.');
        //     setSuccess(false);
        //     setOpen(true);
        //   });
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.error('Error during sign up:', errorMessage);
        setError(errorMessage);
        setSuccess(false);
        setOpen(true);
      });
  };

  function writeUserData(userId, firstName, lastName, email, imageUrl) {
    set(ref(database, 'users/' + userId), {
      firstName: firstName,
      lastName: lastName,
      email: email,
      profile_picture: imageUrl
    }).catch((error) => {
      console.error('Error writing user data:', error);
      setError('Failed to write user data to the database.');
      setSuccess(false);
      setOpen(true);
    });
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: -2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2" onClick={() => navigate('/login')}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
          <AlertSignUp open={open} success={success} error={error} handleClose={handleClose} />
        </Box>
      </Container>
    </ThemeProvider>
  );
}