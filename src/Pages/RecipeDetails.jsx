import clipboardCopy from 'clipboard-copy';
import React, { useEffect, useContext, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import shareIcon from '../images/shareIcon.svg';
import { fetchRecipe, fetchSugestion } from '../services/RequestAPI';
import blackHeartIcon from '../images/blackHeartIcon.svg';
// import FavoriteButton from '../components/FavoriteButton';
import '../styles/details.css';

function RecipeDetails() {
  const { setRecipeDetails, recipeDetails, ingredients, measure,
    setIngredients, setMeasure, setRecipeSugestion, // favoriteRecipes, setFavoriteRecipes,
  } = useContext(RecipeContext);
  const [isMessage, setIsMessage] = useState(false);
  const history = useHistory();
  const { id } = useParams();
  const recipeId = history.location.pathname.replace(/\D/g, '');
  const bars = history.location.pathname.split('/');
  const path = bars[1];

  useEffect(() => {
    fetchRecipe(history.location.pathname, id, setRecipeDetails);
    const ingRecipe = [];
    const measureRecipe = [];
    Object.keys(recipeDetails).forEach((ing) => {
      if (ing.includes('strIngredient')
        && recipeDetails[ing] !== null && recipeDetails[ing] !== '') {
        ingRecipe.push(recipeDetails[ing]);
      }
    });
    setIngredients(ingRecipe);

    Object.keys(recipeDetails).forEach((ing) => {
      if (ing.includes('strMeasure')
        && recipeDetails[ing] !== null && recipeDetails[ing] !== ' ') {
        measureRecipe.push(recipeDetails[ing]);
      }
    });
    setMeasure(measureRecipe);

    fetchSugestion(history.location.pathname, setRecipeSugestion);
  }, [history.location.pathname, id, recipeDetails,
    setIngredients, setMeasure, setRecipeDetails, setRecipeSugestion]);

  const shareRecipe = () => {
    clipboardCopy(window.location.href);
    setIsMessage(true);
    // localStorage.setItem('favoriteRecipes', );
  };

  const pushToDoneRecipes = () => {
    history.push(`${history.location.pathname}/in-progress`);
  };

  // const opa = () => {

  // };

  return (
    <section>
      { history.location.pathname.includes('meals') // Photo
        ? (
          <img
            className="details-image"
            src={ recipeDetails.strMealThumb }
            alt="Meal"
            data-testid="recipe-photo"
            width="300px"
          />
        )
        : (
          <img
            className="details-image"
            src={ recipeDetails.strDrinkThumb }
            alt="Drink"
            data-testid="recipe-photo"
            width="300px"
          />
        )}
      <div className="details-info">
        { history.location.pathname.includes('meals') // Title
          ? (
            <h2
              className="details-title"
              data-testid="recipe-title"
            >
              {recipeDetails.strMeal}

            </h2>
          )
          : (
            <h2
              className="details-title"
              data-testid="recipe-title"
            >
              {recipeDetails.strDrink}

            </h2>
          )}

        { history.location.pathname.includes('meals') //  Category
          ? (
            <h3
              className="details-category"
              data-testid="recipe-category"
            >
              {recipeDetails.strCategory}

            </h3>
          )
          : (
            <>
              <h3
                className="details-category"
                data-testid="recipe-category"
              >
                {recipeDetails.strCategory}

              </h3>
              <h3
                className="details-category"
                data-testid="recipe-category"
              >
                {recipeDetails.strAlcoholic}

              </h3>
            </>
          )}

        <ul>
          Ingredients
          { ingredients.map((ingredient, index) => (
            <li
              className="details-list-element"
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {`${ingredient} ${measure[index]}` }
            </li>
          ))}
        </ul>
        {/* <FavoriteButton /> */}
        { history.location.pathname.includes('meals') // Recipe Video
          ? (
            <iframe
              title={ recipeDetails.strMeal }
              width="420"
              height="315"
              src={ recipeDetails.strYoutube }
              data-testid="video"
            />

          )
          : (
            null
          )}

        <p data-testid="instructions">{recipeDetails.strInstructions}</p>
      </div>
      <div className="buttons-container">
        <button
          className="details-button"
          type="button"
          name="share-btn"
          data-testid="share-btn"
          onClick={ shareRecipe }
        >
          <img src={ shareIcon } alt="Share Recipe" />
        </button>
        <button
          className="details-button"
          type="button"
          name="favorite-btn"
          data-testid="favorite-btn"
          onClick={ shareRecipe }
        >
          <img
            src={ blackHeartIcon }
            alt="favoritar"
          />
        </button>
      </div>
      { isMessage ? <p>Link copied!</p> : null }

      <button
        type="button"
        name="start-btn"
        data-testid="start-recipe-btn"
        className="fixed-bottom"
        onClick={ pushToDoneRecipes }
      >
        Start Recipe
      </button>
    </section>
  );
}

export default RecipeDetails;
