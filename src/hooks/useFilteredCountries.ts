import { useEffect, useState } from 'react';

import { Country, Region } from '../types';

interface UseFilteredCountriesProps {
  countries: Country[];
  query: string;
  region: Region | null;
}

export const useFilteredCountries = ({ countries, query, region }: UseFilteredCountriesProps): Country[] | null => {
  const [filteredCountries, setFilteredCountries] = useState<Country[] | null>(countries);

  useEffect(() => {
    if (!query && !region) return setFilteredCountries(null);

    const _countries = countries
      ? countries.filter(
          country =>
            country.region.toLowerCase().includes(region ?? '') &&
            country.name.common.toLowerCase().includes(query.toLowerCase()) &&
            country.name.common.toLowerCase() !== 'israel'
        )
      : null;

    setFilteredCountries(_countries);
  }, [countries, query, region]);

  return filteredCountries;
};
