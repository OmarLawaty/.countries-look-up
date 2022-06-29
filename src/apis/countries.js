import axios from 'axios';

export const getAllCountries = async () => {
  const response = await axios.get(`https://restcountries.com/v3.1/all/`);

  return response;
};

export const getCountriesByName = async name => {
  const response = await axios.get(`https://restcountries.com/v3.1/name/${name}`);

  return response;
};

export const getOneCountryByCode = async code => {
  const response = await axios.get(`https://restcountries.com/v3.1/alpha/${code}`);

  return response;
};

export const getCountriesByCode = async codesArr => {
  const response = await axios.get('https://restcountries.com/v3.1/alpha/', {
    params: {
      codes: codesArr.join(',')
    }
  });

  return response;
};
