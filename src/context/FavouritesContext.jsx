import { createContext, useContext, useState, useEffect } from 'react';

const FavouritesContext = createContext();

export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState(() => {
    const saved = localStorage.getItem('valore_favourites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('valore_favourites', JSON.stringify(favourites));
  }, [favourites]);

  const addToFavourites = (product) => {
    setFavourites(prev => 
      prev.find(p => p.id === product.id)
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product]
    );
  };

  const isFavourite = (id) => favourites.some(p => p.id === id);

  return (
    <FavouritesContext.Provider value={{ favourites, addToFavourites, isFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => useContext(FavouritesContext);
