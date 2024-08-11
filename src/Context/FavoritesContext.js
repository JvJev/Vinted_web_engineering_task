import React, { createContext, useState, useEffect, useCallback } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favoritePhotos, setFavoritePhotos] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favoritePhotos')) || [];
    setFavoritePhotos(savedFavorites);
  }, []);

  const addToFavorites = useCallback((photo) => {
    setFavoritePhotos(prev => {
      const updated = [...prev, photo];
      localStorage.setItem('favoritePhotos', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const removeFromFavorites = useCallback((photoId) => {
    setFavoritePhotos(prev => {
      const updated = prev.filter(photo => photo.id !== photoId);
      localStorage.setItem('favoritePhotos', JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <FavoritesContext.Provider value={{ favoritePhotos, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};