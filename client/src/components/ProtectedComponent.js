import { Box, Container } from '@mui/system';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import useAuth from '../hooks/useAuth';
import { UserContext } from '../App';
import Loading from './Loading';

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
  const { isAuth, isAdmin, loading } = useAuth();
  const { profile } = useContext(UserContext);

  const history = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (!isAuth || !profile?.profile_Id) history('/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
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