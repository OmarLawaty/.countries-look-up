import { extendTheme } from '@chakra-ui/react';

// Base Values
const colors = {
  white: 'hsl(0, 0%, 100%)',

  blue: {
    700: 'hsl(209, 23%, 22%)',
    800: 'hsl(207, 26%, 17%)',
    900: 'hsl(200, 15%, 8%)'
  },
  gray: {
    100: 'hsl(0, 0%, 98%)',
    500: 'hsl(0, 0%, 52%)'
  }
};

// Custom Components
const Container = {
  baseStyle: {
    maxW: '8xl',
    paddingX: '16'
  }
};

// Configurations
const config = { initialColorMode: 'light', useSystemColorMode: false };

export default extendTheme({
  colors,
  fontFamily: "'Nunito Sans', sans-serif;",
  components: { Container },
  config
});
