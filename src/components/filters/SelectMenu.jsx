import { Button, Menu, MenuButton, MenuItem, MenuList, useColorModeValue } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

export const SelectMenu = ({ options, defaultOption, placeholder = defaultOption, selected, setSelected }) => {
  return (
    <Menu minH="full" w={['12.5rem', null, '13rem']} bg={useColorModeValue('white', 'blue.700')}>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon ml="6" />}
        bg={useColorModeValue('white', 'blue.700')}
        minH={['12', null, '14']}
        w={['12.5rem', null, '13rem']}
        fontSize="sm"
        textTransform="capitalize"
      >
        {selected ? selected : placeholder}
      </MenuButton>

      <MenuList top="0.25rem" bg={useColorModeValue('white', 'blue.700')} transform="translate(16px, 243px)">
        {options.map(option => (
          <SelectOption
            key={option}
            isActive={selected === option}
            onSelect={() => setSelected(selected => (selected === option ? '' : option))}
          >
            {option}
          </SelectOption>
        ))}
      </MenuList>
    </Menu>
  );
};

const SelectOption = ({ children, isActive, onSelect }) => (
  <MenuItem
    textTransform="capitalize"
    bg={useColorModeValue(isActive ? 'gray.200' : 'transparent', isActive ? 'blue.800' : 'transparent')}
    fontSize={['11px', null, 'sm']}
    py="1"
    px={['6', null, '8']}
    _hover={{
      bg: useColorModeValue(isActive ? 'gray.200' : 'gray.100', isActive ? 'blue.800' : 'gray.500')
    }}
    onClick={onSelect}
  >
    {children}
  </MenuItem>
);
