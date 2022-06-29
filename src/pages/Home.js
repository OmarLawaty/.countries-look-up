import React from 'react';
import { CountriesList, Filters } from '../components';

export const Home = () => {
  return (
    <>
      <Filters />

      <CountriesList />
    </>
  );
};
