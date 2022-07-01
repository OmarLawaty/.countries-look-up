import { Input, InputGroup, InputLeftElement, useColorModeValue } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

export const Search = ({ setQuery, query }) => (
  <InputGroup w={['full', null, '30rem']} bg={useColorModeValue('white', 'blue.700')} rounded="base">
    <InputLeftElement pointerEvents="none" h="14" left={['5', null, '6']}>
      <SearchIcon color={useColorModeValue('gray.900', 'gray.100')} />
    </InputLeftElement>

    <Input
      placeholder="Search for a country..."
      type="search"
      value={query}
      onChange={e => setQuery(e.target.value)}
      color={useColorModeValue('gray.900', 'white')}
      _placeholder={{ color: useColorModeValue('gray.900', 'white') }}
      h={['12', null, '14']}
      pl="4.5rem"
      letterSpacing={['-1.7px', null, 'tighter']}
      bg="transparent"
    />
  </InputGroup>
);
