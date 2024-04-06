import { useEffect, useState } from 'react';
import { Box, Center, Container, Grid } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';

import { Filters } from './Filters';
import { FilterOptions } from './types';
import { getCountries } from '../../api';
import { CountryCard } from './CountryCard';
import { BackToTop, ResponseWrapper } from '../../components';
import { ApiError, Region } from '../../types';
import { useInfiniteScroll } from '../../hooks';
import { useInView } from 'react-intersection-observer';

export const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    query: searchParams.get('query') || '',
    region: (searchParams.get('region') as Region) || null
  });

  const { ref: toTopElementRef, inView } = useInView();

  const getCurrentCountriesList = () => {
    if (filterOptions.query && filterOptions.region)
      return getCountries({
        type: 'region&name',
        value: {
          name: filterOptions.query,
          region: filterOptions.region
        }
      });
    if (filterOptions.region) return getCountries({ type: 'region', value: filterOptions.region });
    if (filterOptions.query) return getCountries({ type: 'name', value: filterOptions.query });
    return getCountries({ type: 'all' });
  };

  const { countries, isLoading, isFetching, isError, error, hasNextPage, ref, refetch } = useInfiniteScroll(
    getCurrentCountriesList,
    filterOptions.region
  );

  useEffect(() => {
    if (filterOptions.query && filterOptions.region)
      setSearchParams({ query: filterOptions.query, region: filterOptions.region });
    else if (!filterOptions.query && filterOptions.region) setSearchParams({ region: filterOptions.region });
    else if (filterOptions.query && !filterOptions.region) setSearchParams({ query: filterOptions.query });
    else setSearchParams({});

    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterOptions.region, filterOptions.query]);

  useEffect(() => {
    document.title = `Countries`;
  }, []);

  return (
    <Container as="section" mt={[6, null, 12]} flex="1 1 auto" display="flex" flexDir="column" pb="10">
      <Filters
        setQuery={query => setFilterOptions({ ...filterOptions, query })}
        region={filterOptions.region}
        setRegion={region => {
          setFilterOptions({ ...filterOptions, region });
        }}
        ref={toTopElementRef}
      />

      <ResponseWrapper
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        error={error as ApiError}
        isNotFound={!countries.length}
        notFoundMessage={<Center>No results found</Center>}
      >
        <Grid
          as="section"
          templateColumns={['1fr', '1fr 1fr', null, 'repeat(3, 1fr)', 'repeat(4, 1fr)', 'repeat(5, 1fr)']}
          gap={[4, null, 8, 10, 10]}
        >
          {countries?.map(country => (
            <CountryCard key={country.cca2.toLowerCase()} country={country} />
          ))}
        </Grid>
      </ResponseWrapper>

      <BackToTop isElementInView={inView} />

      {/* Check if reached the bottom of the page */}
      {!isLoading && hasNextPage && !filterOptions.query && <Box w="100vw" pos="absolute" bottom="20" ref={ref}></Box>}
    </Container>
  );
};
