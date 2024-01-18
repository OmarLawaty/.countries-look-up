import axios from 'axios';
import { useEffect, useState } from 'react';
import { ApiError } from '../types';

export const useFetch = <DataType>(url: string, params: object = {}, ignore: boolean = false) => {
  const [data, setData] = useState<DataType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | Error | null>(null);

  useEffect(() => {
    if (ignore) {
      setIsLoading(false);
      setIsError(false);
      setError(null);
      setData(null);
      return;
    }

    setIsLoading(true);
    const source = axios.CancelToken.source();

    const getData = async () => {
      try {
        const req = await axios.get(url, {
          cancelToken: source.token,
          params
        });

        const response = req.data;

        if (response) setData(response);
      } catch (err) {
        if ((err as ApiError).code === 'ERR_CANCELED') return;

        setIsError(true);
        setError(err as ApiError);
        return;
      } finally {
        setIsLoading(false);
      }
    };
    getData();

    return () => {
      source.cancel();
    };
    // eslint-disable-next-line
  }, [url]);

  return { data, isLoading, isError, error };
};
