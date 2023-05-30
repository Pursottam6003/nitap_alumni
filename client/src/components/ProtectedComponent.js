import { Box, Container } from '@mui/system';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Spinner } from '../media/spinner.svg'
import axios from 'axios';
import { Typography } from '@mui/material';
import useAuth from '../hooks/useAuth';
import { UserContext } from '../App';

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
  const { isAuth, isAdmin, loading, error } = useAuth();
  const { profile } = useContext(UserContext);

  const history = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (!isAuth || !profile?.profile_Id) history('/login');
  }, [loading, isAuth, profile]);

  return (
    loading
      ? <Loading />
      : !admin ? (
        isAuth && profile?.profile_Id ? children : <UnauthorizedComponent />
      ) : (
        isAuth && isAdmin && profile?.profile_Id ? children : <UnauthorizedComponent />
      )
  )
};

export default ProtectedComponent;