import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PersonalDetails from "./PersonalDetails";
import CourseDetails from "./CourseDetails";
import Preview from "./Preview";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const steps = ["Personal Details", "Course Details", "Form Preview"];

const theme = createTheme();

export default function Form() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [formData, setFormData] = React.useState({});

  const handleNext = () => {
    // console.log('handleNext:', data);
    // const fData = formData;
    // fData[activeStep] = data;
    // setFormData(fData);
    console.log(formData)
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({...prevData, [name]: value}))
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <PersonalDetails formData={formData} handleInputChange={handleInputChange} activeStep={activeStep} handleBack={handleBack} handleNext={handleNext} />;
      case 1:
        return <CourseDetails formData={formData} handleInputChange={handleInputChange} activeStep={activeStep} handleBack={handleBack} handleNext={handleNext} />;
      case 2:
        return <Preview formData={formData} handleInputChange={handleInputChange} activeStep={activeStep} handleBack={handleBack} handleNext={handleNext} />;
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
        <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
          <Typography
            variant="h6"
            align="center"
            color="inherit"
            id="formHeading"
            noWrap
          >
            NIT Arunachal Pradesh Alumni Membership Form
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Membership Form
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for filling out the form.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              {activeStep === steps.length - 1 && (
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Submit
                  </Button>
                </Box>
              )}
            </React.Fragment>
          )}
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}
