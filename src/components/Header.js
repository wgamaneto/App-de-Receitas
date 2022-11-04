import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import SearchBar from './SearchBar';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import '../styles/header.css';

function Header() {
  const history = useHistory();
  const [hidden, setHidden] = useState(true);

  const path = () => {
    switch (history.location.pathname) {
    case '/meals':
      return (<h1 className="header-title" data-testid="page-title">Meals</h1>);
    case '/drinks':
      return (<h1 className="header-title" data-testid="page-title">Drinks</h1>);
    case '/profile':
      return (<h1 className="header-title" data-testid="page-title">Profile</h1>);
    case '/done-recipes':
      return (<h1 className="header-title" data-testid="page-title"> Done Recipes </h1>);
    case '/favorite-recipes':
      return <h1 className="header-title" data-testid="page-title">Favorite Recipes</h1>;
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
        <div>
          <Link
            to={ history.location.pathname }
            data-testid="search-top-btn"
            src={ searchIcon }
            onClick={ () => setHidden(!hidden) }
            className="header-button"
          >
            <img className="search-icon" src={ searchIcon } alt="profile" />
          </Link>
        </div>
      );
    }
  };
  return (
    <div className="header-container">
      <header>
        { path() }
        <div className="buttons-div">
          { pathRender() }
          {!hidden && <SearchBar />}
          <Link
            data-testid="profile-top-btn"
            to="/profile"
            src={ profileIcon }
          >
            <img src={ profileIcon } alt="profile" />
          </Link>
        </div>
      </header>
    </div>
  );
}

export default Header;
