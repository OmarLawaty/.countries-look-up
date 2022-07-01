import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Box } from '@chakra-ui/react';

export const PageNotFound = () => {
  let navigate = useNavigate();
  let redirectTime = 3000;

  useEffect(() => {
    setTimeout(() => navigate('/countries'), redirectTime);
  });

  return <Box>404 Page Not Found, Redirecting in {redirectTime / 1000} Seconds</Box>;
};
