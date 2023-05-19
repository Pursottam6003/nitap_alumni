import { useState } from "react";
import React from "react";
import {Grid,Typography, FormControlLabel, Checkbox, TextField, Autocomplete, Box, Button} from "@mui/material";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import cx from 'classnames';

const TitleList = [
  { label: "Mr.", value:"Mr" },
  { label: "Miss", value:"Miss" },
  { label: "Mrs", value:"Mrs" },
  { label: "Dr" , value:"Dr" },
];
const NationalityList = [
  { label: "Indian" },
  { label: "Srilankan" },
  { label: "Bangladeshi" },
  { label: "Nepali" },
  { label: "Chinese" },
];

const categoryList = [
  { label: "General" },
  { label: "OBC" },
  { label: "OBC-NCL" },
  { label: "Gen-EWS" },
  { label: "SC" },
  { label: "CT" },
  { label: "Others" },
];

const ReligionList = [
  { label: "Hindu" },
  { label: "Muslim" },
  { label: "Indegeneous" },
  { label: "Christian" },
  { label: "Sikh" },
  { label: "Jain" },
  { label: "Other" },
];

export default function PersonalDetails({
  activeStep,
  handleBack,
  handleNext,
  formData,
  handleInputChange
}) {
  const [value, setValue] = useState(dayjs("2000-04-07"));
  const [myphoneVal, setPhoneVal] = useState(null);
  const [alternateNo, setAlternateNo] = useState(null);

  /**
   * @param {Event} e
   * */
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const d = {
      title: data.get('title'),
      dob: data.get('dob'),
      firstName: data.get('firstName'),
      middleName: data.get('middleName'),
      lastName: data.get('lastName'),
      nationality: data.get('nationality'),
      category: data.get('category'),
      religion: data.get('religion'),
      address: data.get('address'),
      pincode: data.get('pincode'),
      state: data.get('state'),
      city: data.get('city'),
      country: data.get('country'),
      email: data.get('email'),
      occupation: data.get('occupation'),
      jobtitle: data.get('jobtitle')
    }
    handleNext(d);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Personal Details
      </Typography>
      <Box component='form' onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              id="title"
              options={TitleList}
              value= {formData.title}
              onInputChange={(e, val)=>{
                handleInputChange('title',val)
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  autoComplete="title"
                  name="title"
                  required
                  variant="standard"
                  label="Title (eg Mr/Ms/Dr)"
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDatePicker
                label="Date of Birth"
                value={dayjs(formData.dob)}
                required
                id="dob"
                fullWidth
                autoComplete="dob"
                variant="standard"
                onChange={(newValue) => {
                  handleInputChange('dob', newValue.format('MM/DD/YYYY'))
                }}
                renderInput={(params) => (
                  <TextField
                    required
                    fullWidth
                    name="dob"
                    {...params}
                    variant="standard"
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              required
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={e => {handleInputChange(e.target.name, e.target.value)}}
              label="First name"
              fullWidth
              autoComplete="given-name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="middleName"
              name="middleName"
              value = {formData.middleName}
              onChange={e => {handleInputChange(e.target.name, e.target.value)}}
              label="Middle name"
              fullWidth
              autoComplete="family-name"
              variant="standard"
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              required
              id="lastName"
              name="lastName"
              value = {formData.lastName}
              onChange={e => {handleInputChange(e.target.name, e.target.value)}}
              label="Last name"
              fullWidth
              autoComplete="family-name"
              variant="standard"
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Autocomplete
              id="nationality"
              options={NationalityList}
              value = {formData.nationality}
              onInputChange={(e,val)=>{
                handleInputChange('nationality',val);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  autoComplete="Nationality"
                  name="nationality"
                  variant="standard"
                  fullWidth
                  label="Nationality"
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Autocomplete
              id="category"
              options={categoryList}
              value = {formData.category}
              onInputChange={(e,val)=>{
                handleInputChange('category',val);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  autoComplete="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={e => {handleInputChange(e.target.category, e.target.value)}}
                  variant="standard"
                  fullWidth
                  label="Category"
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Autocomplete
              id="religion"
              options={ReligionList}
              value = {formData.religion}
              onInputChange={(e,val)=>{
                handleInputChange('religion',val);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  autoComplete="religion"
                  name="religion"
                  value={formData.religion}
                  onChange = {e => {handleInputChange(e.target.name,e.target.value)}}
                  required
                  variant="standard"
                  fullWidth
                  label="Religion"
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="address"
              name="address"
              label="Current Address"
              fullWidth
              value = {formData.address}
              onChange = {e => {handleInputChange(e.target.name,e.target.value)}}
              autoComplete="applicant address"
              variant="standard"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id="pincode"
              type="number"
              name="pincode"
              label="Pincode"
              fullWidth
              value = {formData.pincode}
              onChange = {e => {handleInputChange(e.target.name,e.target.value)}}
              autoComplete="pincode"
              variant="standard"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id="state"
              name="state"
              label="State/Province/Region"
              value = {formData.state}
              onChange = {e => {handleInputChange(e.target.name,e.target.value)}}
              fullWidth
              variant="standard"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              value = {formData.city}
              onChange = {e => {handleInputChange(e.target.name,e.target.value)}}
              autoComplete="shipping address-level2"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              name="country"
              label="Country"
              fullWidth
              value = {formData.country}
              onChange = {e => {handleInputChange(e.target.name,e.target.value)}}
              autoComplete="shipping country"
              variant="standard"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <div className='phoneInputField'>
              <PhoneInput
                defaultCountry="IN"
                value={formData.phone}
                onChange={(val) => {
                  handleInputChange('phone', val);
                }}
                className={cx({ filled: formData.phone })}
              />
              <label className='phoneInputLabel'>Phone number *</label>
            </div>
          </Grid>

          <Grid item xs={12} sm={6}>
            <div className='phoneInputField'>
              <PhoneInput
                defaultCountry="IN"
                value={formData.altPhone}
                onChange={(val) => {
                  handleInputChange('altPhone', val);
                }}
                className={cx({ filled: formData.altPhone })}
              />
              <label className='phoneInputLabel'>Alternate phone number *</label>
            </div>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              value = {formData.email}
              onChange = {e => {handleInputChange(e.target.name,e.target.value)}}
              autoComplete="email"
              variant="standard"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="occupation"
              name="occupation"
              label="Occupation"
              fullWidth
              value = {formData.occupation}
              onChange = {e => {handleInputChange(e.target.name,e.target.value)}}
              autoComplete="occupation"
              variant="standard"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              id="jobtitle"
              name="jobtitle"
              label="Job Title"
              fullWidth                  
              value = {formData.jobtitle}
              onChange = {e => {handleInputChange(e.target.name,e.target.value)}}
              autoComplete="jobtitle"
              variant="standard"
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
            required
              control={
                <Checkbox color="secondary" name="saveAddress" value="yes" />
              }
              label="I confirm the Personal Details are authentic"
            />
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          {activeStep !== 0 && (
            <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
              Back
            </Button>
          )}

          <Button
            variant="contained"
            type="submit"
            sx={{ mt: 3, ml: 1 }}
          >
            Next
          </Button>
        </Box>
      </Box>
    </React.Fragment>
  );
}
