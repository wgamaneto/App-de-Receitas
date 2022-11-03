import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipeProvider from '../context/RecipeProvider';

import unfavoriteIcon from '../images/whiteHeartIcon.svg';
import favoriteIcon from '../images/blackHeartIcon.svg';

function FavoriteButton({ recipe, teste }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { favoriteRecipes, setFavoriteRecipes } = useContext(RecipeProvider);

  const type = recipe.idMeal ? 'meals' : 'drinks';
  const magicNumber = -1;
  const recipeId = recipe.idMeal || recipe.idDrink;

  const favoriteRecipe = recipe.id ? { ...recipe } : {
    id: recipeId,
    type: type.slice(0, magicNumber),
    nationality: recipe?.strArea ? recipe.strArea : '',
    category: recipe?.strCategory ? recipe.strCategory : '',
    alcoholicOrNot: recipe?.strAlcoholic ? recipe.strAlcoholic : '',
    name: recipe?.strMeal ? recipe.strMeal : recipe.strDrink,
    image: recipe?.strMealThumb ? recipe.strMealThumb : recipe.strDrinkThumb,
  };

  const favorite = () => {
    if (isFavorite) {
      setFavoriteRecipes(setFavoriteRecipes(favoriteRecipe));
      setIsFavorite(false);
    } else {
      setFavoriteRecipes(setFavoriteRecipes(favoriteRecipe));
      setIsFavorite(true);
    }
  };

  useEffect(() => {
    const isFavoriteRecipe = favoriteRecipes.some(
      ({ id }) => id === recipeId || recipe.id,
    );
    setIsFavorite(isFavoriteRecipe);
  }, [favoriteRecipes, recipe, recipeId]);

  return (
    <button type="button">
      <img
        data-teste={ teste }
        src={ isFavorite ? favoriteIcon : unfavoriteIcon }
        alt="favorite"
        onClick={ () => favorite() }
        aria-hidden="true"
      />
    </button>
  );
}

FavoriteButton.propTypes = {
  recipe: PropTypes.shape().isRequired,
  teste: PropTypes.string,
};

FavoriteButton.defaultProps = {
  teste: 'favorite-btn',
};

export default FavoriteButton;
