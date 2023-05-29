import * as React from "react";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FormLabel } from "@mui/material";
import { Button, Box, RadioGroup, Radio } from "@mui/material";

export default function CourseDetails({
  activeStep,
  handleBack,
  handleNext,
  formData,
  formFiles,
  handleInputChange,
  handleFileInputChange
}) {
  const [sign, setSign] = useState(null);
  const [profilePic, setProfilePic] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleNext();
  };

  React.useEffect(() => {
    if (formFiles.sign && formFiles.passport) {
      setProfilePic(formFiles.passport);
      setSign(formFiles.sign);
    }
    // eslint-disable-next-line
  }, [])

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Course Details
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
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

          <Grid item xs={12}>
            <FormLabel mt={2} component="legend">
              Which Membership do you require ?
            </FormLabel>

            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="membership-level-1"
              name="radio-buttons-group"
              id="membership"
              required
            >
              <FormControlLabel
                value="membership-level-1"
                control={<Radio />}
                label="Membership Level 1 -Yes! I am Interested to
                get information and networking only."
              />
              <FormControlLabel
                value="membership-level-2"
                control={<Radio />}
                label="Membership Level 2 -Yes! I am Interested in
                volunteering for events and activities."
              />
            </RadioGroup>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormLabel sx={{ my: 2 }} component="legend">
              Signature *
            </FormLabel>
            {sign && (
              <div>
                <img
                  alt="not found"
                  width={"135px"}
                  height={"100px"}
                  src={URL.createObjectURL(sign)}
                />
              </div>
            )}
            <Button variant="outlined" component="label">
              {!sign ? 'Upload File' : 'Change File'}
              <input
                type="file"
                name="sign"
                required={!sign}
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
            {profilePic && (
              <div>
                <img
                  alt="not found"
                  width={"135px"}
                  height={"150px"}
                  src={URL.createObjectURL(profilePic)}
                />
              </div>
            )}
            <Button variant="outlined" component="label">
              {!profilePic ? 'Upload File' : 'Change File'}
              <input
                type="file"
                name="passport"
                required={!profilePic}
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
    </React.Fragment>
  );
}
