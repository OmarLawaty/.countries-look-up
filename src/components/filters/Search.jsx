import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

export const Search = ({ query, setQuery }) => (
  <InputGroup w="96" bg="white">
    <InputLeftElement pointerEvents="none">
      <SearchIcon color="gray.900" />
    </InputLeftElement>

    <Input placeholder="Search for a country..." type="search" value={query} onChange={e => setQuery(e.target.value)} />
  </InputGroup>
);
