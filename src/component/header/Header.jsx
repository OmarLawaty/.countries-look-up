import { Container, Heading } from '@chakra-ui/react';
import ThemeSwitcher from './ThemeSwitcher';

export const Header = () => {
  return (
    <Container
      as="header"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      shadow="md"
      p="1rem 4rem 1.5rem"
      mb="12"
      bg="white"
    >
      <Heading as="h1" fontSize="24" pl="5">
        Where in the world?
      </Heading>

      <ThemeSwitcher />
    </Container>
  );
};
