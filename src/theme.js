import { extendTheme } from '@chakra-ui/react';

const Container = {
  baseStyle: {
    maxW: '8xl',
    paddingX: '16'
  }
};

const config = { initialColorMode: 'light', useSystemColorMode: false };

export default extendTheme({
  fontFamily: "'Nunito Sans', sans-serif;",
  components: { Container },
  config
});
