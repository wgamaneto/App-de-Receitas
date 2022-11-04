import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import RecipeContext from '../context/RecipeContext';
import '../styles/searchbar.css';

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
    } else if (filterType.filter === 'name') {
      urlFinal = `${urlBase}search.php?s=${filterValue.typedSearch}`;
    } else if (filterType.filter === 'firstLetter') {
      urlFinal = `${urlBase}search.php?f=${filterValue.typedSearch}`;
    }
    const { typedSearch } = filterValue;
    if (filterType.filter === 'firstLetter' && typedSearch.length !== 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
    const data = await fetch(urlFinal);
    const response = await data.json();
    if (response.drinks === null) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    if (response.meals === null) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    setDrinkData(response.drinks);
    setMealsData(response.meals);
  };

  const handleRadio = ({ target: { value } }) => {
    setFilterType({ filter: value });
  };

  const filterHandleChange = ({ target: { value } }) => {
    setFilterValue({ typedSearch: value });
  };

  return (
    <div>
      ingredient:
      <input
        className="search-input"
        data-testid="ingredient-search-radio"
        type="radio"
        name="filter"
        id="ingredients"
        value="ingredients"
        onChange={ handleRadio }
      />
      name:
      <input
        className="search-input"
        data-testid="name-search-radio"
        type="radio"
        name="filter"
        id="name"
        value="name"
        onChange={ handleRadio }
      />
      first letter:
      <input
        className="search-input"
        data-testid="first-letter-search-radio"
        type="radio"
        name="filter"
        id="first-letter"
        value="firstLetter"
        onChange={ handleRadio }
      />
      <input
        className="text-input"
        data-testid="search-input"
        type="text"
        id="searchInput"
        onChange={ filterHandleChange }
      />
      <button
        className="search-button"
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
