import { useEffect, useState } from 'react';

export const useFilteredCountries = (countries, { query, region }) => {
  const [filteredCountries, setFilteredCountries] = useState(countries);

  useEffect(() => {
    if (!query && !region) return setFilteredCountries(countries);

    const _countries = countries.filter(
      country =>
        country.region.toLowerCase().includes(region) && country.name.common.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCountries(_countries);
  }, [query, region, countries]);

  return filteredCountries;
};
