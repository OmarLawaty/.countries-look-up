import axios from 'axios';

import { Country, Region } from '../types';

axios.defaults.baseURL = 'https://restcountries.com/v3.1/';

type getCountriesParams =
  | { type: 'region'; value: Region }
  | { type: 'name'; value: string }
  | { type: 'language'; value: string }
  | { type: 'codes'; value: string[] }
  | { type: 'region&name'; value: { name: string; region: Region } }
  | { type: 'all'; value?: string };

export const getCountries = async ({ type, value }: getCountriesParams): Promise<Country[] | undefined> => {
  let res;

  switch (type) {
    case 'all':
      res = {
        data: (await axios.get('/all')).data.filter(
          (country: Country) => !country.name.common.toLowerCase().startsWith('isr')
        )
      };
      break;

    case 'region':
      res = await axios.get(`/region/${value}`);
      break;

    case 'name':
      try {
        res = {
          data: (await axios.get(`/name/${value.toLowerCase()}`)).data.filter((country: Country) =>
            country.name.common.toLowerCase().includes(value.toLowerCase())
          )
        };
      } catch (error) {
        res = { data: [] };
      }
      break;

    case 'language':
      res = await axios.get(`/lang/${value}`);
      break;

    case 'codes':
      res = await axios.get(`/alpha?codes=${value.join(',')}`);
      break;

    case 'region&name':
      res = {
        data: (await axios.get(`/region/${value.region}`)).data.filter((country: Country) =>
          country.name.common.toLowerCase().includes(value.name.toLowerCase())
        )
      };

      break;
  }

  return res?.data.filter((country: Country) => !country.name.common.toLowerCase().startsWith('isr'));
};
