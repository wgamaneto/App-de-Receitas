import React, { useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';

function RecipeDetails() {
  const { setRecipeDetails, recipeDetails, ingredients, measure,
    setIngredients, setMeasure,
  } = useContext(RecipeContext);
  const history = useHistory();
  const { id } = useParams();

  const checkUrl = () => {
    if (history.location.pathname.includes('meals')) {
      return (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    } if (history.location.pathname.includes('drinks')) {
      return (`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(checkUrl());
      const response = await data.json();
      if (history.location.pathname.includes('meals')) {
        setRecipeDetails(response.meals[0]);
      } if (history.location.pathname.includes('drinks')) {
        setRecipeDetails(response.drinks[0]);
      }
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
    }
    fetchData();
  }, [checkUrl, history.location.pathname,
    recipeDetails, setIngredients, setMeasure, setRecipeDetails]);
  return (
    <section>
      <h1>RecipeDetails</h1>
      { history.location.pathname.includes('meals') // Photo
        ? (
          <img
            src={ recipeDetails.strMealThumb }
            alt="Meal"
            data-testid="recipe-photo"
            width="300px"
          />
        )
        : (
          <img
            src={ recipeDetails.strDrinkThumb }
            alt="Drink"
            data-testid="recipe-photo"
            width="300px"
          />
        )}

      { history.location.pathname.includes('meals') // Title
        ? (
          <h2 data-testid="recipe-title">{recipeDetails.strMeal}</h2>
        )
        : (
          <h2 data-testid="recipe-title">{recipeDetails.strDrink}</h2>
        )}

      { history.location.pathname.includes('meals') // Category
        ? (
          <h3 data-testid="recipe-category">{recipeDetails.strCategory}</h3>
        )
        : (
          <>
            <h3 data-testid="recipe-category">{recipeDetails.strCategory}</h3>
            <h3 data-testid="recipe-category">{recipeDetails.strAlcoholic}</h3>
          </>
        )}

      <ul>
        Ingredients
        { ingredients.map((ingredient, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {`${ingredient} ${measure[index]}` }
          </li>
        ))}
      </ul>

      { history.location.pathname.includes('meals') // Recipe - Video
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

    </section>

  );
}

export default RecipeDetails;
