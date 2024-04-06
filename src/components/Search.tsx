import { Input, InputGroup, InputLeftElement, InputRightElement, Text, useColorModeValue } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { useDebouncedQuery } from '../hooks';
import { useSearchParams } from 'react-router-dom';

interface SearchProps {
  setSearchQuery: (query: string) => void;
}

export const Search = ({ setSearchQuery }: SearchProps) => {
  const [searchParams] = useSearchParams();
  const [searchText, setSearchText] = useState<string>(searchParams.get('query') || '');

  const debouncedQuery = useDebouncedQuery(searchText.trim(), 700);

  useEffect(() => {
    setSearchQuery(debouncedQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  return (
    <InputGroup w={['full', null, '30rem']} bg={useColorModeValue('white', 'blue.700')} rounded="base">
      <InputLeftElement h="full" pointerEvents="none" left="4">
        <SearchIcon color={useColorModeValue('gray.900', 'gray.100')} />
      </InputLeftElement>

      <Input
        placeholder="Search for a country..."
        type="search"
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        color={useColorModeValue('gray.900', 'white')}
        _placeholder={{ color: useColorModeValue('gray.900', 'white') }}
        h={[12, null, 14]}
        fontSize={['sm']}
        pl="4.5rem"
        bg="transparent"
      />

      {searchText.length ? (
        <InputRightElement h="full" pointerEvents="all" right="4">
          <Text
            decoration="underline"
            color="lightgray"
            cursor="pointer"
            _hover={{
              color: 'white',
              textDecoration: 'none',
              fontWeight: '600'
            }}
            transition={`all 0.3s`}
            onClick={() => setSearchText('')}
          >
            Clear
          </Text>
        </InputRightElement>
      ) : null}
    </InputGroup>
  );
};
