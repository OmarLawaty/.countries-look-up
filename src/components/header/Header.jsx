import { Container, Flex, Heading, useColorModeValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import ThemeSwitcher from './ThemeSwitcher';

export const Header = () => {
  let navigate = useNavigate();

  return (
    <Flex w="full" bg={useColorModeValue('white', 'blue.700')} justifyContent="center" shadow="md">
      <Container
        as="header"
        w="full"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={['1.2rem 0', null, '1rem 4rem 1.5rem']}
        m="0"
      >
        <Heading
          as="h1"
          cursor="pointer"
          onClick={() => navigate('/')}
          fontSize={['14px', null, '24px']}
          pl={['4', null, '5']}
          color={useColorModeValue('black', 'gray.100')}
          userSelect="none"
        >
          Where in the world?
        </Heading>

        <ThemeSwitcher />
      </Container>
    </Flex>
  );
};
