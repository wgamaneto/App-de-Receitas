import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from './RecipeContext';

// const alert = 'Sorry, we haven\'t found any recipes for these filters.';
function RecipeProvider({ children }) {
  const [personalData, setPersonalData] = useState({
    email: '',
    password: '',
  });

  const [handleAPIReturn, setHandleAPIReturn] = useState([]);
  // const [disable, setDisable] = useState({
  //   isDisabled: false,
  // });

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
  }), [filterValue, filterType, mealsData, drinkData,
    toRender, doneRecipes, personalData, handleChange,
    handleAPIReturn,
    setHandleAPIReturn, searchedRecipes,
    isToggled, setIsToggled, categories, setCategories]);

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
