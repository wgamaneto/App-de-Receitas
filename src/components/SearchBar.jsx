import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import RecipeContext from '../context/RecipeContext';

function SearchBar() {
  const history = useHistory();

  const {
    filterValue,
    filterType,
    setFilterValue,
    setFilterType,
    setMealsData,
    setDrinkData,
    // mealsAPI, // fetchMeals
    // drinksAPI, // fetchDrinks
  } = useContext(RecipeContext);

  // const checkQuantity = () => {
  //   if (filterValue[typedSearch].length > 1) {
  //     return (global.alert('Your search must have only 1 (one) character'));
  //   }
  // };

  const checkUrl = () => {
    if (history.location.pathname.includes('drink')) {
      return ('https://www.thecocktaildb.com/api/json/v1/1/');
    } if (history.location.pathname.includes('meals')) {
      return ('https://www.themealdb.com/api/json/v1/1/');
    }
  };

  const handleCLick = async () => {
    const urlBase = checkUrl();
    let urlFinal = '';
    if (filterType.filter === 'ingredients') {
      urlFinal = `${urlBase}filter.php?i=${filterValue.typedSearch}`;
      console.log(urlFinal);
    } else if (filterType.filter === 'name') {
      urlFinal = `${urlBase}search.php?s=${filterValue.typedSearch}`;
      console.log(urlFinal);
    } else if (filterType.filter === 'firstLetter') {
      urlFinal = `${urlBase}search.php?f=${filterValue.typedSearch}`;
      console.log(urlFinal);
    }
    const { typedSearch } = filterValue;
    if (filterType.filter === 'firstLetter' && typedSearch.length !== 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
    const data = await fetch(urlFinal);
    const response = await data.json();
    console.log(response);
    setMealsData(response.meals);
    setDrinkData(response.drinks);
  };

  const handleRadio = ({ target: { value } }) => {
    setFilterType({ filter: value });
    console.log(filterValue);
    console.log(filterType);
  };

  const filterHandleChange = ({ target: { value } }) => {
    setFilterValue({ typedSearch: value });
  };

  return (
    <div>
      ingredient:
      <input
        data-testid="ingredient-search-radio"
        type="radio"
        name="filter"
        id="ingredients"
        value="ingredients"
        onChange={ handleRadio }
      />
      name:
      <input
        data-testid="name-search-radio"
        type="radio"
        name="filter"
        id="name"
        value="name"
        onChange={ handleRadio }
      />
      first letter:
      <input
        data-testid="first-letter-search-radio"
        type="radio"
        name="filter"
        id="first-letter"
        value="firstLetter"
        onChange={ handleRadio }
      />
      <input
        data-testid="search-input"
        type="text"
        id="searchInput"
        onChange={ filterHandleChange }
      />
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ handleCLick }
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
