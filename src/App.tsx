import { Flex } from '@chakra-ui/react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { CountryPreview, Home } from './pages';
import { Header } from './components';

const App = () => (
  <>
    <Header />

    <Flex as="main" flex="1 1 auto" flexDir="column">
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path=":code" element={<CountryPreview />} />
      </Routes>
    </Flex>
  </>
);

export default App;
