import { Box, Text, Heading, Image, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { format } from '../..//utils/helpers';

export const CountryCard = ({ country }) => (
  <Box
    as={Link}
    to={`/countries/${country.cca2.toLowerCase()}`}
    minH="10"
    w="full"
    rounded="base"
    overflow="hidden"
    cursor="pointer"
    bg={useColorModeValue('white', 'blue.700')}
    transition="transform 300ms, box-shadow 300ms"
    _hover={{ transform: 'scale(1.05)', shadow: 'lg' }}
  >
    <Image
      h="160px"
      w="full"
      objectFit="cover"
      loading="lazy"
      src={country.flags.svg}
      alt={`${country.name.common} Flag`}
    />

    <Box p="6" pb="10">
      <Heading size="md" fontWeight="700" lineHeight="1.4" mb="15">
        {country.name.common}
      </Heading>

      <Box>
        <Text fontWeight="600">
          Population:{' '}
          <Box as="span" fontWeight="300">
            {format(country.population)}
          </Box>
        </Text>

        <Text fontWeight="600">
          Region:{' '}
          <Box as="span" fontWeight="300">
            {country.region}
          </Box>
        </Text>

        <Text fontWeight="600">
          Capital:{' '}
          <Box as="span" fontWeight="300">
            {country.capital}
          </Box>
        </Text>
      </Box>
    </Box>
  </Box>
);
