import { Box, Text, Button, Flex, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

export const BorderCountries = ({ borderCountries }) => {
  const countryButtonBg = useColorModeValue('white', 'blue.700');

  return (
    <Box letterSpacing="tight" fontWeight="700">
      <Text as="span">Border Countries:</Text>

      <Flex display={['flex', null, 'inline-flex']} flexWrap="wrap" gap="2" ml={['0', null, '3']} mt={['4', null, '0']}>
        {borderCountries.map(borderCountry => (
          <CountryButton country={borderCountry} bg={countryButtonBg} key={borderCountry.cca2.toLowerCase()} />
        ))}
      </Flex>

      {!borderCountries.length && <Box as="span">No Border Countries</Box>}
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
    letterSpacing="tighter"
    {...props}
  >
    {country.name.common}
  </Button>
);
