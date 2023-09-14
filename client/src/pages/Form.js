import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
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
import { Alert } from "@mui/material";
import Loading from "../components/Loading";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import mockFormData from "../mocks/form";

const steps = ["Personal Details", "Course Details", "Employment Details", "Form Preview"];
const theme = createTheme();


export default function Form() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [formData, setFormData] = React.useState({});
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [formFiles, setFormFiles] = React.useState({ sign: null, passport: null });
  // eslint-disable-next-line
  const { profile, error, loading: fetchingProfile, logout } = React.useContext(UserContext);

  const prepopulate = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/alumni/prepopulate', {}, { withCredentials: true });
      let fetchedFormData = { ...profile }

      if (res.data.success && res.data.data) {
        setIsSubmitted(true);
        fetchedFormData = {
          ...fetchedFormData,
          ...res.data.data,
          dob: dayjs(res.data.data.dob, 'DD/MM/YYYY'),
        }
      }
      setFormData({ ...fetchedFormData })
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    if (profile) {
      prepopulate();
    }
    // eslint-disable-next-line
  }, [profile])

  const handleNext = () => {
    if (activeStep >= 3) return;
    setActiveStep(activeStep + 1);
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'dob') {
        data.append(key, formData[key].format('DD/MM/YYYY'));
        return;
      }
      data.append(key, formData[key]);
    })

    Object.keys(formFiles).forEach(key => {
      data.append(key, formFiles[key])
    })

    axios.post('http://localhost:5000/alumni/register', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true
    }).then(res => {
      console.log(res.data);
      if (res.data.success) {
        setIsSubmitted(true);
      }
    }).catch(err => {
      console.log(err);
    })
  }
  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }
  const handleFileInputChange = (name, value) => {
    setFormFiles((prevData) => ({ ...prevData, [name]: value }));
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
        return <Box>An error occured! Please refresh the page</Box>;
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container className="print-container" component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Box mb={3}>
              <Typography component="h1" variant="h4" align="center">
                Alumni Membership Form
              </Typography>
            </Box>
            {loading ? <Loading /> : isSubmitted && activeStep < steps.length - 1 ? (<>
              <Box my={2}>
                <Alert severity="info" action={
                  <Button onClick={e => { e.preventDefault(); setIsSubmitted(false) }} variant="text">Edit response</Button>
                }>
                  You have already submitted your response
                </Alert>
              </Box>
              <Preview formData={formData} />
            </>) : (<>
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

                    <Button onClick={(e) => { e.preventDefault(); window.print() }} variant="outlined" sx={{ mt: 3, ml: 1 }}>
                      Print
                    </Button>
                    <Button
                      variant="contained"
                      onClick={e => { e.preventDefault(); logout(); }}
                      sx={{ mt: 3, ml: 1 }}
                    >
                      Exit
                    </Button>
                  </Box>
                </>)}
              </React.Fragment>
            </>
            )}
          </Paper>
        </LocalizationProvider>
      </Container>
    </ThemeProvider>
  );
}
