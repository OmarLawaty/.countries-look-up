import axios from 'axios';

const countriesApi = axios.create({ baseURL: 'https://restcountries.com/v3.1/' });

export const getAllCountries = () => countriesApi.get(`https://restcountries.com/v3.1/all/`);

export const getOneCountryByCode = code => countriesApi.get(`https://restcountries.com/v3.1/alpha/${code}`);

export const getCountriesByCode = codesArr =>
  countriesApi.get('https://restcountries.com/v3.1/alpha/', {
    params: {
      codes: codesArr.join(',')
    }
  });
