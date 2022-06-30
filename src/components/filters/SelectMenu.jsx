import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

export const SelectMenu = ({ options, defaultOption, placeholder = defaultOption, selected, setSelected }) => {
  return (
    <Menu minH="100%" bg="white">
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon ml="6" />}
        textTransform="capitalize"
        bg="white"
        minH="14"
        w="13rem"
        fontSize="sm"
        d="flex"
        justifyContent="space-between"
      >
        {selected ? selected : placeholder}
      </MenuButton>

      <MenuList w="13rem" minW="full" top="0.25rem">
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
    bg={isActive ? 'gray.200' : 'white'}
    fontSize="sm"
    py="1"
    px="8"
    _hover={{
      bg: isActive ? 'gray.200' : 'gray.100'
    }}
    onClick={onSelect}
  >
    {children}
  </MenuItem>
);
