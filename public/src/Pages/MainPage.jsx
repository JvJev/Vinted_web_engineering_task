import React, { useState, useEffect, useRef, useCallback } from 'react';
import ImageList from '../Components/ImageList';
import { useFlickrApi } from '../hooks/useFlickrApi';
import '../App.css';

const IMAGES_PER_PAGE = 20;

function MainPage() {
  const [images, setImages] = useState(() => {
    return JSON.parse(localStorage.getItem('mainPageImages')) || [];
  });
  const [page, setPage] = useState(() => {
    return parseInt(localStorage.getItem('mainPageCurrentPage')) || 1;
  });
  const [hasMore, setHasMore] = useState(true);
  const { callApi, isLoading, error } = useFlickrApi();
  const observer = useRef();
  const lastImageRef = useRef();

  const fetchImages = useCallback(async () => {
    if (isLoading || !hasMore) return;
    
    try {
      const response = await callApi('flickr.photos.search', {
        per_page: IMAGES_PER_PAGE,
        page: page,
        tags: 'nature,landscape',
        sort: 'relevance',
        extras: 'owner_name,url_n,url_z,url_c'
      });

      const newImages = response.photos.photo.map(photo => ({
        id: photo.id,
        title: photo.title,
        ownername: photo.owner,
        src: photo.url_z || photo.url_c || photo.url_n,
        srcSet: `${photo.url_n} 320w, ${photo.url_z} 640w, ${photo.url_c} 800w`,
      }));

      setImages(prevImages => {
        const uniqueNewImages = newImages.filter(
          newImg => !prevImages.some(prevImg => prevImg.id === newImg.id)
        );
        const updatedImages = [...prevImages, ...uniqueNewImages];
        localStorage.setItem('mainPageImages', JSON.stringify(updatedImages));
        return updatedImages;
      });

      setPage(prevPage => {
        const nextPage = prevPage + 1;
        localStorage.setItem('mainPageCurrentPage', nextPage.toString());
        return nextPage;
      });
      setHasMore(page < response.photos.pages);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  }, [page, isLoading, hasMore, callApi]);

  useEffect(() => {
    if (images.length === 0) {
      fetchImages();
    }
  }, [images, fetchImages]);

  useEffect(() => {
    const currentObserver = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          fetchImages();
        }
      },
      { threshold: 1 }
    );

    if (lastImageRef.current) {
      currentObserver.observe(lastImageRef.current);
    }

    return () => {
      if (currentObserver) {
        currentObserver.disconnect();
      }
    };
  }, [lastImageRef, hasMore, isLoading, fetchImages]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="mainPage">
      <ImageList images={images} lastImageRef={lastImageRef} />
      {isLoading && <div>Loading...</div>}
      {!hasMore && <div>No more images to load</div>}
    </div>
  );
}

export default MainPage;