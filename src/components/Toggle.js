import React, { useContext, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';

export default function Filters() {
  const history = useHistory();
  const { categories, setCategories } = useContext(RecipeContext);
  const { setSelectedCategory } = useContext(RecipeContext);

  const fetchCategoriesMeals = useCallback(async () => {
    const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=$';
    const data = await fetch(URL);
    const response = await data.json();
    const magicNumber = 5;
    const responseFiltered = response.meals.slice(0, magicNumber);
    return responseFiltered;
  }, []);

  const fetchCategoriesDrinks = useCallback(async () => {
    const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    const data = await fetch(URL);
    const response = await data.json();
    const magicNumber = 5;
    const responseFiltered = response.drinks.slice(0, magicNumber);
    return responseFiltered;
  }, []);

  useEffect(() => {
    (async () => {
      if (history.location.pathname === '/meals') {
        const data = await fetchCategoriesMeals();
        setCategories(data);
      } else if (history.location.pathname === '/drinks') {
        const data2 = await fetchCategoriesDrinks();
        setCategories(data2);
      }
    })();
  }, [history.location.pathname, fetchCategoriesMeals,
    setCategories, fetchCategoriesDrinks]);

  return (

    <label htmlFor="categories">

      {
        categories.length && categories.map((e, i) => (
          <button
            key={ i }
            type="button"
            value={ e.strCategory }
            onClick={ () => setSelectedCategory(e.strCategory) }
            data-testid={ `${e.strCategory}-category-filter` }
          >
            {e.strCategory}
          </button>))
      }

    </label>

  );
}
