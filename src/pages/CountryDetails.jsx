import { Box, Button, Container, Flex, Heading, Image, Text, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { BackButton } from '../components';
import { getCountriesByCode, getOneCountryByCode } from '../apis/countries';
import { format } from '../utils/helpers';

export const CountryDetails = () => {
  const [country, setCountry] = useState({});
  const [borderCountries, setBorderCountries] = useState([]);

  const countryCode = useParams().code;

  let navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const _country = (await getOneCountryByCode(countryCode)).data[0];

      setCountry(_country);

      if (!_country.borders) return setBorderCountries([]);

      const _borderCountries = (await getCountriesByCode(await _country.borders)).data;

      setBorderCountries(_borderCountries);
    })();
  }, [countryCode, navigate]);

  const detailsValuesColor = useColorModeValue('black', 'gray.200');
  const borderCountryBgColor = useColorModeValue('white', 'blue.700');

  return (
    <Container as="section" mt={['10', null, '20']} p="0 1.75rem">
      <BackButton to="/countries/" />

      {country.name ? (
        <Flex
          mt={['14', null, '20']}
          gap={['10', null, '24']}
          flexDir={['column', null, 'row']}
          justifyContent="space-between"
        >
          <Image src={country.flags.svg} w={['full', null, '35rem']} h={['14.5rem', null, '25rem']} objectFit="cover" />

          <Box py={['0', null, '10']} w={['full', null, '38.5rem']}>
            <Heading as="h2" fontSize={['22px', null, '32px']} mb={['6', null, '8']}>
              {country.name?.common}
            </Heading>

            <Box
              display="flex"
              flexDir={['column', null, 'row']}
              justifyContent="space-between"
              flexWrap="wrap"
              gap={['12', null, '5']}
              minH="40"
              mb={['10', null, '16']}
            >
              <Box display="flex" flexDir="column" gap={['3', null, '2']} w="16.8rem">
                <CountryInfo
                  title="Native Name"
                  value={Object.values(country.name.nativeName)[0].common}
                  valueStyles={detailsValuesColor}
                />
                <CountryInfo title="Population" value={format(country.population)} valueStyles={detailsValuesColor} />
                <CountryInfo title="Region" value={country.region} valueStyles={detailsValuesColor} />
                <CountryInfo title="Sub Region" value={country.subregion} valueStyles={detailsValuesColor} />
                <CountryInfo title="Capital" value={country.capital} valueStyles={detailsValuesColor} />
              </Box>

              <Box display="flex" flexDir="column" gap={['3', null, '2']} w="16.8rem">
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
              </Box>
            </Box>

            <Box letterSpacing="tight" fontWeight="700">
              Border Countries:{' '}
              {borderCountries.length ? (
                <Flex
                  display={['flex', null, 'inline-flex']}
                  gap="2"
                  letterSpacing="tight"
                  flexWrap="wrap"
                  justifyContent="flex-start"
                  ml={['0', null, '3']}
                  mt={['4', null, '0']}
                >
                  {borderCountries.slice(0, 3).map(borderCountry => (
                    <Button
                      as={Link}
                      to={`/countries/${borderCountry.cca2.toLowerCase()}`}
                      key={borderCountry.cca2.toLowerCase()}
                      bg={borderCountryBgColor}
                      borderRadius="base"
                      textTransform="capitalize"
                      fontSize={['xs', null, 'sm']}
                      fontWeight="500"
                      shadow="md"
                      h="7"
                      px="7"
                      letterSpacing="tighter"
                    >
                      {borderCountry.name.common}
                    </Button>
                  ))}
                </Flex>
              ) : (
                'N/A'
              )}
            </Box>
          </Box>
        </Flex>
      ) : null}
    </Container>
  );
};

const CountryInfo = ({ title, value, detailsValuesColor }) => {
  return (
    <>
      <Text letterSpacing="normal" fontWeight="700" w="56" fontSize={['13px', null, 'initial']}>
        {title}:{''} {''}
        <Box as="span" fontWeight="500" color={detailsValuesColor} title={value}>
          {value}
        </Box>
      </Text>
    </>
  );
};
