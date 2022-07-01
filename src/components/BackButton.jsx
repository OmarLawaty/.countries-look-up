import { Box, Button, useColorModeValue } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

export const BackButton = ({ to }) => (
  <Button
    as={Link}
    to={to}
    variant="outline"
    w={['28', null, '32']}
    shadow="lg"
    display="flex"
    gap="4"
    bg={useColorModeValue('white', 'blue.700')}
  >
    <ArrowBackIcon />

    <Box as="span" fontWeight="semibold">
      Back
    </Box>
  </Button>
);
