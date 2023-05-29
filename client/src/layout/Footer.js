import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import HeartIcon from '@mui/icons-material/Favorite';

import { Container, Box } from '@mui/system';
import { Divider, Link, Typography } from '@mui/material';
import Logo from '../media/alumni_grad.png';

export function Footer() {
  return (
    <>
      <Box paddingY={3} sx={{
        backgroundColor: '#e7e7e7d9'
      }} className='app-footer'>
        <Container maxWidth='xl'>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: { xs: 'center', sm: 'space-between' },
          }}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}>
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
              }}>
                <img src={Logo} style={{ height: "100px" }}></img>

                {/* <Logo ftr={true}/> */}
                <Typography variant='subtitle1'>
                  Alumni Association NIT Arunachal Pradesh
                </Typography>
              </Box>
              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
                width: '100%',
                justifyContent: { xs: 'center', sm: 'flex-start' },
              }}>

              </Box>
            </Box>

            <Box className='ListItems' sx={{ display: { md: 'block', xs: 'none' } }}>
              <Typography variant='h6'>
                Links
              </Typography>
              <ul className='lists'>
                <li>
                  <Link color='CaptionText' underline='hover' target='_blank' rel='noreferrer'
                    href=''>
                    Alumni Association NIT AP
                  </Link>
                </li>
                <li>
                  <Link color='CaptionText' underline='hover' target='_blank' rel='noreferrer'
                    href='https://github.com/Pursottam6003/nitap_alumni'>
                    Project Repository
                  </Link>
                </li>
              </ul>
            </Box>

            <Box className='ListItems' sx={{ display: { md: 'block', xs: 'none' } }}>
              <Typography variant='h6'>
                Developers
              </Typography>
              <ul className='lists'>
                <li>
                  <Link color='CaptionText' underline='hover' target='_blank' rel='noreferrer'
                    href='https://github.com/tripathics/iocl-tracker/issues'>
                    Report an Bug
                  </Link>
                </li>
              </ul>
              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
                width: '100%',
                justifyContent: { xs: 'center', sm: 'flex-start' },
              }}>
                <TwitterIcon />
                <GitHubIcon />
                <FacebookIcon />
              </Box>
            </Box>

            <Box className='ListItems' sx={{
              marginRight: 8,
              display: { sm: 'block', xs: 'none' }
            }}>
              <Typography variant='h6'>
                Made with <HeartIcon sx={{ fontSize: '1.2rem', transform: 'translateY(2px)' }} /> by
              </Typography>
              <ul className='lists'>
                <li>
                  <Link color='CaptionText' underline='hover' target='_blank' rel='noreferrer'
                    href='https://github.com/tripathics'>
                    Chandrashekhar Tripathi
                  </Link>
                </li>
                <li>
                  <Link color='CaptionText' underline='hover' target='_blank' rel='noreferrer'
                    href='https://github.com/pursottam6003'>
                    Pursottam Sah
                  </Link>
                </li>

                <li>
                  <Link color='CaptionText' underline='hover' target='_blank' rel='noreferrer'
                    href='https://github.com/daknya'>
                    Daknya Bam
                  </Link>
                </li>
              </ul>
            </Box>
          </Box>


          <Divider sx={{
            borderColor: 'rgba(0, 0, 0, 0.24)',
            margin: '0.5rem 0',
          }} />
          <Box sx={{ textAlign: "center" }}>
            <Typography variant='caption'>
              © 2023-Present, NIT Arunachal Pradesh.
            </Typography>
          </Box>
        </Container>
      </Box>
    </>

  )
}

export default Footer;