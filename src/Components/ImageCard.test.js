import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import assert from 'assert';
import ImageCard from './ImageCard';
import { FavoritesContext } from '../Context/FavoritesContext';

global.IntersectionObserver = class { observe() {} unobserve() {} disconnect() {} };

let container, root;

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
  container = root = null;
});

const mockImage = { id: '1', title: 'Test Image', src: 'test-image.jpg', ownername: 'Test Owner' };

describe('ImageCard', () => {
  const renderComponent = () => {
    act(() => {
      root.render(
        <FavoritesContext.Provider value={{ favoritePhotos: [], addToFavorites: () => {}, removeFromFavorites: () => {} }}>
          <ImageCard image={mockImage} />
        </FavoritesContext.Provider>
      );
    });
  };

  it('renders image with correct alt text', () => {
    renderComponent();
    const imageElement = container.querySelector('img');
    assert.strictEqual(imageElement.alt, 'Test Image');
  });

  it('displays the image title', () => {
    renderComponent();
    const titleElement = container.querySelector('.card-title');
    assert.strictEqual(titleElement.textContent, 'Test Image');
  });

  it('displays the owner name', () => {
    renderComponent();
    const authorElement = container.querySelector('.card-author');
    assert.strictEqual(authorElement.textContent, 'Test Owner');
  });
});