import React from 'react';
import {Button,CssBaseline,TextField,FormControlLabel,Checkbox,Link,Grid,Box,Typography,Container,Autocomplete,Alert,AlertTitle} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import {useNavigate} from 'react-router-dom'
import { useState } from 'react';
import {auth,fs} from '../config/config'
import cx from 'classnames';

const theme = createTheme();

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        NIT AP Alumni Cell
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const DeptList =[
  { label:"Mechanical Eng."},
  { label: "Computer Science Eng."},
  { label: "Civil Eng,"} ,
  { label: "Electronics and Comm. Eng"},
  { label: "Electrical Eng."},
  { label: "Dept of BAS"},
  { label: "Dept of CS"},
  { label: "Dept of ME"},
  { label: "Dept of physics"},
  { label: "Dept of Civil Eng"}
]

const BatchList =[
  {label:"UG 2010-14"},
  {label:"UG 2011-15"},
  {label:"UG 2012-16"},
  {label:"UG 2013-17"},
  {label:"UG 2014-18"},
  {label:"UG 2015-19"},
  {label:"UG 2016-20"},
  {label:"UG 2017-21"},
  {label:"UG 2018-22"},
  {label:"UG 2019-23"},
  {label:"UG 2020-24"},
  {label:"UG 2021-25"},
  {label:"UG 2022-26"},
  {label:"PG 2015-17"},
  {label:"PG 2016-18"},
  {label:"PG 2017-19"},
  {label:"PG 2018-20"} ,
  {label:"PG 2019-21"} ,
  {label:"PG 2020-22"} ,
  {label:"PG 2021-23"} ,
  {label:"PG 2022-24"} ,
  {label:"PHD 2013-18"} ,
  {label:"PHD 2014-19"} ,
  {label:"PHD 2015-20"} ,
  {label:"PHD 2016-21"} ,
  {label:"PHD 2017-22"} ,
  {label:"PHD 2018-23"} ,
  {label:"PHD 2019-24"} ,
  {label:"PHD 2020-25"} ,

]


export default function SignUp() {
  const history = useNavigate();

  const addUser = async (user) => {
    const response = await fetch(`http://localhost:5000/signup`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-type': 'application/json',
      },
    })
    // const token = response.data.token;
    // console.log(token);

    // // Save the token to local storage
    // localStorage.setItem('token', token);


    if (!response.ok) alert(`An error occured: ${response.statusText}`);
    return history('/login');
  }

  const handleSubmit = (e) => {

    e.preventDefault();
    const data = new FormData(e.currentTarget);
 
    const user ={
      fullName:data.get('firstName')+" "+data.get('lastName'),
      email: data.get('email'),
      phoneNumber:phoneVal,
      address:data.get('address'),
      password: data.get('password'),
      batch: data.get('batch'),
      dept : data.get('department'),
    }

    console.log(user)

    addUser(user);
   
  };

  const [phoneVal, setPhoneValue] = useState('')
  const [signedUp,setSignedUp] = useState(false);

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
          
            <img src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/null/external-alumni-university-flaticons-flat-flat-icons-3.png"/>
            { signedUp && <>
            <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            This is a success alert — <strong>check it out!</strong>
            </Alert>
            </>}
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
              <div className='phoneInputField phoneInputField2'>
                <PhoneInput
                defaultCountry="IN"
                onChange={(val) => {
                  setPhoneValue(val);
                }}
                className={cx({ filled:phoneVal })}
              />
              <label className='phoneInputLabel'>Phone number *</label>
            </div>
          </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="address"
                  label="Current Address"
                  type="text"
                  id="address"
                  autoComplete="location"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
              <Autocomplete 
                    id="combo-box-demo"
                    options={BatchList}
                    renderInput={(params) => <TextField {...params} 
                    autoComplete="batch"
                    name="batch"
                    required
                    fullWidth
                    id="batch"
                    label="Batch"
                    />}                  
                  />
              </Grid>

              <Grid item xs={12} sm={6}>
                
              <Autocomplete 
                    options={DeptList}
                    renderInput={(params) => <TextField {...params} 
                    autoComplete="department"
                    name="department"
                    required
                    fullWidth
                    id="department"
                    label="Department"
                    />}                  
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
                  label="I agree to receive updates and notifications of NIT AP Alumni Association"
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
                <Link href="login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}