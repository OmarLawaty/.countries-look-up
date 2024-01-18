import { useEffect, useState } from 'react';

/**
 * Hook that returns a debounced query string.
 *
 * @param query - The input query string.
 * @param debounceTime - The debounce time in milliseconds.
 * @returns The debounced query string.
 */

export const useDebouncedQuery = (query: string, debounceTime: number): string => {
  const [debouncedQuery, setDebouncedQuery] = useState<string>(query);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebouncedQuery(query);
    }, debounceTime);

    return () => clearTimeout(debounceTimer);
  }, [query, debounceTime]);

  return debouncedQuery;
};
