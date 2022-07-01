import { Button, Menu, MenuButton, MenuItem, MenuList, useColorModeValue } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

export const SelectMenu = ({ options, defaultOption, placeholder = defaultOption, selected, setSelected }) => {
  return (
    <Menu minH="100%" bg={useColorModeValue('white', 'blue.700')}>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon ml="6" />}
        textTransform="capitalize"
        bg={useColorModeValue('white', 'blue.700')}
        minH="14"
        w="13rem"
        fontSize="sm"
        d="flex"
        justifyContent="space-between"
      >
        {selected ? selected : placeholder}
      </MenuButton>

      <MenuList w="13rem" minW="full" top="0.25rem" bg={useColorModeValue('white', 'blue.700')}>
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
    fontSize="sm"
    py="1"
    px="8"
    _hover={{
      bg: useColorModeValue(isActive ? 'gray.200' : 'gray.100', isActive ? 'blue.800' : 'gray.500')
    }}
    onClick={onSelect}
  >
    {children}
  </MenuItem>
);
