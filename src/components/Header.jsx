import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import SearchBar from './SearchBar';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';

function Header() {
  const history = useHistory();
  const [hidden, setHidden] = useState(true);

  const path = () => {
    switch (history.location.pathname) {
    case '/Meals':
      return (<h1 data-testid="page-title">Meals</h1>);
    case '/drinks':
      return (<h1 data-testid="page-title">Drinks</h1>);
    case '/profile':
      return (<h1 data-testid="page-title">Profile</h1>);
    case '/done-recipes':
      return (<h1 data-testid="page-title"> Done Recipes </h1>);
    case '/favorite-recipes':
      return (<h1 data-testid="page-title">Favorite Recipes</h1>);
    default: (
      <h1>Recipes</h1>);
    }
  };

  const pathRender = () => {
    switch (history.location.pathname) {
    case '/profile':
      return ('');
    case '/favorite-recipes':
      return ('');
    case '/done-recipes':
      return ('');
    default:
      return (
        <Link
          to={ history.location.pathname }
          data-testid="search-top-btn"
          src={ searchIcon }
          onClick={ () => setHidden(!hidden) }
        >
          <img src={ searchIcon } alt="profile" />
        </Link>
      );
    }
  };
  return (
    <header>
      { path() }
      { pathRender() }
      {!hidden && <SearchBar />}
      <Link
        data-testid="profile-top-btn"
        to="/profile"
        src={ profileIcon }
      >
        <img src={ profileIcon } alt="profile" />
      </Link>
    </header>
  );
}

export default Header;
