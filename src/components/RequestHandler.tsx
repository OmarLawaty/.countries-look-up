import { Alert, AlertDescription, AlertIcon, AlertTitle, Flex, Spinner } from '@chakra-ui/react';
import { ApiError } from '../types';

interface RequestHandlerProps {
  children: React.ReactNode;
  isLoading: boolean;
  isError?: boolean;
  error?: Error | ApiError | null;
}

export const RequestHandler = ({ children, isLoading, isError, error }: RequestHandlerProps) =>
  isLoading ? (
    <Flex
      h="full"
      bg="loader"
      flexDir="column"
      justifyContent="center"
      flex="1 1 auto"
      alignItems="center"
      color="white"
      gap="5"
    >
      <Spinner size="xl" />
      Loading
    </Flex>
  ) : isError ? (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle>There is an Error!</AlertTitle>
      <AlertDescription>{error?.message}</AlertDescription>
    </Alert>
  ) : (
    children
  );
