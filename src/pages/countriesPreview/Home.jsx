import { useState } from 'react';
import { Container, Flex, Grid } from '@chakra-ui/react';

import { CountryCard } from './';
import { Search, SelectMenu } from '../../components/filters';
import { RequestHandler } from '../../components';
import { useFilteredCountries, useDebouncedQuery, useFetch } from '../../hooks';

const REGIONS = ['africa', 'americas', 'asia', 'europe', 'oceania'];

export const Home = () => {
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState('');

  const { data: countries, isLoading, isError, error } = useFetch('https://restcountries.com/v3.1/all/');
  const debouncedQuery = useDebouncedQuery(query, 700);
  const filteredCountries = useFilteredCountries(countries, { query: debouncedQuery, region });

  return (
    <Container as="section" mt={[6, null, 12]}>
      <Flex flexDir={['column', null, 'row']} justifyContent="space-between" gap={[10, null, 16]} mb={[8, null, 12]}>
        <Search setQuery={setQuery} query={query} />

        <SelectMenu
          options={REGIONS}
          defaultOption="All"
          placeholder="Filter by Region"
          selected={region}
          setSelected={setRegion}
        />
      </Flex>

      <RequestHandler isLoading={isLoading} isError={isError} error={error}>
        <Grid
          as="section"
          templateColumns={['1fr', '1fr 1fr', null, 'repeat(3, 1fr)', 'repeat(4, 1fr)']}
          gap={[4, null, 8, 10, 20]}
        >
          {filteredCountries.slice(0, 50).map(country => (
            <CountryCard key={country.cca2.toLowerCase()} country={country} />
          ))}
        </Grid>
      </RequestHandler>
    </Container>
  );
};
