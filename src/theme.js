import { mode } from '@chakra-ui/theme-tools';
import { extendTheme } from '@chakra-ui/react';

// Global Values
const globalStyles = {
  global: props => ({
    body: {
      backgroundColor: mode('gray.100', 'blue.800')(props),
      pb: '10',
      scrollbarGutter: 'stable'
    }
  })
};

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
    pl: '20',
    pr: '16'
  }
};

// Configurations
const config = { initialColorMode: 'light', useSystemColorMode: false };

export default extendTheme({
  styles: {
    ...globalStyles
  },
  colors,
  fontFamily: "'Nunito Sans', sans-serif;",
  components: { Container },
  config
});
