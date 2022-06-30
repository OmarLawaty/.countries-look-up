import { useEffect, useState } from 'react';
import { Box, Container, Flex, Grid, GridItem } from '@chakra-ui/react';

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
    <Container>
      <Flex justifyContent="space-between">
        <Search query={query} setQuery={setQuery} />

        <SelectMenu
          options={REGIONS}
          defaultOption="All"
          placeholder="Filter by Region"
          selected={region}
          setSelected={setRegion}
        />
      </Flex>

      <Grid templateColumns="repeat(minmax(30rem,1fr), 1fr)" gap={6}>
        {countries.length !== 0 ? (
          countries.slice(0, 100).map(country => (
            <>
              {/* <CountryCard country={country} uniqueKey={country.ccn3} /> */}
              <h2 key={country.altSpellings[0]}>Hi</h2>
            </>
          ))
        ) : (
          <Box>There is no countries</Box>
        )}
      </Grid>
    </Container>
  );
};
