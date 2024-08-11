import React, { useState, useEffect, createContext, useContext } from 'react';

const RouterContext = createContext();

const useCustomRouter = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  return { currentPath, navigate };
};

const CustomRouter = ({ children }) => {
  const { currentPath, navigate } = useCustomRouter();

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

const Route = ({ path, children }) => {
  const { currentPath } = useContext(RouterContext);
  return currentPath === path ? children : null;
};

const Link = ({ to, children }) => {
  const { navigate } = useContext(RouterContext);

  const handleClick = (event) => {
    event.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
};

export { CustomRouter, Route, Link };
