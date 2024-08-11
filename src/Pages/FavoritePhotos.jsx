import React, { useState, useEffect } from 'react';
import ImageList from '../Components/ImageList';
import '../App.css';

function FavoritePhotos() {
  const [favoritePhotos, setFavoritePhotos] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favoritePhotos')) || {};
    const favoritePhotosList = Object.values(savedFavorites);
    setFavoritePhotos(favoritePhotosList);
  }, []);

  const removeFromFavorites = (photoId) => {
    const updatedFavorites = favoritePhotos.filter(photo => photo.id !== photoId);
    localStorage.setItem('favoritePhotos', JSON.stringify(updatedFavorites));
    setFavoritePhotos(updatedFavorites);
  };

  return (
    <div className="favorite-photos">
      <h2>Saved Favorite Photos</h2>
      {favoritePhotos.length > 0 ? (
        <ImageList images={favoritePhotos} removeFromFavorites={removeFromFavorites} />
      ) : (
        <p>No favorite photos yet.</p>
      )}
    </div>
  );
}

export default FavoritePhotos;