import { useEffect, useState } from 'react';

export const useDebouncedQuery = (query, debounceTime) => {
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebouncedQuery(query);
    }, debounceTime);

    return () => clearTimeout(debounceTimer);
  }, [query, debounceTime]);

  return debouncedQuery;
};
