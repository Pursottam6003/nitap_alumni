import { Box, Container } from '@mui/system';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import Loading from './Loading';
import { useUser } from '../contexts/user';

const UnauthorizedComponent = () => (
  <Container maxWidth="lg">
    <Box sx={{ position: 'relative' }}>
      <Typography variant='h4'>
        401 - Unauthorized
      </Typography>
    </Box>
  </Container>
);

const ProtectedComponent = ({ children, admin = false }) => {
  const { profile, isAdmin, loading } = useUser();

  const history = useNavigate();
  useEffect(() => {
    if (loading) return;

    if (!profile) {
      history('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, profile]);

  return (
    loading
      ? <Loading />
      : !admin
        ? profile ? children : <UnauthorizedComponent />
        : profile && isAdmin ? children : <UnauthorizedComponent />
  )
};

export default ProtectedComponent;