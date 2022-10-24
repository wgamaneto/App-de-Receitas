import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import RecipeContext from '../context/RecipeContext';

function SearchBar() {
  const history = useHistory();

  const {
    filterValue,
    setFilterType,
    filterHandleChange,
    mealsAPI, // fetchMeals
    drinksAPI, // fetchDrinks
  } = useContext(RecipeContext);

  const handleCLick = () => {
    if (history.location.pathname.includes('drink')) {
      drinksAPI(filterValue);
    } else if (history.location.pathname.includes('meals')) {
      mealsAPI(filterValue);
    }
  };

  const handleRadio = ({ target: { value } }) => {
    setFilterType({ filter: value });
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
