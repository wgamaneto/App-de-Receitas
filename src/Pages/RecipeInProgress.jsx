import clipboardCopy from 'clipboard-copy';
import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
/* import blackHeartIcon from '../images/blackHeartIcon.svg'; */
import '../styles/details.css';

function RecipeInProgress() {
  const history = useHistory();
  const recipeId = history.location.pathname.replace(/\D/g, '');
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [Ingredients, setIngredients] = useState([]);
  const [Measures, setMeasures] = useState([]);
  const [recipeSteps, setRecipeSteps] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [linkCopied, setLinkCopied] = useState(false);
  const bars = history.location.pathname.split('/');
  const path = bars[1];
  const fetchRecipeDetails = useCallback(async () => {
    if (path === 'meals') {
      const data = await
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
      const res = await data.json();
      setRecipeDetails(res[path]);
    } else {
      const data = await
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
      const res = await data.json();
      setRecipeDetails(res[path]);
    }
  }, [recipeId, path]);
  useEffect(() => {
    fetchRecipeDetails();
  }, [fetchRecipeDetails]);
  const getIngredients = useCallback(async () => {
    if (recipeDetails.length > 0) {
      const entradas = Object.entries(recipeDetails[0]);
      const ingredients = entradas.filter(
        (recipe) => recipe[0].includes(
          'strIngredient',
        ) && (recipe[1] !== null && recipe[1].length > 1),
      );
      const measureIngredie = entradas.filter(
        (recipe) => recipe[0].includes(
          'strMeasure',
        ) && (recipe[1] !== null && recipe[1].length > 1),
      );
      const filterIng = ingredients.map((recipe) => recipe[1]);
      const filterMeasure = measureIngredie.map((recipe) => recipe[1]);
      setIngredients(filterIng);
      setMeasures(filterMeasure);
      if (path === 'drinks') {
        setIsAlchoolic(recipeDetails[0].strAlcoholic);
      }
    }
  }, [recipeDetails, path]);
  const initialState = useCallback(() => {
    let local = JSON.parse(localStorage.getItem('inRecipeProgress'));
    if (!local) {
      local = {
        meals: {},
        drinks: {},
      };
    }
    if (local[path][recipeId]) {
      setRecipeSteps(local[path][recipeId]);
    }
  }, [path, recipeId]);
  useEffect(() => {
    getIngredients();
    initialState();
  }, [getIngredients, initialState]);
  useEffect(() => {
    let local = JSON.parse(localStorage.getItem('inRecipeProgress'));
    console.log(local);
    if (!local) {
      local = {
        meals: {},
        drinks: {},
      };
    }
    local[path][recipeId] = recipeSteps;
    localStorage.setItem('inRecipeProgress', JSON.stringify(local));
  }, [recipeSteps, path, recipeId]);
  const validateButton = () => {
    if (recipeSteps.length === Ingredients.length - 1) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };
  const finishRecipe = () => {
    history.push('/done-recipes');
  };
  const saveOnClipBoard = () => {
    clipboardCopy(`http://localhost:3000/${path}/${recipeId}`);
    setLinkCopied(!linkCopied);
  };
  const saveDoneSteps = ({ target }) => {
    const itens = document.getElementsByName(target.id);
    console.log(itens);
    if (target.checked === true) {
      itens[0].className = 'cutted';
      if (recipeSteps.includes(target.id)) {
        const removeBox = recipeSteps.filter((step) => step !== target.id);
        setRecipeSteps(removeBox);
      } else {
        setRecipeSteps([...recipeSteps, target.id]);
      }
    } else if (target.checked === false) {
      itens[0].className = '';
      const removeBox = recipeSteps.filter((recipe) => recipe !== target.id);
      setRecipeSteps(removeBox);
    }
  };
  return (
    <div>
      { path === 'meals'
        && (
          <div>
            {recipeDetails ? (
              recipeDetails.map((recipe) => (
                <div className="details-container" key={ recipe.strMeal }>
                  <img
                    className="details-image"
                    src={ recipe.strMealThumb }
                    alt="Recipe Pic"
                    data-testid="recipe-photo"
                  />
                  <h2
                    className="details-title"
                    data-testid="recipe-title"
                  >
                    {recipe.strMeal}

                  </h2>
                  <h4
                    className="details-category"
                    data-testid="recipe-category"
                  >
                    {recipe.strCategory}
                  </h4>
                  <img
                    className="details-button"
                    src={ whiteHeartIcon }
                    alt="favorite button"
                    onClick={ () => {} }
                    aria-hidden
                    data-testid="favorite-btn"
                  />
                  <img
                    className="details-button"
                    src={ shareIcon }
                    alt="share button"
                    data-testid="share-btn"
                    onClick={ saveOnClipBoard }
                    aria-hidden
                  />
                  {linkCopied && <p>Link copied!</p>}
                  <p data-testid="instructions">{recipe.strInstructions}</p>
                  <form>
                    {Ingredients.map((checkbox, index) => (
                      <div className="recipe-steps" key={ index }>
                        <label
                          htmlFor={ `${checkbox} ${Measures[index]}` }
                          name={ `${checkbox} ${Measures[index]}` }
                          data-testid={ `${index}-ingredient-step` }
                        >
                          <input
                            className="input-step"
                            type="checkbox"
                            onClick={ saveDoneSteps }
                            onChange={ validateButton }
                            id={ `${checkbox} ${Measures[index]}` }
                          />
                          {`${checkbox} ${Measures[index]}`}
                        </label>
                      </div>))}
                  </form>
                  <button
                    className="fixed-bottom"
                    type="button"
                    onClick={ finishRecipe }
                    data-testid="finish-recipe-btn"
                    disabled={ isDisabled }
                  >
                    Finish Recipe

                  </button>
                </div>))
            ) : (<div>oi</div>)}
          </div>)}
      {path === 'drinks'
        && (
          <div>
            {recipeDetails ? (
              recipeDetails.map((recipe) => (
                <div className="details-container" key={ recipe.strDrink }>
                  <img
                    className="details-image"
                    src={ recipe.strDrinkThumb }
                    alt="Recipe Pic"
                    data-testid="recipe-photo"
                  />
                  <h2
                    className="details-title"
                    data-testid="recipe-title"
                  >
                    {recipe.strDrink}

                  </h2>
                  <h4
                    className="details-category"
                    data-testid="recipe-category"
                  >
                    {recipe.strCategory}
                  </h4>
                  <img
                    className="details-button"
                    src={ whiteHeartIcon }
                    alt="favorite button"
                    onClick={ () => {} }
                    aria-hidden
                    data-testid="favorite-btn"
                  />
                  <img
                    className="details-button"
                    src={ shareIcon }
                    alt="share button"
                    data-testid="share-btn"
                    onClick={ saveOnClipBoard }
                    aria-hidden
                  />
                  {linkCopied && <p>Link copied!</p>}
                  <p data-testid="instructions">{recipe.strInstructions}</p>
                  <form>
                    {Ingredients.map((checkbox, index) => (
                      <div key={ `${checkbox} ${Measures[index]}` }>
                        <label
                          className="recipe-steps"
                          htmlFor={ `${checkbox} ${Measures[index]}` }
                          name={ `${checkbox} ${Measures[index]}` }
                          data-testid={ `${index}-ingredient-step` }
                        >
                          <input
                            className="input-step"
                            type="checkbox"
                            onClick={ saveDoneSteps }
                            onChange={ validateButton }
                            id={ `${checkbox} ${Measures[index]}` }
                          />
                          {`${checkbox} ${Measures[index]}`}
                        </label>
                      </div>))}
                  </form>
                  <button
                    className="fixed-bottom"
                    type="button"
                    onClick={ finishRecipe }
                    data-testid="finish-recipe-btn"
                    disabled={ isDisabled }
                  >
                    Finish Recipe

                  </button>
                </div>))
            ) : (<div>oi</div>)}
          </div>)}
    </div>
  );
}

export default RecipeInProgress;
