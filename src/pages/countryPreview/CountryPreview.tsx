import { Box, Container, Flex, Heading, Image, Link as StyledLink } from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';

import { BackButton, RequestHandler } from '../../components';
import { BorderCountries, CountryDetails } from '.';
import { useFetch } from '../../hooks';
import { Country } from '../../types';

export const CountryPreview = () => {
  const countryCode = useParams().code;

  const { data, isLoading, isError } = useFetch<Country[]>(`https://restcountries.com/v3.1/alpha/${countryCode}`);
  const country = data ? data[0] : null;

  return (
    <RequestHandler isLoading={isLoading}>
      {(country === null && isError) || country?.name.common.toLowerCase() === 'israel' ? (
        <Container
          display="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
          flex="1 1 auto"
          gap="5"
          pb="10"
        >
          <Box>
            {country?.name.common.toLowerCase() === 'israel' ? (
              <Box as="span">
                il?! Did you mean{' '}
                <StyledLink as={Link} to="/ps" fontWeight="800">
                  Palestine
                </StyledLink>
              </Box>
            ) : (
              <>
                <Box as="span" fontWeight="800">
                  {countryCode}
                </Box>

                <Box as="span"> is not valid. Please provide a valid country code</Box>
              </>
            )}
          </Box>

          <StyledLink as={Link} to="/" textDecor="underline">
            Go To Home
          </StyledLink>
        </Container>
      ) : (
        <Container as="section" mt={['10', null, '20']} px="7" p="0 1.75rem 2.5rem">
          <BackButton to="/" />

          {data?.length ? (
            <Flex
              mt={['14', null, '20']}
              gap={['10', null, null, '24']}
              flexDir={['column', null, null, 'row']}
              justifyContent="space-between"
              alignItems="center"
            >
              <a href={country?.maps.googleMaps} target="_blank" rel="noreferrer">
                <Image
                  src={country?.flags.svg}
                  w={['full', null, null, '35rem']}
                  h={['14.5rem', '25rem']}
                  objectFit="cover"
                  title="See on Google Maps"
                />
              </a>

              <Box py={['0', null, '10']} w={['full', null, null, '38.5rem']}>
                <Heading as="h2" fontSize={['22px', null, '32px']} mb={['6', null, '8']}>
                  {country?.name.common}
                </Heading>

                <CountryDetails country={country!} />

                <BorderCountries country={country!} />
              </Box>
            </Flex>
          ) : null}
        </Container>
      )}
    </RequestHandler>
  );
};
