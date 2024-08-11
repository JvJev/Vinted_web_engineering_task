// ImageCard.test.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import assert from 'assert';
import ImageCard from './ImageCard';
import { FavoritesContext } from '../Context/FavoritesContext';

// Mock the IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

let container = null;
let root = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => {
    root.unmount();
  });
  container.remove();
  container = null;
  root = null;
});

const mockImage = {
  id: '1',
  title: 'Test Image',
  src: 'test-image.jpg',
};

describe('ImageCard', () => {
  it('renders image with correct alt text', () => {
    act(() => {
      root.render(
        <FavoritesContext.Provider value={{ favoritePhotos: [], addToFavorites: () => {}, removeFromFavorites: () => {} }}>
          <ImageCard image={mockImage} />
        </FavoritesContext.Provider>
      );
    });

    const imageElement = container.querySelector('img');
    assert.strictEqual(imageElement.alt, 'Test Image');
  });

  it('displays the image title', () => {
    act(() => {
      root.render(
        <FavoritesContext.Provider value={{ favoritePhotos: [], addToFavorites: () => {}, removeFromFavorites: () => {} }}>
          <ImageCard image={mockImage} />
        </FavoritesContext.Provider>
      );
    });

    const titleElement = container.querySelector('.card-title');
    assert.strictEqual(titleElement.textContent, 'Test Image');
  });

  // Add more test cases as needed
});