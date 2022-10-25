import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import RecipeContext from '../context/RecipeContext';

function Recipes() {
  const history = useHistory();
  const { handleAPIReturn, setHandleAPIReturn } = useContext(RecipeContext);
  const fetchMeals = async () => {
    const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const data = await fetch(URL);
    const response = await data.json();
    const magic12 = 12;
    const dataFiltered = await response.meals.slice(0, magic12);
    return dataFiltered;
  };
  const fetchDrinks = async () => {
    const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const data = await fetch(URL);
    const response = await data.json();
    const magic12 = 12;
    const dataFiltered = await response.drinks.slice(0, magic12);
    return dataFiltered;
  };
  useEffect(() => {
    if (history.location.pathname === '/meals') {
      setHandleAPIReturn(fetchMeals());
    } else if (history.location.pathname === '/drinks') {
      setHandleAPIReturn(fetchDrinks());
    }
  }, [history.location.pathname, setHandleAPIReturn]);

  return (
    <div>
      <div>
        <button
          type="button"
          onClick={ console.log(handleAPIReturn) }
        >
          ALOU ALOU, MARCIANO
        </button>
      </div>
    </div>
  );
}

export default Recipes;
