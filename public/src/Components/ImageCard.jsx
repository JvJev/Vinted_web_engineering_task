import React, { useState, useEffect, useRef } from 'react';
import '../App.css';

const ImageCard = ({ image, lastImageRef, removeFromFavorites }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const favoritePhotos = JSON.parse(localStorage.getItem('favoritePhotos')) || {};
    setIsFavorite(favoritePhotos[image.id] || false);
  }, [image.id]);

  useEffect(() => {
    if (imgRef.current && !isLoaded) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            imgRef.current.src = image.src;
            setIsLoaded(true);
            observer.unobserve(imgRef.current);
          }
        },
        { rootMargin: '100px' }
      );
      observer.observe(imgRef.current);
      return () => observer.disconnect();
    }
  }, [image.src, isLoaded]);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

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
    <div
      className={`image-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={lastImageRef}
    >
      <img
        ref={imgRef}
        className="card-image"
        alt={image.title}
        src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        data-src={image.src}
        srcSet={image.srcSet}
        sizes="(max-width: 320px) 280px, (max-width: 640px) 600px, 800px"
        loading="lazy"
      />
      <div className={`card-body ${isHovered ? 'visible' : 'invisible'}`}>
        <div className="card-title">{image.title}</div>
        <div className="card-author">by {image.owner}</div>
        <hr className="card-divider" />
        <button className="favorite-button" onClick={handleFavoriteClick}>
          {isFavorite ? 'Remove Favorite' : 'Favorite'}
        </button>
      </div>
    </div>
  );
};

export default ImageCard;