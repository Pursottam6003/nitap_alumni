import * as React from "react";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { FormLabel } from "@mui/material";
import { Button, Box, RadioGroup, Radio } from "@mui/material";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import { Autocomplete } from "@mui/material";


export default function CourseDetails({
  activeStep,
  handleBack,
  handleNext,
  formData,
  handleInputChange
}) {
  const [sign, setSign] = useState(null);
  const [profilePic, setProfilePic] = useState(null);

  /**
   * @param {Event} e
   * */
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const d = {
      courseCompleted: data.get("courseCompleted"),
      discipline: data.get("discipline"),
      registratinNo: data.get("registrationNo"),
      rollNo: data.get("rollNo"),
      date: data.get("date"),
      year: data.get("year"),
      membership: data.get("membership"),

    };
    handleNext();
  };

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
              value={formData.courseCompleted}
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
              value={formData.registrationNo}
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
              value={formData.rollNo}
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
              value={formData.discipline}
              onChange={e => { handleInputChange('discipline', e.target.value) }}
              label="Decipline Studied"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                views={["year"]}
                required
                fullWidth
                label="Year of Graduation"
                value={dayjs().year(formData.gradYear)}
                variant="standard"
                onChange={(newValue) => {
                  handleInputChange('gradYear', newValue.$y)
                }}

                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    variant="standard"
                    helperText={null}
                    id="year"
                  />
                )}
              />
            </LocalizationProvider>
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
            {sign ? (
              <>
                <div>
                  <img
                    alt="not found"
                    width={"135px"}
                    height={"100px"}
                    src={URL.createObjectURL(sign)}
                  />
                  <br />
                  <Button color="error" onClick={() => setSign(null)}>
                    Remove
                  </Button>
                </div>
              </>
            ) : (
              <>
                <FormLabel mt={2} component="legend">
                  Your Signature{" "}
                </FormLabel>
                <Button variant="contained" component="label">
                  Upload File
                  <input
                    type="file"
                    name="sign"
                    required
                    onChange={(event) => {
                      console.log(event.target.files[0]);
                      if (event.target.files[0].length !== 0) {
                        handleInputChange('sign', URL.createObjectURL(event.target.files[0]))
                        setSign(event.target.files[0]);
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
              </>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            {profilePic ? (
              <>
                <div>
                  <img
                    alt="not found"
                    width={"135px"}
                    height={"150px"}
                    src={URL.createObjectURL(profilePic)}
                  />
                  <br />
                  <Button color="error" onClick={() => setProfilePic(null)}>
                    Remove
                  </Button>
                </div>
              </>
            ) : (
              <>
                <FormLabel mt={2} component="legend">
                  Passport Photo{" "}
                </FormLabel>
                <Button variant="contained" component="label">
                  Upload File
                  <input
                    type="file"
                    name="passport"
                    required
                    onChange={(event) => {
                      console.log(event.target.files[0]);
                      if (event.target.files[0].length !== 0) {
                        setProfilePic(event.target.files[0]);
                        handleInputChange('passport', URL.createObjectURL(event.target.files[0]))
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
              </>
            )}
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
