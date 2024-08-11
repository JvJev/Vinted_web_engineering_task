import { useState, useCallback } from 'react';

const FLICKR_API_KEY = process.env.REACT_APP_API_KEY;

export function useFlickrApi() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const callApi = useCallback(async (method, params) => {
    setIsLoading(true);
    setError(null);
    try {
      const url = `https://www.flickr.com/services/rest/?method=${method}&api_key=${FLICKR_API_KEY}&format=json&nojsoncallback=1&${new URLSearchParams(params)}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.stat !== 'ok') {
        throw new Error(data.message);
      }
      return data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { callApi, isLoading, error };
}