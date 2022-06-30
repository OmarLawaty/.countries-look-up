import { Box, Heading, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const CountryCard = ({ country }) => (
  <Box
    as={Link}
    to={`/countries/${country.cca2.toLowerCase()}`}
    minH="10"
    borderRadius="base"
    overflow="hidden"
    cursor="pointer"
  >
    <Image height="160px" width="265px" src={country.flags.svg} alt={`${country.name.common} Flag`} />

    <Box p="6" pb="10" bg="white">
      <Heading fontSize="1xl" fontWeight="bold" lineHeight="1.4" letterSpacing="widest" mb="15">
        {country.name.common}
      </Heading>

      <Box letterSpacing="tighter">
        <p>
          Population: <CountryDetail>{country.population}</CountryDetail>
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
