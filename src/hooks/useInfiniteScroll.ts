import { useInfiniteQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

import { Country, Region } from '../types';

export const useInfiniteScroll = (keyfn: () => Promise<Country[] | undefined>, region: Region | null) => {
  const { ref, inView } = useInView();

  const { data, isLoading, isError, error, isFetching, fetchNextPage, refetch, hasNextPage } = useInfiniteQuery(
    ['countries', region ? region : 'all'],
    async ({ pageParam = 1 }) => await getCountriesByPage(keyfn(), pageParam),
    {
      refetchOnWindowFocus: false,
      staleTime: 60000,
      getNextPageParam: (lastPage, allPages) => (lastPage?.length < 20 ? undefined : allPages.length + 1)
    }
  );

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, hasNextPage]);

  return {
    isLoading,
    isError,
    error,
    isFetching,
    hasNextPage: !!hasNextPage,
    countries: data ? data.pages.flatMap(page => page) : [],
    ref,
    refetch
  };
};

const getCountriesByPage = async (countries: Promise<Country[] | undefined>, page: number = 1): Promise<Country[]> => {
  const filteredCountries = (await countries)?.filter((_, index) => index <= page * 20 - 1 && index >= (page - 1) * 20);

  return filteredCountries ? filteredCountries : [];
};
