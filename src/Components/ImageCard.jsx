import React, { useState, useEffect, useRef } from 'react';
import '../App.css';

const ImageCard = ({ image, lastImageRef, removeFromFavorites }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const favoritePhotos = JSON.parse(localStorage.getItem('favoritePhotos')) || {};
    setIsFavorite(favoritePhotos[image.id] || false);
  }, [image.id]);

  const handleFavoriteClick = () => {
    const favoritePhotos = JSON.parse(localStorage.getItem('favoritePhotos')) || {};
    if (isFavorite) {
      delete favoritePhotos[image.id];
      removeFromFavorites?.(image.id);
    } else {
      favoritePhotos[image.id] = image;
    }
    localStorage.setItem('favoritePhotos', JSON.stringify(favoritePhotos));
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="image-card" ref={lastImageRef}>
      <img
        ref={imgRef}
        className="card-image"
        alt={image.title}
        src={image.src}
        loading="lazy"
      />
      <div className="card-body">
        <div className="card-title">{image.title}</div>
        <hr className="card-divider" />
        <div className="card-author">{image.ownername}</div>
        <button className="favorite-button" onClick={handleFavoriteClick}>
          {isFavorite ? 'Remove Favorite' : 'Favorite'}
        </button>
      </div>
    </div>
  );
};

export default ImageCard;