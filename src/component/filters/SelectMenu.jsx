import { useState } from 'react';
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

const SelectMenu = ({ options, placeHolder }) => {
  const [activeMenuOption, setActiveMenuOption] = useState(0);

  const renderOptions = () =>
    options.map((item, index) => (
      <MenuItem onClick={() => setActiveMenuOption(index)} key={index} textTransform="capitalize">
        {item}
      </MenuItem>
    ));

  return (
    <Menu>
      <>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} textTransform="capitalize">
          {activeMenuOption === 0 ? placeHolder : options[activeMenuOption]}
        </MenuButton>

        <MenuList>{renderOptions()}</MenuList>
      </>
    </Menu>
  );
};

export default SelectMenu;
