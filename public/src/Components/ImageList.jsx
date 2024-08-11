// ImageList.jsx
import React from 'react';
import ImageCard from './ImageCard';

const ImageList = ({ images, lastImageRef, removeFromFavorites }) => {
  return (
    <div className="image-grid">
      {images.map((image, index) => (
        <ImageCard
          key={image.id}
          image={image}
          lastImageRef={index === images.length - 1 ? lastImageRef : null}
          removeFromFavorites={removeFromFavorites}
        />
      ))}
    </div>
  );
};

export default ImageList;