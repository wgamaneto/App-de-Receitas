import React, { useEffect, useContext, useCallback } from 'react';
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
    const dataFiltered = response.meals.slice(0, magic12);
    return dataFiltered;
  };
  const fetchDrinks = useCallback(async () => {
    const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const data = await fetch(URL);
    const response = await data.json();
    const magic12 = 12;
    const dataFiltered = response.drinks.slice(0, magic12);
    return dataFiltered;
  }, []);
  useEffect(() => {
    (async () => {
      if (history.location.pathname === '/meals') {
        const data = await fetchMeals();
        setHandleAPIReturn(data);
      } else if (history.location.pathname === '/drinks') {
        const data2 = await fetchDrinks();
        setHandleAPIReturn(data2);
      }
    })();
  }, [history.location.pathname, setHandleAPIReturn, fetchDrinks]);

  return (
    <div className="recipe-conteiner">
      { handleAPIReturn.map((recipe, index) => (
        <div
          data-testid={ `${index}-recipe-card` }
          key={ index }
        >
          { history.location.pathname === '/meals' ? (<img
            src={ recipe.strMealThumb }
            data-testid={ `${index}-card-img` }
            alt="recipe"
            width={ 100 }
          />)
            : (
              <img
                src={ recipe.strDrinkThumb }
                data-testid={ `${index}-card-img` }
                alt="recipe"
                width={ 100 }
              />) }
          <h3 data-testid={ `${index}-card-name` }>{recipe.strMeal}</h3>
          <h3 data-testid={ `${index}-card-name` }>{recipe.strDrink}</h3>
        </div>
      )) }
    </div>
  );
}

export default Recipes;
