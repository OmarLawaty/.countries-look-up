import { Box, Button, Menu, MenuButton, MenuItem, MenuList, useColorModeValue } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Regions } from '../../types';

interface SelectMenuProps {
  options: Regions[];
  defaultOption: string;
  placeholder?: string;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

export const SelectMenu = ({
  options,
  defaultOption,
  placeholder = defaultOption,
  selected,
  setSelected
}: SelectMenuProps) => {
  return (
    <Box minH="full" w={['12.5rem', null, '13rem']} bg={useColorModeValue('white', 'blue.700')}>
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon ml="6" />}
          bg={useColorModeValue('white', 'blue.700')}
          minH={['12', null, '14']}
          fontSize="sm"
          w="full"
          textTransform="capitalize"
        >
          {selected ? selected : placeholder}
        </MenuButton>

        <MenuList w="full" minW="unset" bg={useColorModeValue('white', 'blue.700')}>
          {options.map(option => (
            <SelectOption
              key={option}
              isActive={selected === option}
              onSelect={() => setSelected(selected === option ? '' : option)}
            >
              {option}
            </SelectOption>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};

interface SelectOptionProps {
  children: React.ReactNode;
  isActive: boolean;
  onSelect: () => void;
}

const SelectOption = ({ children, isActive, onSelect }: SelectOptionProps) => (
  <MenuItem
    textTransform="capitalize"
    bg={useColorModeValue(isActive ? 'gray.200' : 'transparent', isActive ? 'blue.800' : 'transparent')}
    fontSize={['xs', null, 'sm']}
    py="1"
    px={[6, null, 8]}
    _hover={{
      bg: useColorModeValue(isActive ? 'gray.200' : 'gray.100', isActive ? 'blue.800' : 'gray.500')
    }}
    onClick={onSelect}
  >
    {children}
  </MenuItem>
);
