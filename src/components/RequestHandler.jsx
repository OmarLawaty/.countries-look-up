import { Alert, AlertDescription, AlertIcon, AlertTitle, Flex, Spinner } from '@chakra-ui/react';

export const RequestHandler = ({ children, isLoading, isError, error }) =>
  isLoading ? (
    <Flex w="full" flexDir="column" justifyContent="center" alignItems="center">
      <Spinner size="lg" />
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
