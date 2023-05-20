
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container, Autocomplete, Alert, AlertTitle } from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { auth, provider, facebookProvider, microsoftProvider } from '../config/config'

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"




function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        NIT AP Alumni Association
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();


export default function LogIn() {
  const history = useNavigate();
  const loginAuth = async (user) => {
    try {
      const email = user.email;
      const password = user.password;
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-type': 'application/json'
        }
      });
      console.log(response);

      if (response) {
        history('/');
      }
      // console.log(response);
      // if(response.status===404){
      //   alert("user not found");
      // }
      // const token = response.data.token;

      // // Save the token to local storage
      // if(token) 
      // {
      //   console.log(token);
      // }
      // localStorage.setItem('token', token);

      // Redirect to the dashboard or perform any other action
      // For example, you can use React Router to navigate to the dashboard
      // history.push('/dashboard');
      // console.log('Login successful');
    } catch (error) {
      alert("user not found please enter a valid email and password");
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const user = {
      email: data.get('email'),
      password: data.get('password'),
    };
    console.log(user);
    // call the function of user
    loginAuth(user)
  };

  const [signedUp, setSignedUp] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/null/external-alumni-university-flaticons-flat-flat-icons-3.png" />

          {signedUp && <>
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              This is a success alert — <strong>check it out!</strong>
            </Alert>
          </>}
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* 
            <div className='MoreOptions'>
              <h3>OR</h3>
              <div className='SignInOptions'>
              <div onClick={SignUpGoogle}>
              <img src="https://img.icons8.com/color/48/null/google-logo.png"/>
              </div>

              <div onClick={signUpFacebook}>
              <img src="https://img.icons8.com/fluency/48/null/facebook-new.png"/>
              </div>

              <div onClick={signUpMicrosoft}>
              <img src="https://img.icons8.com/color/48/null/microsoft.png"/>
              </div>
              </div>

            </div> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>

            {/* {user ? <>hello </> :  <div>
              <button onClick={handleClick}>Sign in with google</button>
            </div>} */}

          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}