import { useEffect, useState } from 'react';
import { Box, Center, Container, Grid } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import { Filters } from './Filters';
import { FilterOptions } from './types';
import { getAllCountries } from '../../api';
import { CountryCard } from './CountryCard';
import { ResponseWrapper } from '../../components';
import { ApiError, Country, Region } from '../../types';
import { useDebouncedQuery, useFilteredCountries, useInfiniteScroll } from '../../hooks';

export const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    query: searchParams.get('query') || '',
    region: (searchParams.get('region') as Region) || null
  });
  const isFiltered = !!filterOptions.query || !!filterOptions.region;

  const { data } = useQuery('allCountries', async () => await getAllCountries());
  const allCountries = data ? data : [];

  const { countries, isLoading, isFetching, isError, error, hasNextPage, ref } = useInfiniteScroll(allCountries);

  const debouncedQuery = useDebouncedQuery(filterOptions.query, 700);
  const filteredCountries = useFilteredCountries({
    countries: allCountries,
    query: debouncedQuery,
    region: filterOptions.region
  });

  useEffect(() => {
    if (filterOptions.query && filterOptions.region)
      setSearchParams({ query: filterOptions.query, region: filterOptions.region });
    else if (!filterOptions.query && filterOptions.region) setSearchParams({ region: filterOptions.region });
    else if (filterOptions.query && !filterOptions.region) setSearchParams({ query: filterOptions.query });
    else setSearchParams({});
  }, [filterOptions, setSearchParams]);

  return (
    <Container as="section" mt={[6, null, 12]} flex="1 1 auto" display="flex" flexDir="column" pb="10">
      <Filters
        query={filterOptions.query}
        setQuery={query => setFilterOptions({ ...filterOptions, query })}
        region={filterOptions.region}
        setRegion={region => setFilterOptions({ ...filterOptions, region })}
      />

      <ResponseWrapper isLoading={isLoading} isFetching={isFetching} isError={isError} error={error as ApiError}>
        <Grid
          as="section"
          templateColumns={['1fr', '1fr 1fr', null, 'repeat(3, 1fr)', 'repeat(4, 1fr)', 'repeat(5, 1fr)']}
          gap={[4, null, 8, 10, 10]}
        >
          <RenderCountries isFiltered={isFiltered} filteredCountries={filteredCountries} countries={countries} />
        </Grid>

        {isFiltered && filteredCountries && !filteredCountries.length && <Center>No results found</Center>}
      </ResponseWrapper>

      {/* Check if reached the bottom of the page */}
      {!isLoading && hasNextPage && !isFiltered && <Box w="100vw" ref={ref}></Box>}
    </Container>
  );
};

interface RenderCountriesProps {
  isFiltered: boolean;
  filteredCountries: Country[] | null;
  countries: Country[];
}

const RenderCountries = ({ isFiltered, filteredCountries, countries }: RenderCountriesProps) => {
  if (isFiltered)
    return filteredCountries?.map(country => <CountryCard key={country.cca2.toLowerCase()} country={country} />);

  if (!isFiltered) return countries?.map(country => <CountryCard key={country.cca2.toLowerCase()} country={country} />);
};
