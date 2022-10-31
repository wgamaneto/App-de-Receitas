/* import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import RecipeContext from '../context/RecipeContext';
import Toggle from './Toggle';

function Recipes() {
  const history = useHistory();
  const { selectedCategory } = useContext(RecipeContext);
  const { handleAPIReturn, setHandleAPIReturn } = useContext(RecipeContext);
  const { isToggled, setIsToggled } = useContext(RecipeContext);
  const fetchMeals = async () => {
    if (isToggled === true) {
      const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;
      const data = await fetch(URL);
      const response = await data.json();
      setIsToggled(!isToggled);
      const magic12 = 5;
      const filtered = await response.meals.slice(0, magic12);
      return filtered;
    }
    if (isToggled === false); {
      const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const data = await fetch(URL);
      const response = await data.json();
      setIsToggled(!isToggled);
      const magic12 = 12;
      const filtered = await response.meals.slice(0, magic12);
      return filtered;
    }
  };

  const fetchDrinks = async () => {
    const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const data = await fetch(URL);
    const response = await data.json();
    const magic12 = 12;
    const toggled = async () => {
      if (isToggled === true) {
        const filtered = await response.drinks
          .filter((drink) => drink.strCategory === selectedCategory);
        return filtered;
      }
      if (isToggled === false) {
        const filtered = await response.drinks.slice(0, magic12);
        return filtered;
      }
    };
    const responseFiltered = await toggled();
    return responseFiltered;
  };

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
  }, [history.location.pathname, setHandleAPIReturn, selectedCategory,
    fetchMeals, fetchDrinks]);

  return (
    <div className="recipe-conteiner">
      <Toggle />
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

// test */
