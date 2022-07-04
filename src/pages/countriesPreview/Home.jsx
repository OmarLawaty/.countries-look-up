import { useEffect } from 'react';
import { Container, Flex, Grid } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';

import { CountryCard } from './';
import { Search, SelectMenu } from '../../components/filters';
import { RequestHandler } from '../../components';
import { useFilteredCountries, useDebouncedQuery, useFetch } from '../../hooks';

const REGIONS = ['africa', 'americas', 'asia', 'europe', 'oceania'];

export const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterParams = {
    query: searchParams.get('query') || '',
    region: searchParams.get('region') || ''
  };

  const setQuery = query => setSearchParams({ ...filterParams, query });
  const setRegion = region => setSearchParams({ ...filterParams, region });

  const { data: countries, isLoading, isError, error } = useFetch('https://restcountries.com/v3.1/all/');
  const debouncedQuery = useDebouncedQuery(filterParams.query, 700);
  const filteredCountries = useFilteredCountries(countries, { query: debouncedQuery, region: filterParams.region });

  useEffect(() => {
    const { query, region } = filterParams;
    if (!query && !region) setSearchParams({});
    else if (!query && region) setSearchParams({ region: region });
    else if (query && !region) setSearchParams({ query: query });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterParams.query, filterParams.region]);

  return (
    <Container as="section" mt={[6, null, 12]}>
      <Flex flexDir={['column', null, 'row']} justifyContent="space-between" gap={[10, null, 16]} mb={[8, null, 12]}>
        <Search setQuery={setQuery} query={filterParams.query} />

        <SelectMenu
          options={REGIONS}
          defaultOption="All"
          placeholder="Filter by Region"
          selected={filterParams.region}
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
