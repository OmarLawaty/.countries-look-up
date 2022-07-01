import { Box, Text, Heading, Image, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { format } from '../..//utils/helpers';

export const CountryCard = ({ country }) => (
  <Box
    as={Link}
    to={`/countries/${country.cca2.toLowerCase()}`}
    minH="10"
    w={['full', '16.5rem']}
    rounded="base"
    overflow="hidden"
    cursor="pointer"
    bg={useColorModeValue('white', 'blue.700')}
    transition="transform 300ms ease, box-shadow 300ms ease"
    _hover={{
      transform: 'scale(1.05)',
      shadow: 'lg',
      transition: 'transform 300ms ease, box-shadow 300ms ease'
    }}
  >
    <Image height="160px" width="full" src={country.flags.svg} alt={`${country.name.common} Flag`} objectFit="cover" />

    <Box p="6" pb="10">
      <Heading fontSize="1xl" fontWeight="700" lineHeight="1.4" letterSpacing="widest" mb="15">
        {country.name.common}
      </Heading>

      <Box letterSpacing="tighter">
        <Text>
          Population:{' '}
          <Box as="span" letterSpacing="normal">
            {format(country.population)}
          </Box>
        </Text>

        <Text>
          Region:{' '}
          <Box as="span" letterSpacing="normal">
            {country.region}
          </Box>
        </Text>

        <Text>
          Capital:{' '}
          <Box as="span" letterSpacing="normal">
            {country.capital}
          </Box>
        </Text>
      </Box>
    </Box>
  </Box>
);
