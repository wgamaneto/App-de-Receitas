import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RecipeContext from './RecipeContext';

// const alert = 'Sorry, we haven\'t found any recipes for these filters.';
function RecipeProvider({ children }) {
  const history = useHistory();
  const [personalData, setPersonalData] = useState({
    email: '',
    password: '',
  });

  const [handleAPIReturn, setHandleAPIReturn] = useState([]);
  // const [disable, setDisable] = useState({
  //   isDisabled: false,
  // });

  const testRoute = () => {
    if (history.location.pathname === '/meals') {
      return '';
    }
    if (history.location.pathname === '/drinks') {
      return '';
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setPersonalData({ ...personalData, [name]: value });
  }; // JAMAIS SERA RESOLVIDO!

  const [filterValue, setFilterValue] = useState({});
  const [filterType, setFilterType] = useState({});
  const [mealsData, setMealsData] = useState([]);
  const [drinkData, setDrinkData] = useState([]);
  const [toRender, setToRender] = useState([]);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [isToggled, setIsToggled] = useState(false);
  const [categories, setCategories] = useState([]);
  const [searchedRecipes, setSearchedRecipes] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(testRoute());

  const mealsByIngredients = async (filter) => fetch(
    `${'https://www.themealdb.com/api/json/v1/1/filter.php?i='}${filter}`,
  ).then((response) => response.json());

  const mealsByName = async (name) => fetch(
    `${'https://www.themealdb.com/api/json/v1/1/search.php?s='}${name}`,
  ).then((response) => response.json());

  const mealsByletter = async (letter) => fetch(
    `${'https://www.themealdb.com/api/json/v1/1/search.php?f='}${letter}`,
  ).then((response) => response.json());

  const fetchMeals = async ({ filter }) => {
    if (filterType.filter === 'name') {
      const byName = await mealsByName(filter);
      if (byName.meals === null) {
        global.alert(alertNull);
      }
      // console.log('aconteci');
      setMealsData(byName);
      console.log(byName);
    }
    switch (filterType.filter) {
    case 'ingredients': {
      const byIngredients = await mealsByIngredients(filter);
      if (byIngredients.meals === null) {
        global.alert(alertNull);
      } else {
        setMealsData([
          ...byIngredients.meals,
        ]);
      }
      break;
    }
    case 'firstLetter': {
      if (filter.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        const byLetter = await mealsByletter(filter);
        if (byLetter.meals === null) {
          global.alert(alertNull);
        } else {
          setMealsData([
            ...byLetter.meals,
          ]);
        }
      }
      break;
    }
    default: {
      return 'null';
    }
    }
  };

  const drinksByIngrdients = async (filter) => fetch(
    `${'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i='}${filter}`,
  ).then((response) => response.json());

  const drinksByName = async (filter2) => fetch(
    `${'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i='}${filter2}`,
  ).then((response) => response.json());

  const fetchDrinks = async ({ filter }) => {
    switch (filterType.filter) {
    case 'ingredients': {
      const byIngredients = await drinksByIngrdients(filter);
      if (byIngredients) {
        setDrinkData([
          ...byIngredients.drinks,
        ]);
      }
      break;
    }
    case 'name': {
      const byName = await drinksByName(filter);
      if (byName.drinks === null) {
        global.alert(alertNull);
      }
      if (byName.drinks) {
        setDrinkData([
          ...byName.drinks,
        ]);
      }
      break;
    }
    case 'firstLetter': {
      if (filter.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        const byLetter = await fetchDrinksByFistLetter(filter);
        if (byLetter.drinks === null) {
          global.alert(alertNull);
        } else {
          setDrinkData([
            ...byLetter.drinks,
          ]);
        }
      }
      break;
    }
    default: {
      return 'null';
    }
    }
  };

  const contextValue = useMemo(() => ({
    filterValue,
    setFilterValue,
    filterType,
    setFilterType,
    mealsData,
    setMealsData,
    drinkData,
    setDrinkData,
    toRender,
    setToRender,
    doneRecipes,
    setDoneRecipes,
    handleChange,
    personalData,
    handleAPIReturn,
    setHandleAPIReturn,
    isToggled,
    setIsToggled,
    categories,
    setCategories,
    searchedRecipes,
    setSearchedRecipes,
    selectedCategory,
    setSelectedCategory,
    fetchMeals,
    fetchDrinks,
  }), [filterValue, filterType, mealsData, drinkData, toRender,
    doneRecipes, handleChange, personalData, handleAPIReturn,
    isToggled, categories, searchedRecipes, selectedCategory, fetchMeals, fetchDrinks]);

  return (
    <RecipeContext.Provider value={ contextValue }>
      {children}
    </RecipeContext.Provider>
  );
}

RecipeProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default RecipeProvider;
