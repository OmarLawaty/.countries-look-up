import { useEffect, useState } from 'react';
import { Box, Container, Flex, Grid, GridItem, SimpleGrid } from '@chakra-ui/react';

import { Search, SelectMenu } from '../components/filters';
import { getAllCountries } from '../apis/countries';
import { CountryCard } from '../components';

const REGIONS = ['africa', 'america', 'asia', 'europe', 'oceania'];

export const Home = () => {
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const newCountries = async () => await getAllCountries().then(({ data }) => setCountries(data));

    newCountries();
  }, []);

  return (
    <Container as="section">
      <Flex justifyContent="space-between" mb="12">
        <Search query={query} setQuery={setQuery} />

        <SelectMenu
          options={REGIONS}
          defaultOption="All"
          placeholder="Filter by Region"
          selected={region}
          setSelected={setRegion}
        />
      </Flex>

      <SimpleGrid as="section" minChildWidth="250px" gap="20">
        {countries.length !== 0 ? (
          countries.slice(0, 100).map(country => (
            <Box key={country.ccn3}>
              <CountryCard country={country} />
            </Box>
          ))
        ) : (
          <Box margin="0 auto">There is no countries</Box>
        )}
      </SimpleGrid>
    </Container>
  );
};
