import React from "react";
import { Grid, Typography, TextField, Autocomplete, Box, Button } from "@mui/material";
import { DateField } from "@mui/x-date-pickers/DateField";
import { CATEGORIES, NATIONALITIES, RELIGIONS, TITLES } from '../data'
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import cx from 'classnames';

export default function PersonalDetails({ activeStep, handleBack, handleNext, formData, handleInputChange }) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Personal Details
      </Typography>
      <Box component='form' onSubmit={handleNext}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={2.5}>
            <Autocomplete
              id="title"
              options={TITLES}
              disabled={true}
              isOptionEqualToValue={(option, value) => option.label === value.label}
              value={{ label: formData.title || '' }}
              onInputChange={(e, val) => {
                handleInputChange('title', val)
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  autoComplete="title"
                  name="title"
                  required
                  variant="standard"
                  label="Title"
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={3.5}>
            <TextField
              required
              id="firstName"
              name="firstName"
              disabled={true}
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
              disabled={true}
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
