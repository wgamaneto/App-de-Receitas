import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from './RecipeContext';

function RecipeProvider({ children }) {
  const [personalData, setPersonalData] = useState({
    email: '',
    password: '',
  });

  const [handleAPIReturn, setHandleAPIReturn] = useState([]);
  console.log(handleAPIReturn);

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
  }), [filterValue, filterType, mealsData, drinkData,
    toRender, doneRecipes, personalData, handleChange,
    handleAPIReturn, setHandleAPIReturn]);

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
