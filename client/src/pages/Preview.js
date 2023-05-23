import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

export default function Preview({formData}) {

var today = new Date();

var strDate = 'Y-m-d'
  .replace('Y', today.getFullYear())
  .replace('m', today.getMonth()+1)
  .replace('d', today.getDate());
  console.log(formData);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        <Box component={''}> 
          <Grid container spacing={2}>
            {/* row 1 */}
            <Grid item xs={12} sm={4}>
             <img   alt="not found" width={"135px"} height={"150px"} src={formData.passport}></img>
             
            </Grid>

            <Grid item xs={12} sm={8}>
              <span className='previewLabel'>Name: </span>
              <span className='draftData'>{formData.title+" "+ formData.firstName +" " +formData.middleName+ " "+formData.lastName}   </span>

              <div>
                <span className='previewLabel'>Date Of Birth:</span>
                <span className='draftData'>{formData.dob} </span>
              </div>

            
              <div>
                <span className='previewLabel'>Nationality:</span>
                <span className='draftData'>{formData.nationality} </span>
              </div>

              <div>
                <span className='previewLabel'>Religion:</span>
                <span className='draftData'>{formData.religion} </span>
              </div>

              <div>
                <span className='previewLabel'>Category:</span>
                <span className='draftData'>{formData.category} </span>

              </div>
            </Grid>

          

            <Grid item xs={12}>
            <span className='previewLabel'>Current Address: </span>
            <span className='draftData'>{formData.address} </span>
            </Grid>
            {/* row 3 */}
            <Grid item xs={12} sm={8}>
            <span className='previewLabel'>State: </span>
            <span className='draftData'>{formData.state} </span>
            </Grid>

            <Grid item xs={12} sm={4}>
              <span className='previewLabel'>Pincode: </span>
              <span className='draftData'>{formData.pincode} </span>
            </Grid>

            {/* row 4 */}
            <Grid item xs={12} sm={6}>
            <span className='previewLabel'> Ph No. :  </span>
            <span className='draftData'>{formData.phone} </span>
            
            </Grid>

            <Grid item xs={12} sm={6}>
            <span className='previewLabel'>Alternate No. </span>
            <span className='draftData'>{formData.altPhone}</span>
            </Grid>

            {/* row 5 */}

            <Grid item xs={12} sm={6}>
            <span className='previewLabel'> Email :  </span>
            <span className='draftData'> {formData.email}</span>
            </Grid>


            <Grid item xs={12} sm={6}>
            <span className='previewLabel'> Registration No. :  </span>
            <span className='draftData'> {formData.registrationNo}</span>
            </Grid>

            <Grid item xs={12} >
            <span className='previewLabel'> Course Completed </span>
            <span className='draftData'> {formData.courseCompleted}</span>
            </Grid>

            <Grid item xs={12} >
            <span className='previewLabel'>Declipline: </span>
            <span className='draftData'>{formData.discipline}</span>
            </Grid>

            <Grid item xs ={12}>
            <span className='previewLabel'>Year of Graduation: </span>
            <span className='draftData'>{formData.gradYear}</span>
            </Grid>

            {formData.occupation && <>
            <Grid item xs={12} sm={6}>
            <span className='previewLabel'>Occupation </span>
            <span className='draftData'>{formData.occupation}</span>
            </Grid>
            {/* row 6 */}
            <Grid item xs={12} >
            <span className='previewLabel'> Job Title:  </span>
            <span className='draftData'>{formData.jobtitle}</span>
            </Grid>

            <Grid item xs={12} sm={6} >
            <span className='previewLabel'> Current Organisation  </span>
            <span className='draftData'>{formData.currentOrganisation}</span>
            </Grid>
            

            <Grid item xs={12} sm={6} >
            <span className='previewLabel'>Current CTC </span>
            <span className='draftData'>{formData.ctc}</span>
            </Grid>
            </>}
            
            {formData.preparing && <>
            <Grid item xs={12} >
            <span className='previewLabel'> Preparing:  </span>
            <span className='draftData'>{formData.preparing}</span>
            </Grid>
            </>}

            {formData.onGoingCourseDetails && <>
            <Grid item xs={12} >
            <span className='previewLabel'> Ongoing Couse Details:  </span>
            <span className='draftData'>{formData.onGoingCourseDetails}</span>
            </Grid>
            
            <Grid item xs={12} >
            <span className='previewLabel'> Ongoing Couse Declipline  </span>
            <span className='draftData'>{formData.onGoingdiscipline}</span>
            </Grid>


            <Grid item xs={12} sm={6} >
            <span className='previewLabel'> Current Organisation  </span>
            <span className='draftData'>{formData.currentOrganisation}</span>
            </Grid>
            

            <Grid item xs={12} sm={6} >
            <span className='previewLabel'> Graduation Year  </span>
            <span className='draftData'>{formData.onGoingGradYear}</span>
            </Grid>
            </>}


        

            <Grid item xs={12}>
            I have read the terms and conditions and fully checked my details 
            </Grid>

            <Grid item xs ={12} sm={6}>
            <span className='previewLabel'> Date: </span>
            <span className='draftData'>{strDate}</span>
            </Grid>

            <Grid item xs ={12} sm={6}>
            <span className='previewLabel'> Signature </span>
              <img alt="not found" width={"180px"} height={"70px"} src={formData.sign} ></img>
            </Grid>



             




        

          </Grid>
        </Box>
      </Typography>
    </React.Fragment>
  );
}