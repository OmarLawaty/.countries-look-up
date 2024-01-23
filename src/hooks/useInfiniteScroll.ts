import { useInfiniteQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

import { Country } from '../types';

export const useInfiniteScroll = (countries: Country[]) => {
  const { ref, inView } = useInView();

  const { data, isLoading, isError, error, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery(
    'countries',
    ({ pageParam = 1 }) => getCountriesByPage(countries, pageParam),
    {
      getNextPageParam: (_, allPages) => (allPages.length > 11 ? undefined : allPages.length + 1)
    }
  );

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, fetchNextPage, hasNextPage, isLoading]);

  const countriesByPage = data ? data.pages.flatMap(page => page) : [];

  return { isLoading, isError, error, isFetching, hasNextPage: !!hasNextPage, countries: countriesByPage, ref };
};

const getCountriesByPage = (countries: Country[], page: number = 1): Country[] => {
  const filteredCountries = countries?.filter((_, index) => index <= page * 20 - 1 && index >= (page - 1) * 20);

  return filteredCountries ? filteredCountries : [];
};
