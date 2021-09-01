import React, { useState, useContext, useEffect } from 'react';
import { useCallback } from 'react';

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('a');
  const [cocktails, setCocktails] = useState([]);

  const fetchDrinks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}${searchTerm}`);
      const data = await response.json();
      const { drinks } = data;

      if (drinks) {
        const newCocktails = drinks.map(drink => {
          const { idDrink, strDrink, strAlcoholic, strGlass, strDrinkThumb } = drink;
          return { id: idDrink, name: strDrink, info: strAlcoholic, glass: strGlass, image: strDrinkThumb };
        });
        setCocktails(newCocktails);
      }
      else setCocktails([]);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchDrinks();
  }, [searchTerm, fetchDrinks]);

  return (
    <AppContext.Provider value={{ loading, cocktails, setSearchTerm }}>
      {children}
    </AppContext.Provider>
  );
};

// make sure use
export const useGlobalContext = () => useContext(AppContext);

export { AppContext, AppProvider };