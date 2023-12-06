import React, { useState } from "react";
import { Grid, Typography, TextField, Autocomplete, Box, Button } from "@mui/material";
import { DateField } from "@mui/x-date-pickers/DateField";
import { CATEGORIES, NATIONALITIES, RELIGIONS } from '../data'
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import cx from 'classnames';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FormLabel } from "@mui/material";

export default function UpdateProfile() {
  const [formData, setFormData] = useState({});
  const [formFiles, setFormFiles] = useState({});
  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }
  const handleFileInputChange = (name, value) => {
    setFormFiles((prevData) => ({ ...prevData, [name]: value }));
    setFormData((prevData) => ({ ...prevData, [name]: null }));
  }
  const [sign, setSign] = useState(null);
  const [profilePic, setProfilePic] = useState(null);


  React.useEffect(() => {
    if (formFiles.sign && formFiles.passport) {
      setProfilePic(formFiles.passport);
      setSign(formFiles.sign);
    }
    // eslint-disable-next-line
  }, [])

  return (
    <React.Fragment>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
        <Typography variant="h6" gutterBottom>
          Personal Details
        </Typography>
        <Box component='form'>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="firstName"
                name="firstName"
                value={formData.firstName || ''}
                onChange={e => { handleInputChange(e.target.name, e.target.value) }}
                label="First name"
                fullWidth
                autoComplete="given-name"
                variant="standard"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="lastName"
                name="lastName"
                value={formData.lastName || ''}
                onChange={e => { handleInputChange(e.target.name, e.target.value) }}
                label="Last name"
                fullWidth
                autoComplete="family-name"
                variant="standard"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <DateField
                required
                value={formData.dob || null}
                onChange={(newValue) => {
                  handleInputChange('dob', newValue)
                }}
                label="Date of Birth" variant="standard" fullWidth format="DD/MM/YYYY" />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Autocomplete
                id="category"
                options={CATEGORIES}
                isOptionEqualToValue={(option, value) => option.label === value.label}
                value={{ label: formData.category || '' }}
                onInputChange={(e, val) => {
                  handleInputChange('category', val);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    autoComplete="category"
                    name="category"
                    required
                    value={formData.category || ''}
                    onChange={e => { handleInputChange(e.target.category, e.target.value) }}
                    variant="standard"
                    fullWidth
                    label="Category"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Autocomplete
                id="nationality"
                options={NATIONALITIES}
                isOptionEqualToValue={(option, value) => option.label === value.label}
                value={{ label: formData.nationality || '' }}
                onInputChange={(e, val) => {
                  handleInputChange('nationality', val);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    autoComplete="Nationality"
                    name="nationality"
                    variant="standard"
                    fullWidth
                    label="Nationality"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Autocomplete
                id="religion"
                options={RELIGIONS}
                isOptionEqualToValue={(option, value) => option.label === value.label}
                value={{ label: formData.religion || '' }}
                onInputChange={(e, val) => {
                  handleInputChange('religion', val);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    autoComplete="religion"
                    name="religion"
                    value={formData.religion || ''}
                    onChange={e => { handleInputChange(e.target.name, e.target.value) }}
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
                required
                value={formData.address || ''}
                onChange={e => { handleInputChange(e.target.name, e.target.value) }}
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
                required
                fullWidth
                value={formData.pincode || ''}
                onChange={e => { handleInputChange(e.target.name, e.target.value) }}
                autoComplete="pincode"
                variant="standard"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="state"
                name="state"
                label="State/Province/Region"
                value={formData.state || ''}
                required
                onChange={e => { handleInputChange(e.target.name, e.target.value) }}
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
                value={formData.city || ''}
                onChange={e => { handleInputChange(e.target.name, e.target.value) }}
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
                value={formData.country || ''}
                onChange={e => { handleInputChange(e.target.name, e.target.value) }}
                autoComplete="shipping country"
                variant="standard"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <div className='phoneInputField'>
                <PhoneInput
                  defaultCountry="IN"
                  value={formData.phone || ''}
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
                  value={formData.altPhone || ''}
                  onChange={(val) => {
                    handleInputChange('altPhone', val);
                  }}
                  className={cx({ filled: formData.altPhone })}
                />
                <label className='phoneInputLabel'>Alternate phone number</label>
              </div>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                disabled={true}
                id="email"
                name="email"
                label="Email"
                fullWidth
                value={formData.email || ''}
                onChange={e => { handleInputChange(e.target.name, e.target.value) }}
                autoComplete="email"
                variant="standard"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="altEmail"
                name="altEmail"
                label="Alternate Email"
                fullWidth
                value={formData.altEmail || ''}
                onChange={e => { handleInputChange(e.target.name, e.target.value) }}
                autoComplete="altEmail"
                variant="standard"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="linkedin"
                type="url"
                name="linkedin"
                label="Linkedin"
                fullWidth
                value={formData.linkedin || ''}
                onChange={e => { handleInputChange(e.target.name, e.target.value) }}
                autoComplete="linkedin"
                variant="standard"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="github"
                type="url"
                name="github"
                label="Github"
                value={formData.github || ''}
                onChange={e => { handleInputChange(e.target.name, e.target.value) }}
                fullWidth
                variant="standard"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                autoComplete="course completed"
                name="courseCompleted"
                required
                variant="standard"
                fullWidth
                id="courseCompleted"
                label="Course Completed"
                value={formData.courseCompleted || ''}
                onChange={e => { handleInputChange('courseCompleted', e.target.value) }}
              />

            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                autoComplete="registrationNo"
                name="registrationNo"
                required
                variant="standard"
                fullWidth
                id="registrationNo"
                label="Registration No."
                value={formData.registrationNo || ''}
                onChange={e => { handleInputChange(e.target.name, e.target.value) }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                autoComplete="RollNo."
                name="rollNo"
                variant="standard"
                fullWidth
                id="rollNo"
                label="Roll No."
                value={formData.rollNo || ''}
                onChange={e => { handleInputChange(e.target.name, e.target.value) }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                autoComplete="discipline"
                name="discipline"
                variant="standard"
                required
                fullWidth
                id="discipline"
                value={formData.discipline || ''}
                onChange={e => { handleInputChange('discipline', e.target.value) }}
                label="Decipline Studied"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="gradYear"
                type="number"
                name="gradYear"
                label="Year of Graduation"
                InputProps={{ inputProps: { min: 2014 } }}
                required
                fullWidth
                value={formData.gradYear || ''}
                onChange={e => { handleInputChange(e.target.name, e.target.value) }}
                autoComplete="gradYear"
                variant="standard"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormLabel sx={{ my: 2 }} component="legend">
                Signature *
              </FormLabel>
              {(sign || formData.sign) && (
                <div>
                  <img
                    alt="not found"
                    width={"135px"}
                    height={"100px"}
                    src={formData.sign
                      ? `http://localhost:5000/media/${formData.sign}`
                      : URL.createObjectURL(sign)}
                  />
                </div>
              )}
              <Button variant="outlined" component="label">
                {!(sign || formData.sign) ? 'Upload File' : 'Change File'}
                <input
                  type="file"
                  name="sign"
                  required={!formData.sign?.length && !sign}
                  onChange={(event) => {
                    if (event.target.files) {
                      handleFileInputChange('sign', event.target.files[0])
                      setSign(event.target.files[0]);
                    } else {
                      handleFileInputChange('sign', null)
                      setSign(null);
                    }
                  }}
                  style={{
                    width: '1px',
                    opacity: '0',
                    top: '0',
                    bottom: '0',
                    position: 'absolute',
                    pointerEvents: 'none'
                  }}
                />
              </Button>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormLabel sx={{ my: 2 }} component="legend">
                Passsport size photo *
              </FormLabel>
              {(profilePic || formData.passport) && (
                <div>
                  <img
                    alt="not found"
                    width={"135px"}
                    height={"150px"}
                    src={formData.passport
                      ? `http://localhost:5000/media/${formData.passport}`
                      : URL.createObjectURL(profilePic)}
                  />
                </div>
              )}
              <Button variant="outlined" component="label">
                {!(formData.passport || profilePic) ? 'Upload File' : 'Change File'}
                <input
                  type="file"
                  name="passport"
                  required={!formData.passport?.length && !profilePic}
                  onChange={(event) => {
                    if (event.target.files) {
                      handleFileInputChange('passport', event.target.files[0])
                      setProfilePic(event.target.files[0]);
                    } else {
                      handleFileInputChange('passport', null)
                      setProfilePic(null);
                    }
                  }}
                  style={{
                    width: '1px',
                    opacity: '0',
                    top: '0',
                    bottom: '0',
                    position: 'absolute',
                    pointerEvents: 'none'
                  }}
                />
              </Button>
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              type="submit"
              sx={{ mt: 3, ml: 1 }}
            >
              Next
            </Button>
          </Box>
        </Box>
      </LocalizationProvider>
    </React.Fragment>
  );
}
