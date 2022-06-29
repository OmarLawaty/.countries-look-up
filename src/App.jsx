import { Box } from '@chakra-ui/react';
import React from 'react';

import { CountriesList, Filters, Header } from './component';

const App = () => {
  return (
    <Box>
      <Header />

      <Filters />

      <CountriesList />
    </Box>
  );
};

export default App;
