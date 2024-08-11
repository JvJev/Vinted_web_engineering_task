// App.jsx
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { FavoritesProvider } from './Context/FavoritesContext';
import './App.css';

const MainPage = lazy(() => import('./Pages/MainPage'));
const FavoritePhotos = lazy(() => import('./Pages/FavoritePhotos'));

const Loading = () => <div>Loading...</div>;

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', onLocationChange);

    return () => {
      window.removeEventListener('popstate', onLocationChange);
    };
  }, []);

  const navigate = (to) => {
    window.history.pushState({}, '', to);
    setCurrentPath(to);
  };

  return (
    <FavoritesProvider>
      <div>
        <header>
          <nav>
            <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Home</a>
            <a href="/favorites" onClick={(e) => { e.preventDefault(); navigate('/favorites'); }}>Favorites</a>
          </nav>
        </header>
        <Suspense fallback={<Loading />}>
          <main>
            {currentPath === '/' && <MainPage />}
            {currentPath === '/favorites' && <FavoritePhotos />}
          </main>
        </Suspense>
      </div>
    </FavoritesProvider>
  );
}

export default App;