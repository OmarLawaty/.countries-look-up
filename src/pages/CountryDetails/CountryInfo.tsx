import { Box, Text, Flex, useColorModeValue } from '@chakra-ui/react';
import { format } from '../../utils/helpers';
import { Country } from '../../types';

interface CountryInfoProps {
  country: Country;
}

export const CountryInfo = ({ country }: CountryInfoProps) => {
  const color = useColorModeValue('black', 'gray.200');

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
        <Info title="Native Name" value={Object.values(country?.name.nativeName)[0].common} color={color} />
        <Info title="Population" value={format(country?.population)} color={color} />
        <Info title="Region" value={country?.region} color={color} />
        <Info title="Sub Region" value={country?.subregion} color={color} />
        <Info title="Capital" value={country?.capital?.join(', ')} color={color} />
      </Flex>

      <Flex flexDir="column" gap={['3', null, '2']} w="16.8rem">
        <Info title="Top Level Domain" value={country?.tld ? country?.tld[0] : 'N/A'} color={color} />

        <Info title="Currencies" value={Object.values(country?.currencies)[0].name} color={color} />

        <Info
          title="Languages"
          value={Object.values(country?.languages)
            .map(language => language)
            .join(', ')}
          color={color}
        />
      </Flex>
    </Box>
  );
};

interface InfoProps {
  title: string;
  value: string;
  color: string;
}

const Info = ({ title, value, color }: InfoProps) => {
  return (
    <>
      <Text fontWeight="700" fontSize={['13px', null, 'initial']}>
        {title}: {''}
        <Box as="span" fontWeight="500" color={color} title={value}>
          {value}
        </Box>
      </Text>
    </>
  );
};
