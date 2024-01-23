import { Flex } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';

import { Header } from './components';
import { Home, CountryDetails } from './pages';

const App = () => (
  <>
    <Header />

    <Flex as="main" flex="1 1 auto" flexDir="column">
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path=":code" element={<CountryDetails />} />
      </Routes>
    </Flex>
  </>
);

export default App;
