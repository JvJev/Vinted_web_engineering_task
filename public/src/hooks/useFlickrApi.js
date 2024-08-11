import { useState, useCallback } from 'react';
import { createFlickr } from 'flickr-sdk';

const FLICKR_API_KEY = '6c23ec0062a5939910864b4592ffc8ee';
const { flickr } = createFlickr(FLICKR_API_KEY);

export function useFlickrApi() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const callApi = useCallback(async (method, params) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await flickr(method, params);
      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { callApi, isLoading, error };
}