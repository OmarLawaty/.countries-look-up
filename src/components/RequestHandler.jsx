import { Alert, AlertDescription, AlertIcon, AlertTitle, Flex, Spinner } from '@chakra-ui/react';

export const RequestHandler = ({ children, isLoading, isError, error }) =>
  isLoading ? (
    <Flex
      w="100vw"
      h="100vh"
      pos="absolute"
      top="0"
      left="0"
      bg="loader"
      flexDir="column"
      justifyContent="center"
      zIndex="sticky"
      alignItems="center"
      color="white"
      gap="5"
    >
      <Spinner size="xl" />
      Loading
    </Flex>
  ) : isError && error.code !== 'ERR_CANCELED' ? (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle>There is an Error!</AlertTitle>
      <AlertDescription>{error.message}</AlertDescription>
    </Alert>
  ) : (
    children
  );
