
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container } from '@mui/material';
import { apiPostCall } from '../utils/helpers';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const loginUser = apiPostCall('http://localhost:5000/users/')('login');

const theme = createTheme();

export default function LogIn() {
  const history = useNavigate();
  const [formData, setFormData] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault();

    // call api to login user
    loginUser({
      withCredentials: true,
      ...formData
    }).then(res => {
      console.log(res);
      if (res.status === 200) {
        history('/');
      }
    }).catch(err => {
      console.log(err);
    });
  };

  const handleChange = (name, value) => {
    setFormData(prevData => ({ ...prevData, [name]: value }));
  }

  return (
    <ThemeProvider theme={theme} >
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            my: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box sx={{ mt: 1 }}>
            <img src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/null/external-alumni-university-flaticons-flat-flat-icons-3.png" alt='' />
          </Box>
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
              value={formData.email}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              value={formData.password}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
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
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider >
  );
}