import { Button, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const ThemeSwitcher = () => {
  const { toggleColorMode } = useColorMode();
  return (
    <Button
      onClick={toggleColorMode}
      leftIcon={useColorModeValue(<MoonIcon />, <SunIcon />)}
      bg="transparent"
      fontSize={['12px', null, '1rem']}
    >
      {useColorModeValue('Dark', 'Light')} Mode
    </Button>
  );
};

export default ThemeSwitcher;
