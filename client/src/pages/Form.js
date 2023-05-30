import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PersonalDetails from "./PersonalDetails";
import CourseDetails from "./CourseDetails";
import EmploymentDetails from "./EmploymentDetails";
import Preview from "./Preview";
import axios from 'axios';
import { UserContext } from '../App';


const steps = ["Personal Details", "Course Details", "Employment Details", "Form Preview"];
const theme = createTheme();

export default function Form() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [formData, setFormData] = React.useState({
    "title": "Mr.",
    "firstName": "Daknya",
    "lastName": "Bam",
    "nationality": "Indian",
    "category": "General",
    "religion": "Other",
    "address": "Arunachal",
    "pincode": "790003",
    "state": "Arunachal Pradesh",
    "city": "Itanagar",
    "country": "IN",
    "phone": "+916033926408",
    "altPhone": "+918004600238",
    "email": "email@daknya.com",
    "altEmail": "daknya@email.com",
    "dob": "05/22/2023",
    "courseCompleted": "B Tech in Computer Science and Engineering",
    "registrationNo": "xxxxxxxxxxxxxxxx",
    "rollNo": "CSE/20/37",
    "discipline": "sasdf",
    "gradYear": 2014,
  });
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const [formFiles, setFormFiles] = React.useState({ sign: null, passport: null });

  const handleNext = () => {
    if (activeStep >= 3) return;
    setActiveStep(activeStep + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    })

    Object.keys(formFiles).forEach(key => {
      data.append(key, formFiles[key])
    })

    // send the above formdata to the server.
    axios.post('http://localhost:5000/register', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => {
      console.log(res.data);
      if (res.data.success) {
        setIsSubmitted(true);
      }
    }).catch(err => {
      console.log(err);
    })
  }
  const { profile: user, error, loading, logout } = React.useContext(UserContext);

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }
  const handleFileInputChange = (name, value) => {
    setFormFiles((prevData) => ({ ...prevData, [name]: value }));
  }

  const printform = () => {
    console.log('Todo print out')
    window.print();
  }

  const handlelogOut = () => {
    logout();
  }
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <PersonalDetails formData={formData} handleInputChange={handleInputChange} activeStep={activeStep} handleBack={handleBack} handleNext={handleNext} />;
      case 1:
        return <CourseDetails formData={formData} formFiles={formFiles} handleFileInputChange={handleFileInputChange} handleInputChange={handleInputChange} activeStep={activeStep} handleBack={handleBack} handleNext={handleNext} />;
      case 2:
        return <EmploymentDetails formData={formData} handleInputChange={handleInputChange} activeStep={activeStep} handleBack={handleBack} handleNext={handleNext} />;
      case 3:
        return <Preview formData={formData} formFiles={formFiles} handleInputChange={handleInputChange} activeStep={activeStep} handleBack={handleBack} handleNext={handleNext} />;

      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
      </AppBar>
      <Container className="print-container" component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Alumni Membership Form
          </Typography>
          <Stepper alternativeLabel activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {getStepContent(activeStep)}
            {!isSubmitted && activeStep === steps.length - 1 && (
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{ mt: 3, ml: 1 }}
                >
                  Submit
                </Button>
              </Box>
            )}
            {isSubmitted && (<>
              <Box className="button-preview" sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Typography component="h1" variant="h6" align="center">
                  Thank you for filling out the form !
                  Your response has been saved successfully. You must take  its screenshort/printout  and bring it for alumni clearance
                </Typography>
              </Box>
              <Box className='button-preview' sx={{ display: "flex", justifyContent: "flex-end" }} >

                <Button onClick={printform} variant="outlined" sx={{ mt: 3, ml: 1 }}>
                  Print
                </Button>
                <Button
                  variant="contained"
                  onClick={handlelogOut}
                  sx={{ mt: 3, ml: 1 }}
                >
                  Exit
                </Button>
              </Box>
            </>

            )}
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
