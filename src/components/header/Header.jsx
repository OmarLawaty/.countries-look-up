import { Box, Container, Heading, useColorModeValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import ThemeSwitcher from './ThemeSwitcher';

export const Header = () => {
  let navigate = useNavigate();

  return (
    <Box w="full" maxW="unset" bg={useColorModeValue('white', 'blue.700')} display="flex" justifyContent="center">
      <Container
        as="header"
        w="full"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        shadow="md"
        p={['1.2rem 0', null, '1rem 4rem 1.5rem']}
        mx="0"
      >
        <Heading
          as="h1"
          cursor="pointer"
          onClick={() => navigate('/')}
          fontSize={['14px', null, '24']}
          pl={['4', null, '5']}
          color={useColorModeValue('black', 'gray.100')}
        >
          Where in the world?
        </Heading>

        <ThemeSwitcher />
      </Container>
    </Box>
  );
};
