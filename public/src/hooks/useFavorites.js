import { useState, useEffect } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favoritePhotos');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favoritePhotos', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (photo) => {
    setFavorites(prev => [...prev, photo]);
  };

  const removeFavorite = (photoId) => {
    setFavorites(prev => prev.filter(photo => photo.id !== photoId));
  };

  return { favorites, addFavorite, removeFavorite };
}