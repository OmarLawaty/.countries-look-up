import React from 'react';
import { Box } from '@chakra-ui/react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { CountryDetails, Home } from './pages';
import { Header } from './components';

const App = () => {
  return (
    <>
      <Header />

      <Box as="main">
        <Routes>
          <Route path="/" element={<Navigate to="/countries" />} />

          <Route path="/countries" element={<Home />} />
          <Route path="/countries/:code" element={<CountryDetails />} />
        </Routes>
      </Box>
    </>
  );
};

export default App;
