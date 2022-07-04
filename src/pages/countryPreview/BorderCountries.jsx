import { Box, Text, Button, Flex, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../../hooks';

export const BorderCountries = ({ country }) => {
  const countryButtonBg = useColorModeValue('white', 'blue.700');

  const { data: borderCountries, isLoading } = useFetch(
    `https://restcountries.com/v3.1/alpha/`,
    {
      codes: country.borders ? country.borders.join(',') : null
    },
    country.borders ? false : true
  );

  return (
    <Box fontWeight="700">
      <Text as="span">Border Countries:</Text>

      <Flex display={['flex', null, 'inline-flex']} flexWrap="wrap" gap="2" ml={['0', null, '3']} mt={['4', null, '3']}>
        {borderCountries &&
          borderCountries.map(borderCountry => (
            <CountryButton country={borderCountry} bg={countryButtonBg} key={borderCountry.cca2.toLowerCase()} />
          ))}
      </Flex>

      {!isLoading && !borderCountries ? <Box as="span">No Border Countries</Box> : null}
    </Box>
  );
};

const CountryButton = ({ country, ...props }) => (
  <Button
    as={Link}
    to={`/countries/${country.cca2.toLowerCase()}`}
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
