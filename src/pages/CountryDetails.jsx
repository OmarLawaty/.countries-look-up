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
    <Container as="section" mt="20">
      <BackButton to="/countries/" />
      {country.name ? (
        <Flex mt="20" gap="24">
          <Image src={country.flags.svg} h="auto" w="full" flex="1" objectFit="cover" />

          <Box flex="1" maxW="50%" py="10">
            <Heading as="h2" fontSize="32px" mb="8">
              {country.name?.common}
            </Heading>

            <Box display="flex" flexDir="column" flexWrap="wrap" gap="0.49rem 8.6rem" height="40" mb="14">
              <CountryInfo country={country} detailsValuesColor={detailsValuesColor} />
            </Box>

            <Box letterSpacing="wide" fontWeight="700">
              Border Countries:{' '}
              {borderCountries.length ? (
                <Flex display="inline-flex" gap="2" letterSpacing="normal" flexWrap="wrap" ml="2">
                  {borderCountries.slice(0, 3).map(borderCountry => (
                    <Button
                      as={Link}
                      to={`/countries/${borderCountry.cca2.toLowerCase()}`}
                      key={borderCountry.cca2.toLowerCase()}
                      bg={borderCountryBgColor}
                      borderRadius="base"
                      textTransform="capitalize"
                      fontSize="sm"
                      fontWeight="500"
                      shadow="md"
                      py="4"
                      px="8"
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

const CountryInfo = ({ country, detailsValuesColor }) => {
  const countryData = [
    {
      name: 'Native Name',
      value: Object.values(country.name.nativeName)[0].common
    },
    {
      name: 'Population',
      value: format(country.population)
    },
    {
      name: 'Region',
      value: country.region
    },
    {
      name: 'Sub Region',
      value: country.subregion
    },
    {
      name: 'Capital',
      value: country.capital
    },
    {
      name: 'Top Level Domain',
      value: country.tld ? country.tld[0] : 'N/A'
    },
    {
      name: 'Currencies',
      value: Object.values(country.currencies)[0].name
    },
    {
      name: 'Languages',
      value: Object.values(country.languages)
        .map(language => language)
        .join(', ')
    }
  ];

  return (
    <>
      {countryData.map(info => (
        <Text
          letterSpacing="wide"
          fontWeight="700"
          key={info.name}
          w="56"
          overflow="hidden"
          textOverflow="ellipsis"
          height="min-content"
          whiteSpace="nowrap"
        >
          {info.name}
          <Box as="span" fontWeight="500" color={detailsValuesColor} title={info.value}>
            : {info.value}
          </Box>
        </Text>
      ))}
    </>
  );
};
