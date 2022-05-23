import { useState, useEffect } from 'react';

import { httpClient } from 'helpers/httpClient';

export const useEcotopFind = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const find = async () => {
    try {
      const res = await httpClient.get(url);
      setData(res.data.data);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await find();
      setIsLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [data, isLoading, error];
};
