import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RecipeContext from './RecipeContext';

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
  }), [filterValue, filterType, mealsData, drinkData,
    toRender, doneRecipes, personalData, handleChange,
    handleAPIReturn,
    setHandleAPIReturn, searchedRecipes,
    isToggled, setIsToggled, categories, setCategories,
    selectedCategory, setSelectedCategory]);

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
