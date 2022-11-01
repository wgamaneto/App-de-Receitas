import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import FavoriteButton from '../components/FavoriteButton';
import Header from '../components/Header';
import RecipeProvider from '../context/RecipeContext';
import shareIcon from '../images/shareIcon.svg';

const clip = require('clipboard-copy');

function FavoriteRecipes() {
  const { favoriteRecipes } = useContext(RecipeProvider);
  const [copied, setCopied] = useState(false);
  const [filteredFavRecipes, setFilteredFavRecipes] = useState(favoriteRecipes);
  const [filter, setFilter] = useState();

  useEffect(() => {
    const recipes = favoriteRecipes.filter(
      (recipe) => !filter || recipe.type === filter,
    );
    setFilteredFavRecipes(recipes);
  }, [favoriteRecipes, filter]);

  return (
    <div>
      <Header page="Favorite Recipes" search={ false } />
      <div className="content">
        <button
          data-testid="filter-by-all-btn"
          type="button"
          name="all"
          onClick={ () => setFilter() }
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          type="button"
          onClick={ () => setFilter('meal') }
        >
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ () => setFilter('drink') }
        >
          Drinks
        </button>
        {filteredFavRecipes.map((recipe, index) => (
          <div key={ index }>
            <Link
              to={ `/${recipe.type}s/${recipe.id}` }
            >
              <img
                data-testid={ `${index}-horizontal-image` }
                className="recipe-card-img"
                alt="Recipe"
                src={ recipe.image }
              />
              <span
                data-testid={ `${index}-horizontal-name` }
              >
                {recipe.name}
              </span>
            </Link>
            <span
              data-testid={ `${index}-horizontal-top-text` }
            >
              {recipe.nationality}
              {recipe.alcoholicOrNot}
              {recipe.category}
            </span>
            {copied && <span>Link copied!</span>}
            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              onClick={ () => {
                const url = `http://localhost:3000/${recipe.type}s/${recipe.id}`;
                clip(url);
                setCopied(true);
              } }
            >
              Compartilhar
            </button>
            <FavoriteButton
              testId={ `${index}-horizontal-favorite-btn` }
              recipe={ recipe }
            />
            { recipe.tags?.length && recipe.tags.map((tag) => (
              <span
                key={ tag }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                {tag}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
export default FavoriteRecipes;
