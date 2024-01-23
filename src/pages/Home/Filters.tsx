import { Flex } from '@chakra-ui/react';

import { SelectMenu, Search } from '../../components';
import { FilterOptions } from './types';
import { Region } from '../../types';

interface FiltersProps extends FilterOptions {
  setQuery: (query: string) => void;
  setRegion: (region: Region | null) => void;
}

const regions: Region[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];

export const Filters = ({ query, region, setQuery, setRegion }: FiltersProps) => {
  return (
    <Flex flexDir={['column', null, 'row']} justifyContent="space-between" gap={[10, null, 16]} mb={[8, null, 12]}>
      <Search setSearchQuery={setQuery} searchQuery={query} />

      <SelectMenu
        options={regions}
        defaultOption="All"
        placeholder="Filter by Region"
        selected={region}
        setSelected={setRegion as (region: string | null) => void}
      />
    </Flex>
  );
};
