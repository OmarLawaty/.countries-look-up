import { Box, Text, Flex, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { format } from '../../utils/helpers';

export const CountryDetails = ({ country }) => {
  const detailsValuesColor = useColorModeValue('black', 'gray.200');

  return (
    <Box
      display="flex"
      flexDir={['column', null, 'row']}
      justifyContent="space-between"
      flexWrap="wrap"
      minH="40"
      gap={['12', null, '5']}
      mb={['10', null, '16']}
    >
      <Flex flexDir="column" gap={['3', null, '2']} w="16.8rem">
        <CountryInfo
          title="Native Name"
          value={Object.values(country.name.nativeName)[0].common}
          valueStyles={detailsValuesColor}
        />
        <CountryInfo title="Population" value={format(country.population)} valueStyles={detailsValuesColor} />
        <CountryInfo title="Region" value={country.region} valueStyles={detailsValuesColor} />
        <CountryInfo title="Sub Region" value={country.subregion} valueStyles={detailsValuesColor} />
        <CountryInfo title="Capital" value={country.capital} valueStyles={detailsValuesColor} />
      </Flex>

      <Flex flexDir="column" gap={['3', null, '2']} w="16.8rem">
        <CountryInfo
          title="Top Level Domain"
          value={country.tld ? country.tld[0] : 'N/A'}
          valueStyles={detailsValuesColor}
        />

        <CountryInfo
          title="Currencies"
          value={Object.values(country.currencies)[0].name}
          valueStyles={detailsValuesColor}
        />

        <CountryInfo
          title="Languages"
          value={Object.values(country.languages)
            .map(language => language)
            .join(', ')}
          valueStyles={detailsValuesColor}
        />
      </Flex>
    </Box>
  );
};

const CountryInfo = ({ title, value, detailsValuesColor }) => {
  return (
    <>
      <Text fontWeight="700" fontSize={['13px', null, 'initial']}>
        {title}: {''}
        <Box as="span" fontWeight="500" color={detailsValuesColor} title={value}>
          {value}
        </Box>
      </Text>
    </>
  );
};
