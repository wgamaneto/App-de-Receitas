import React, { useState, useContext, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';

export default function Filters() {
  const history = useHistory();
  const { isToggled, setIsToggled } = useContext(RecipeContext);
  const { categories, setCategories } = useContext(RecipeContext);

  const testRoute = () => {
    if (history.location.pathname === '/meals') {
      return 'Beef';
    }
    if (history.location.pathname === '/drinks') {
      return 'Ordinary Drink';
    }
  };
  const [selectedCategory, setSelectedCategory] = useState(testRoute());

  const fetchCategoriesMeals = useCallback(async () => {
    const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
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
    <>
      <label htmlFor="toogle">
        Botao Toogle
        <input
          id="toogle"
          type="checkbox"
          checked={ isToggled }
          onChange={ () => setIsToggled(!isToggled) }
        />
      </label>
      <label htmlFor="categories">
        <select
          id="categories"
          name="categories"
          value={ selectedCategory }
          onChange={ (e) => setSelectedCategory(e.target.value) }
        >
          {
            categories.length && categories.map((e, i) => (
              <option
                key={ i }
                value={ e.strCategory }
                data-testid={ `${e.strCategory}-category-filter` }
              >
                {e.strCategory}
              </option>))
          }
        </select>
      </label>
    </>
  );
}
