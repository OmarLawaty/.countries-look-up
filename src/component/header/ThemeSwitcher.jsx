import { Button, useColorMode } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const ThemeSwitcher = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button onClick={toggleColorMode} leftIcon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}>
      {colorMode === 'light' ? 'Dark' : 'light'} Mode
    </Button>
  );
};

export default ThemeSwitcher;
