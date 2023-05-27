import React from 'react';
import { Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container, Autocomplete, Alert, AlertTitle, Avatar, Collapse, IconButton } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import cx from 'classnames';
import axios from 'axios';

const theme = createTheme();

const DeptList = [
  { label: "Mechanical Eng." },
  { label: "Computer Science Eng." },
  { label: "Civil Eng," },
  { label: "Electronics and Comm. Eng" },
  { label: "Electrical Eng." },
  { label: "Dept of BAS" },
  { label: "Dept of CS" },
  { label: "Dept of ME" },
  { label: "Dept of physics" },
  { label: "Dept of Civil Eng" }
]

const BatchList = [
  { label: "UG 2010-14" },
  { label: "UG 2011-15" },
  { label: "UG 2012-16" },
  { label: "UG 2013-17" },
  { label: "UG 2014-18" },
  { label: "UG 2015-19" },
  { label: "UG 2016-20" },
  { label: "UG 2017-21" },
  { label: "UG 2018-22" },
  { label: "UG 2019-23" },
  { label: "UG 2020-24" },
  { label: "UG 2021-25" },
  { label: "UG 2022-26" },
  { label: "PG 2015-17" },
  { label: "PG 2016-18" },
  { label: "PG 2017-19" },
  { label: "PG 2018-20" },
  { label: "PG 2019-21" },
  { label: "PG 2020-22" },
  { label: "PG 2021-23" },
  { label: "PG 2022-24" },
  { label: "PHD 2013-18" },
  { label: "PHD 2014-19" },
  { label: "PHD 2015-20" },
  { label: "PHD 2016-21" },
  { label: "PHD 2017-22" },
  { label: "PHD 2018-23" },
  { label: "PHD 2019-24" },
  { label: "PHD 2020-25" },

]

export default function SignUp() {
  const history = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)

    const user = formData;

    axios.post('/users/register', user).then((response) => {
      console.log(response);
      if (response.status === 200)
        return history('/login');

      setErrorMsg(response.data.message);
      setFormData({});
    }).catch(err => {
      setErrorMsg(err.response.data.message);
      setFormData({});
    })
  };

  const [formData, setFormData] = useState({
    "firstName": "Chandrashekhar",
    "lastName": "Tripathi",
    "email": "tripathics17@gmail.com",
    "phone": "+918448052150",
    "batch": "UG 2010-14",
    "department": "Mechanical Eng.",
    "password": "12345"
  });

  const handleChange = (name, value) => {
    setFormData(prevData => ({ ...prevData, [name]: value }));
  }

  return (
    <ThemeProvider theme={theme}>
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
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Collapse in={errorMsg.length !== 0}>
              <Alert
                severity='error'
                variant='outlined'
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setErrorMsg('');
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ my: 3 }}
              >
                {errorMsg}
              </Alert>
            </Collapse>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  value={formData.firstName || ''}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  value={formData.lastName || ''}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
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
                  value={formData.email || ''}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <div className='phoneInputField phoneInputField2'>
                  <PhoneInput
                    defaultCountry="IN"
                    value={formData.phone || ''}
                    onChange={(val) => {
                      handleChange('phone', val)
                      // setPhoneValue(val);
                    }}
                    className={cx({ filled: formData?.phone })}
                  />
                  <label className='phoneInputLabel'>Phone number *</label>
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  id="combo-box-demo"
                  options={BatchList}
                  isOptionEqualToValue={(option, value) => option.label === value.label}
                  value={{ label: formData.batch || '' }}
                  onInputChange={(e, val) => handleChange('batch', val)}
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
                  isOptionEqualToValue={(option, value) => option.label === value.label}
                  value={{ label: formData.department || '' }}
                  onInputChange={(e, val) => handleChange('department', val)}
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
                  value={formData.password}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
              </Grid>

              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}