import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Flex, Heading, Image } from '@chakra-ui/react';

import { BackButton } from '../../components';
import { getCountriesByCode, getOneCountryByCode } from '../../apis/countries';
import { BorderCountries, CountryDetails } from './';

export const CountryPreview = () => {
  const [country, setCountry] = useState({});
  const [borderCountries, setBorderCountries] = useState([]);

  const countryCode = useParams().code;

  useEffect(() => {
    const getData = async () => {
      const _country = (await getOneCountryByCode(countryCode)).data[0];
      setCountry(_country);

      const _borderCountries = _country.borders ? (await getCountriesByCode(await _country.borders)).data : [];
      setBorderCountries(_borderCountries);
    };

    getData();
  }, [countryCode]);

  return (
    <Container as="section" mt={['10', null, '20']} px="7" p="0 1.75rem">
      <BackButton to="/countries/" />

      {Object.keys(country).length ? (
        <Flex
          mt={['14', null, '20']}
          gap={['10', null, '24']}
          flexDir={['column', null, 'row']}
          justifyContent="space-between"
        >
          <a href={country.maps.googleMaps} target="_blank" rel="noreferrer">
            <Image
              src={country.flags.svg}
              w={['full', null, '35rem']}
              h={['14.5rem', null, '25rem']}
              objectFit="cover"
            />
          </a>

          <Box py={['0', null, '10']} w={['full', null, '38.5rem']}>
            <Heading as="h2" fontSize={['22px', null, '32px']} mb={['6', null, '8']}>
              {country.name?.common}
            </Heading>

            <CountryDetails country={country} />

            <BorderCountries borderCountries={borderCountries} />
          </Box>
        </Flex>
      ) : null}
    </Container>
  );
};
