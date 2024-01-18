import { useEffect, useState } from 'react';
import { Country } from '../types';

interface UseFilteredCountriesProps {
  countries: Country[] | null;
  query: string;
  region: string;
}

export const useFilteredCountries = ({ countries, query, region }: UseFilteredCountriesProps): Country[] | null => {
  const [filteredCountries, setFilteredCountries] = useState<Country[] | null>(countries);

  useEffect(() => {
    if (!query && !region) return setFilteredCountries(countries);

    const _countries = countries?.filter(
      country =>
        country.region.toLowerCase().includes(region) &&
        country.name.common.toLowerCase().includes(query.toLowerCase()) &&
        country.name.common.toLowerCase() !== 'israel'
    );
    setFilteredCountries(_countries || null);
  }, [query, region, countries]);

  return filteredCountries;
};
