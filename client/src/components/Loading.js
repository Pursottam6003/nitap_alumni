import * as React from 'react';
import { Box, Container } from '@mui/system';
import { ReactComponent as Spinner } from '../media/spinner.svg'

const Loading = () => (
  <Container maxWidth="lg">
    <Box sx={{ position: 'relative' }}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        mt: 8
      }} >
        <Spinner width={32} height={32} />
      </Box>
    </Box>
  </Container>
);

export default Loading;