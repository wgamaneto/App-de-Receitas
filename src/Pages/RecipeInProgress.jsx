import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whireHeartIcon from '../images/whiteHeartIcon.svg';

function RecipeInProgress() {
  const history = useHistory();
  const recipeId = history.location.pathname.replace(/\D/g, '');
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [Ingredients, setIngredients] = useState([]);
  const [Measures, setMeasures] = useState([]);
  const bars = history.location.pathname.split('/');
  const path = bars[1];

  const fetchRecipeDetails = async () => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
    const data = await fetch(url);
    const res = await data.json();
    setIsFetched(true);
    return res;
  };

  const getIngredients = async () => {
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
  };

  const validateButton = () => {

  };

  const saveInfos = async () => {
    await isFetched;
    const infos = await fetchRecipeDetails();
    setRecipeDetails(infos);
  };

  useEffect(() => {
    saveInfos();
  }, [saveInfos]);
  return (
    <div>
      { path === 'meals'
        ? (
          <div>
            { isFetched ? (
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
                        type="checkbox"
                        onClick={ () => console.log('clicou na checkbox') }
                        name={ `checkbox ${index}` }
                        id={ `checkbox ${index}` }
                      />
                      <label
                        htmlFor={ `checkbox ${index}` }
                      >
                        {`${checkbox} ${Measures[index]}`}

                      </label>
                    </div>))}
                </form>
                <button
                  type="button"
                  onClick={ () => console.log('clicou finalizar') }
                  testid="finish-recipe-btn"
                >
                  Finish Recipe

                </button>
                <button type="button" onClick={ getIngredients }>Teste</button>
              </div>
            )
              : false }
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
