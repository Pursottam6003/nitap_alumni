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
const handleChange = (e) => {
  console.log("hello");
};

const courseList = [
  { label: "Bechlors of Technology [B Tech] (4Yrs)" },
  { label: "Masters of Technology [M Tech] (4Yrs)" },
  { label: "Doctor of Philosoph [PhD] (2-5 Yrs)" },
];
const DeptList = [
  { label: "Mechanical Eng." },
  { label: "Computer Science Eng." },
  { label: "Civil Eng," },
  { label: "Electronics and Comm. Eng" },
  { label: "Electrical Eng." },
  { label: "Dept of Basic and Applied Sciences" },
  { label: "Dept of Management and Humanities" },
  { label: "Dept of Civil Eng" },
];

export default function CourseDetails({
  activeStep,
  handleBack,
  handleNext,
  formData,
}) {
  const [value, setValue] = useState(dayjs());
  const [gradYear, setGradyear] = useState();
  const [sign, setSign] = useState(null);
  const [profilePic,setProfilePic] = useState(null);

  /**
   * @param {Event} e
   * */
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const d = {
      department: data.get("department"),
      discipline: data.get("discipline"),
      date: data.get("date"),
      year: data.get("year"),
      membership: data.get("membership"),
    };
    // console.log(d);
    handleNext(d);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Course Details
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Autocomplete
              options={courseList}
              renderInput={(params) => (
                <TextField
                  {...params}
                  autoComplete="department"
                  name="department"
                  required
                  variant="standard"
                  fullWidth
                  id="department"
                  label="Department"
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>

            <Autocomplete
              options={DeptList}
              renderInput={(params) => (
                <TextField
                  {...params}
                  autoComplete="discipline"
                  name="discipline"
                  variant="standard"
                  required
                  fullWidth
                  id="discipline"
                  label="Decipline Studied"
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                views={["year"]}
                required
                fullWidth
                label="Year of Graduation"
                value={gradYear}
                variant="standard"
                onChange={(newValue) => {
                  setGradyear(newValue);
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
                    width={"200px"}
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
                    onChange={(event) => {
                      console.log(event.target.files[0]);
                      if (event.target.files[0].length !== 0) {
                        setSign(event.target.files[0]);
                      }
                    }}
                    hidden
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
                    width={"200px"}
                    src={URL.createObjectURL(sign)}
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
                    onChange={(event) => {
                      console.log(event.target.files[0]);
                      if (event.target.files[0].length !== 0) {
                        setProfilePic(event.target.files[0]);
                      }
                    }}
                    hidden
                  />
                </Button>
              </>
            )}

            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDatePicker
                label="Date"
                value={value}
                required
                id="date"
                name="date"
                fullWidth
                autoComplete="date"
                variant="standard"
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    required
                    fullWidth
                    {...params}
                    variant="standard"
                  />
                )}
              />
            </LocalizationProvider> */}


          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox color="secondary" name="saveAddress" value="yes" />
              }
              label="I confirm the Course Details are correct"
            />
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
