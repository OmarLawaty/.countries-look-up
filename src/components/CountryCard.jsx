import { Box, Heading, Image, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { format } from '../utils/helpers';

export const CountryCard = ({ country }) => (
  <Box
    as={Link}
    to={`/countries/${country.cca2.toLowerCase()}`}
    minH="10"
    w="16.5rem"
    borderRadius="base"
    overflow="hidden"
    cursor="pointer"
    bg={useColorModeValue('white', 'blue.700')}
    _hover={{
      transform: 'scale(1.05)',
      shadow: 'lg',
      transition: 'transform 300ms ease, box-shadow 300ms ease'
    }}
    transition="transform 300ms ease, box-shadow 300ms ease"
  >
    <Image height="160px" width="full" src={country.flags.svg} alt={`${country.name.common} Flag`} objectFit="cover" />

    <Box p="6" pb="10">
      <Heading fontSize="1xl" fontWeight="bold" lineHeight="1.4" letterSpacing="widest" mb="15">
        {country.name.common}
      </Heading>

      <Box letterSpacing="tighter">
        <p>
          Population: <CountryDetail>{format(country.population)}</CountryDetail>
        </p>
        <p>
          Region: <CountryDetail>{country.region}</CountryDetail>
        </p>
        <p>
          Capital: <CountryDetail>{country.capital}</CountryDetail>
        </p>
      </Box>
    </Box>
  </Box>
);

const CountryDetail = ({ children }) => (
  <Box as="span" letterSpacing="normal">
    {children}
  </Box>
);
