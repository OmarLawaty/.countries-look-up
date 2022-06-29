import { useState } from 'react';
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

const SelectMenu = ({ options, placeHolder }) => {
  const [activeMenuOption, setActiveMenuOption] = useState(0);

  const renderOptions = () =>
    options.map((item, index) => (
      <MenuItem
        onClick={() => setActiveMenuOption(index)}
        key={index}
        textTransform="capitalize"
        bg="white"
        fontSize="14px"
        paddingY="1"
        paddingX="8"
      >
        {item}
      </MenuItem>
    ));

  return (
    <Menu minH="100%" bg="white">
      <>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon ml="6" />}
          textTransform="capitalize"
          bg="white"
          minH="14"
          w="13rem"
          fontSize="14"
          display="flex"
          justifyContent="space-between"
        >
          {activeMenuOption === 0 ? placeHolder : options[activeMenuOption]}
        </MenuButton>

        <MenuList w="13rem" minW="full" top="0.25rem">
          {renderOptions()}
        </MenuList>
      </>
    </Menu>
  );
};

export default SelectMenu;
