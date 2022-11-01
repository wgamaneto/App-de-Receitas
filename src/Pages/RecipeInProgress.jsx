import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whireHeartIcon from '../images/whiteHeartIcon.svg';
import './RecipeInProgress.css';

function RecipeInProgress() {
  const history = useHistory();
  const recipeId = history.location.pathname.replace(/\D/g, '');
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [Ingredients, setIngredients] = useState([]);
  const [Measures, setMeasures] = useState([]);
  const [recipeSteps, setRecipeSteps] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const bars = history.location.pathname.split('/');
  const path = bars[1];
  const fetchRecipeDetails = useCallback(async () => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
    const data = await fetch(url);
    const res = await data.json();
    /* setIsFetched(true); */
    console.log('entrou no fetch');
    setRecipeDetails(res);
  }, [recipeId]);
  useEffect(() => {
    fetchRecipeDetails();
  }, [fetchRecipeDetails]);
  const getIngredients = useCallback(async () => {
    if (recipeDetails[path][0] !== undefined) {
      const entradas = Object.entries(recipeDetails[path][0]);
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
    }
  }, [recipeDetails, path]);

  const initialState = () => {
    const local = JSON.parse(localStorage.getItem('inRecipeProgress'));
    console.log(local);
    if (local[path][recipeId]) {
      setRecipeSteps(local[path][recipeId]);

      local[path][recipeId].forEach((recipe) => {
        const itens = document.getElementById(recipe);
        const checkbox = document.getElementsByName(recipe);
        console.log(itens);
        console.log(recipe);
        itens.className = 'cutted';
        checkbox[0].checked = true;
      });
    }
  };

  useEffect(() => {
    getIngredients();
    initialState();
  }, [getIngredients]);

  useEffect(() => {
    let local = JSON.parse(localStorage.getItem('inProgressRecipes'));
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
    console.log(recipeSteps.length);
  };

  const saveDoneSteps = ({ target }) => {
    const itens = document.getElementById(target.name);
    if (target.checked === true) {
      itens.className = 'cutted';
      if (recipeSteps.includes(target.name)) {
        const removeBox = recipeSteps.filter((step) => step !== target.name);
        setRecipeSteps(removeBox);
      } else {
        setRecipeSteps([...recipeSteps, target.name]);
      }
    } else if (target.checked === false) {
      itens.className = '';
      const removeBox = recipeSteps.filter((recipe) => recipe !== target.name);
      setRecipeSteps(removeBox);
    }
  };

  /* const checkLocalStorage = () => {
    if (localStorage.inProgressRecipes.length !== 0) {
      setRecipeSteps(JSON.parse(localStorage.getItem('inProgressRecipes')));
      console.log(recipeSteps);
    } else if (localStorage.inProgressRecipes.length === 0) {
      const array = JSON.stringify(
        localStorage.getItem('inProgressRecipes'),
      );
      const arrayParsed = array.map((element) => parseInt(element, 10));
      setRecipeSteps(arrayParsed);
    }
  }; */

  /* const checkLocalStorageBoxes = async () => {
    await checkLocalStorage();
    await gettedFromLocalStorage;
    recipeSteps.forEach((element, index) => {
      const checkbox = document.getElementsByName(`checkbox ${index}`);
      console.log(checkbox);
      checkbox[0].checked = true;
    });
  }; */
  console.log(recipeDetails);
  return (
    <div>
      { path === 'meals'
        ? (
          <div>
            { recipeDetails.length !== 0 && (
              <div>
                <img
                  src={ recipeDetails[path][0].strMealThumb }
                  alt="Recipe Pic"
                  data-testid="recipe-photo"
                />
                <h2 data-testid="recipe-title">{recipeDetails[path][0].strMeal}</h2>
                <h4
                  data-testid="recipe-category"
                >
                  {recipeDetails[path][0].strCategory}
                </h4>
                <img
                  src={ whireHeartIcon }
                  alt="favorite button"
                  onClick={ () => console.log('clicou favorite') }
                  aria-hidden
                />
                <img
                  src={ shareIcon }
                  alt="share button"
                  data-testid="share-btn"
                  onClick={ () => console.log('clicou share') }
                  aria-hidden
                />
                <p data-testid="instructions">{recipeDetails[path][0].strInstructions}</p>
                <form>
                  {Ingredients.map((checkbox, index) => (
                    <div key={ index }>
                      <input
                        id={ index }
                        type="checkbox"
                        onClick={ saveDoneSteps }
                        onChange={ validateButton }
                        name={ `${checkbox} ${Measures[index]}` }
                      />
                      <label
                        htmlFor={ `${checkbox} ${Measures[index]}` }
                        name={ `label ${index}` }
                        id={ `${checkbox} ${Measures[index]}` }
                      >
                        {`${checkbox} ${Measures[index]}`}

                      </label>
                    </div>))}
                </form>
                <button
                  type="button"
                  onClick={ () => console.log('clicou finalizar') }
                  testid="finish-recipe-btn"
                  disabled={ isDisabled }
                >
                  Finish Recipe

                </button>
              </div>
            )}
          </div>
        )
        : (

          <div>
            <img
              src={ recipeDetails[path][0].strMealThumb }
              alt="Recipe Pic"
              data-testid="recipe-photo"
            />
            <h2 data-testid="recipe-title">{recipeDetails[path][0].strMeal}</h2>
            <h4
              data-testid="recipe-category"
            >
              {recipeDetails[path][0].strCategory}

            </h4>
            <img
              src={ whireHeartIcon }
              alt="favorite button"
              onClick={ () => console.log('clicou favorite') }
              aria-hidden
            />
            <img
              src={ shareIcon }
              alt="share button"
              data-testid="share-btn"
              onClick={ () => console.log('clicou share') }
              aria-hidden
            />
            <p data-testid="instructions">{recipeDetails[path][0].strInstructions}</p>
            {}
            <button
              type="button"
              onClick={ () => console.log('clicou finalizar') }
              testid="finish-recipe-btn"
            >
              Finish Recipe

            </button>
          </div>
        )}
    </div>
  );
}

export default RecipeInProgress;
