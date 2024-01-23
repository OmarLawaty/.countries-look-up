import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Flex, Spinner } from '@chakra-ui/react';

import { ApiError } from '../types';

interface ResponseWrapperProps {
  children: React.ReactNode;
  isLoading: boolean;
  isFetching?: boolean;
  isError?: boolean;
  error?: ApiError | null;
}

export const ResponseWrapper = ({ children, isLoading, isFetching, isError, error }: ResponseWrapperProps) => {
  if (isLoading) return <Loader />;

  if (isFetching) {
    return (
      <>
        {children}
        <Box p={4}></Box>
        <Loader />
      </>
    );
  }

  if (isError)
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>There is an Error!</AlertTitle>
        <AlertDescription>{error?.message}</AlertDescription>
      </Alert>
    );

  return children;
};

const Loader = () => (
  <Flex
    h="full"
    bg="loader"
    flexDir="column"
    justifyContent="center"
    flex="1 1 auto"
    alignItems="center"
    color="white"
    gap="5"
    p={4}
  >
    <Spinner size="xl" />
    Loading
  </Flex>
);
