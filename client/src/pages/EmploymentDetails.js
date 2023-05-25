import * as React from "react";
import { useState } from "react";
import { Box, Grid, TextField, Typography, Button, FormControlLabel, FormControl, FormLabel, RadioGroup, Radio } from "@mui/material";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";


const EmploymentDetails = ({
  activeStep,
  handleBack,
  handleNext,
  formData,
  handleInputChange
}) => {

  /**
     * @param {Event} e
     * */

  const [currentStatus, setCurrentStatus] = useState(formData.currentStatus);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const d = {
      courseCompleted: data.get("courseCompleted"),
      discipline: data.get("discipline"),
      currentStatus: currentStatus,
      jobtitle: data.get('jobtitle'),
      occupation: data.get('occupation'),
      preparing: data.get('preparing'),
      onGoingCourseDetails: data.get('onGoingCourseDetails'),
      onGoingdiscipline: data.get('onGoingdiscipline'),
      currentOrganisation: data.get('currentOrganisation'),
      ctc: data.get('ctc'),
      date: data.get("date"),
      year: data.get("year"),
      membership: data.get("membership"),
    };
    const fields = {
      ongoingCourseDetails: 'higher-education',
      ongoingDiscipline: 'higher-education',
      ongoingGradYear: 'higher-education',
      ongoingInstitute: 'higher-education',
      currentOrganisation: 'working',
      occupation: 'working',
      jobtitle: 'working',
      ctc: 'working',
      preparing: 'preparing',
    }

    Object.keys(fields).filter(key => fields[key] !== currentStatus)
      .forEach(key => {
        handleInputChange(key, '');
      })
    handleNext(d);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Employment Details
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl required>
              <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                <FormControlLabel onChange={(e) => handleInputChange('currentStatus', 'working')} checked={formData.currentStatus === 'working'} value="working" control={<Radio />} label="Working Professional" />
                <FormControlLabel onChange={(e) => handleInputChange('currentStatus', 'higher-education')} checked={formData.currentStatus === 'higher-education'} value="higher-education" control={<Radio />} label="Pursuing for Higher Education" />
                <FormControlLabel onChange={(e) => handleInputChange('currentStatus', 'preparing')} checked={formData.currentStatus === 'preparing'} value="preparing" control={<Radio />} label="Preparing" />
              </RadioGroup>
            </FormControl>
          </Grid>

          {formData.currentStatus === 'preparing' && <>
            <Grid item xs={12}>
              <TextField
                required
                id="preparing"
                name="preparing"
                label="Preparing for"
                fullWidth
                value={formData.preparing}
                onChange={e => { handleInputChange(e.target.name, e.target.value) }}
                autoComplete="occupation"
                variant="standard"
              />
            </Grid>
          </>}

          {formData.currentStatus === 'working' && <>
            <Grid item xs={12}>
              <TextField
                required
                id="occupation"
                name="occupation"
                label="Occupation"
                fullWidth
                value={formData.occupation}
                onChange={e => { handleInputChange(e.target.name, e.target.value) }}
                autoComplete="occupation"
                variant="standard"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="jobtitle"
                name="jobtitle"
                label="Job Title"
                fullWidth
                value={formData.jobtitle}
                onChange={e => { handleInputChange(e.target.name, e.target.value) }}
                autoComplete="jobtitle"
                variant="standard"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="ctc"
                name="ctc"
                label="Current CTC (in Rs.)"
                fullWidth
                value={formData.ctc}
                onChange={e => { handleInputChange('ctc', e.target.value) }}
                autoComplete="ctc"
                variant="standard"
              ></TextField>
            </Grid>

            <Grid item xs={12} >
              <TextField
                autoComplete="currentOrganisation"
                name="currentOrganisation"
                variant="standard"
                required
                fullWidth
                id="currentOrganisation"
                value={formData.currentOrganisation}
                onChange={e => { handleInputChange(e.target.name, e.target.value) }}
                label="Current Organisation"
              />
            </Grid>
          </>}

          {formData.currentStatus === 'higher-education' && (<>
            <Grid item xs={12}>
              <TextField
                autoComplete="Higher Education"
                name="onGoingCourseDetails"
                required
                variant="standard"
                fullWidth
                id="onGoingCourseDetails"
                label="Ongoing Course Details"
                value={formData.onGoingCourseDetails}
                onChange={e => { handleInputChange(e.target.name, e.target.value) }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                autoComplete="onGoingdiscipline"
                name="onGoingdiscipline"
                variant="standard"
                required
                fullWidth
                id="onGoingdiscipline"
                value={formData.onGoingdiscipline}
                onChange={e => { handleInputChange(e.target.name, e.target.value) }}
                label="Decipline Studied"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="onGoingGradYear"
                type="number"
                name="onGoingGradYear"
                label="Year of Graduation"
                InputProps={{ inputProps: { min: 2014 } }}
                required
                fullWidth
                value={formData.onGoingGradYear}
                onChange={e => { handleInputChange(e.target.name, e.target.value) }}
                autoComplete="onGoingGradYear"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} >
              <TextField
                autoComplete="ongoingInstitute"
                name="ongoingInstitute"
                variant="standard"
                required
                fullWidth
                id="ongoingInstitute"
                value={formData.ongoingInstitute}
                onChange={e => { handleInputChange(e.target.name, e.target.value) }}
                label="Current Organisation"
              />
            </Grid>
          </>
          )}
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          {activeStep !== 0 && (
            <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
              Back
            </Button>
          )}

          <Button variant="contained" type="submit" sx={{ mt: 3, ml: 1 }}>
            Next
          </Button>
        </Box>

      </Box>
    </React.Fragment >
  )
}

export default EmploymentDetails