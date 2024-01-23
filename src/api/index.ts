import axios from 'axios';
import { Country } from '../types';

axios.defaults.baseURL = 'https://restcountries.com/v3.1/';

export const getAllCountries = async (): Promise<Country[]> => {
  let countries: Country[] = [];

  await axios.get('/all').then(response => {
    if (response?.data) countries = response.data;
  });

  return countries;
};

export const getCountry = async (code: string): Promise<Country[] | undefined> => {
  const response = await axios.get(`/alpha/${code}`);

  if (response?.data) return response.data;
};

export const getCountries = async (codes: string[]): Promise<Country[] | undefined> => {
  const response = await axios.get(`/alpha?codes=${codes.join(',')}`);

  if (response?.data) return response.data;
};
