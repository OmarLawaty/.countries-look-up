import React from 'react';

import { CountriesList, Filters, Header } from './component';

const App = () => {
  return (
    <div>
      <Header />

      <Filters />

      <CountriesList />
    </div>
  );
};

export default App;
