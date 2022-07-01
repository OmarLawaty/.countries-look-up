import { useState, useEffect } from 'react';
import { Box, Container, Flex } from '@chakra-ui/react';

import { CountryCard } from './';
import { Search, SelectMenu } from '../../components/filters';
import { getAllCountries } from '../../apis/countries';
import { useFilteredCountries, useDebouncedQuery } from '../../hooks';

const REGIONS = ['africa', 'americas', 'asia', 'europe', 'oceania'];

export const Home = () => {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState('');

  const debouncedQuery = useDebouncedQuery(query, 700);
  const filteredCountries = useFilteredCountries(countries, { query: debouncedQuery, region });

  useEffect(() => {
    const getData = async () => {
      const _countries = (await getAllCountries()).data;
      setCountries(_countries);
    };

    getData();
  }, []);

  return (
    <Container as="section" mt={['6', null, '12']}>
      <Flex
        flexDir={['column', null, 'row']}
        justifyContent="space-between"
        gap={['10', null, '16']}
        mb={['8', null, '12']}
      >
        <Search setQuery={setQuery} query={query} />

        <SelectMenu
          options={REGIONS}
          defaultOption="All"
          placeholder="Filter by Region"
          selected={region}
          setSelected={setRegion}
        />
      </Flex>

      <Box
        as="section"
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(16rem, 1fr))"
        gap="20"
        justifyItems="center"
      >
        {filteredCountries.slice(0, 50).map(country => (
          <CountryCard key={country.cca2.toLowerCase()} country={country} />
        ))}
      </Box>
    </Container>
  );
};
