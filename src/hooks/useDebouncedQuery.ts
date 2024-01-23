import { useEffect, useState } from 'react';

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
