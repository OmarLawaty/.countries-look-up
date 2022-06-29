import { SearchIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { useState } from 'react';

const Search = () => {
  const [value, setValue] = useState('');

  return (
    <InputGroup w="30rem">
      <InputLeftElement pointerEvents="none" minH="14" left="4" w="12">
        <SearchIcon color="gray.900" w="full" fontSize="1.2rem" />
      </InputLeftElement>

      <Input
        type="search"
        onChange={e => setValue(e.target.value)}
        value={value}
        placeholder="Search for a country..."
        minH="14"
        pl="4.5rem"
        fontSize="14"
      />
    </InputGroup>
  );
};

export default Search;
