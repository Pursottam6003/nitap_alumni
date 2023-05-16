import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

export default function Preview({formData}) {

  console.log(formData);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        <Box component={''}> 
          <Grid container spacing={2}>
            {/* row 1 */}
            <Grid item xs={12} sm={4}>
             <img src=""></img>
             Profile Photo
            </Grid>

            <Grid item xs={12} sm={8}>
              <span className='previewLabel'>Name: </span>
              <span className='draftData'>Mr Pursottam Sah </span>
            </Grid>

           {/* row 2 */}
            <Grid item xs={12} sm={4}>
            <span className='previewLabel'>Nationality: </span>
            <span className='draftData'>Indian </span>
            </Grid>

            <Grid item xs={12} sm={4}>
            <span className='previewLabel'>Category: </span>
            <span className='draftData'>OBC </span>
            </Grid>

            <Grid item xs={12} sm={4}>
            <span className='previewLabel'>Religion: </span>
            <span className='draftData'>Hindu </span>
            </Grid>

            <Grid item xs={12}>
            <span className='previewLabel'>Current Address: </span>
            <span className='draftData'>Lohit Hostel NIT Arunachal Pradesh </span>
            </Grid>
            {/* row 3 */}
            <Grid item xs={12} sm={8}>
            <span className='previewLabel'>State: </span>
            <span className='draftData'>Arunachal Pradesh </span>
            </Grid>

            <Grid item xs={12} sm={4}>
              <span className='previewLabel'>Pincode: </span>
              <span className='draftData'>791113 </span>
            </Grid>

            {/* row 4 */}
            <Grid item xs={12} sm={6}>
            <span className='previewLabel'> Ph No. :  </span>
            <span className='draftData'> +91 6033938402 </span>
            
            </Grid>

            <Grid item xs={12} sm={6}>
            <span className='previewLabel'>Alternate No. </span>
            <span className='draftData'>+91 8259053265</span>
            </Grid>

            {/* row 5 */}

            <Grid item xs={12} sm={6}>
            <span className='previewLabel'> Email :  </span>
            <span className='draftData'> abcde@gmail.com</span>
            
            </Grid>

            <Grid item xs={12} sm={6}>
            <span className='previewLabel'>Occupation </span>
            <span className='draftData'> Student</span>v
            </Grid>
            {/* row 6 */}
            <Grid item xs={12} >
            <span className='previewLabel'> Job Title:  </span>
            <span className='draftData'> Software Developer</span>v
            </Grid>


            <Grid item xs={12} >
            <span className='previewLabel'> Course Completed </span>
            <span className='draftData'> 4 Years B Tech in CSE</span>
            </Grid>

            <Grid item xs={12} >
            <span className='previewLabel'>Declipline: </span>
            <span className='draftData'> Computer Science and Engineering</span>
            </Grid>

            <Grid item xs ={12}>
            <span className='previewLabel'>Year of Graduation: </span>
            <span className='draftData'> 2024</span>
            </Grid>


          

            <Grid item xs={12}>
            I have read the terms and conditions and fully checked my details 
            </Grid>

            <Grid item xs ={12} sm={6}>
            <span className='previewLabel'> Date: </span>
            <span className='draftData'>15 May 2023</span>
            </Grid>

            <Grid item xs ={12} sm={6}>
            <span className='previewLabel'> Signature </span>
              <img src=""></img>
            </Grid>



             




        

          </Grid>
        </Box>
      </Typography>
    </React.Fragment>
  );
}