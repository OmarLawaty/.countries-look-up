import { Box, Text, Button, Flex, useColorModeValue, ButtonProps } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { ApiError, Country } from '../../types';
import { useQuery } from 'react-query';
import { getCountries } from '../../api';
import { useEffect } from 'react';

interface BorderProps {
  country: Country;
}

export const BorderCountries = ({ country }: BorderProps) => {
  const countryButtonBg = useColorModeValue('white', 'blue.700');

  const { data, isLoading, isError, error, isFetching, refetch } = useQuery(
    'countryBorders',
    async () => await getCountries(country.borders),
    { enabled: true }
  );

  useEffect(() => {
    refetch();
  }, [country, refetch]);

  const borderCountries = data?.filter(country => country?.name.common.toLowerCase() !== 'israel') ?? [];

  return (
    <Box fontWeight="700">
      <Text as="span">Border Countries:</Text>

      <Flex display={['flex', null, 'inline-flex']} flexWrap="wrap" gap="2" ml={['0', null, '3']} mt={['4', null, '3']}>
        {isLoading || isFetching ? (
          'Loading...'
        ) : isError ? (
          <Box as="span">Error: {(error as ApiError)?.message}</Box>
        ) : (
          borderCountries?.map(borderCountry => (
            <CountryButton country={borderCountry} bg={countryButtonBg} key={borderCountry.cca2.toLowerCase()} />
          ))
        )}

        {!isLoading && !borderCountries.length ? (
          <Box as="span" fontWeight="500">
            No Border Countries
          </Box>
        ) : null}
      </Flex>
    </Box>
  );
};

interface CountryButtonProps extends ButtonProps {
  country: Country;
}

const CountryButton = ({ country, ...props }: CountryButtonProps) => (
  <Button
    as={Link}
    to={`/${country.cca2.toLowerCase()}`}
    rounded="base"
    textTransform="capitalize"
    fontSize={['xs', null, 'sm']}
    fontWeight="500"
    shadow="md"
    h="7"
    px="7"
    {...props}
  >
    {country.name.common}
  </Button>
);
