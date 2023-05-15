import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

export default function Preview(props) {
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
              Name: Mr  Pursottam Sah
            </Grid>

        

           {/* row 2 */}
            <Grid item xs={12} sm={4}>
             Nationality: Indian
            </Grid>

            <Grid item xs={12} sm={4}>
              Category: OBC
            </Grid>

            <Grid item xs={12} sm={4}>
             Religion: Hindu 
            </Grid>

            <Grid item xs={12}>
              Current Address: Lohit Hostel NIT Arunachal Pradesh
            </Grid>
            {/* row 3 */}
            <Grid item xs={12} sm={8}>
              State: Arunachal Pradesh
            </Grid>

            <Grid item xs={12} sm={4}>
              Pincode : 791113
            </Grid>

            {/* row 4 */}
            <Grid item xs={12} sm={6}>
              Ph No. : +91 6033938402
            </Grid>

            <Grid item xs={12} sm={6}>
              Alter No.+91 8259053265
            </Grid>

            {/* row 5 */}

            <Grid item xs={12} sm={6}>
              Email : abcde@gmail.com
            </Grid>

            <Grid item xs={12} sm={6}>
              Occupation: student
            </Grid>
            {/* row 6 */}
            <Grid item xs={12} >
              Job Title : Software Developer
            </Grid>


            <Grid item xs={12} >
              Course Completed : 4 Years B Tech in CSE
            </Grid>

            <Grid item xs={12} >
              Declipline : Computer Science and Engineering
            </Grid>

            <Grid item xs ={12}>
              Year of Graduation : 2024
            </Grid>


          

            <Grid item xs={12}>
            I have read the terms and conditions and fully checked my details 
            </Grid>

            <Grid item xs ={12} sm={6}>
              Date : 15 May 2023
            </Grid>

            <Grid item xs ={12} sm={6}>
              Signature  : 
              <img src=""></img>
            </Grid>



             




        

          </Grid>
        </Box>
      </Typography>
    </React.Fragment>
  );
}