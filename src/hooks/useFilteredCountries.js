import { useEffect, useState } from 'react';

export const useFilteredCountries = (countries, { query, region }) => {
  const [filteredCountries, setFilteredCountries] = useState(countries);

  useEffect(() => {
    countries.filter(country => country.region.includes(region) && country.name.common_name.includes(query));
  }, [query, region]);

  return;
};
