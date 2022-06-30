import { GridItem } from '@chakra-ui/react';

export const CountryCard = ({ country, uniqueKey }) => (
  <GridItem w="100%" h="10" bg="blue.500" key={uniqueKey}>
    <h1>{country.name.common}</h1>
  </GridItem>
);
