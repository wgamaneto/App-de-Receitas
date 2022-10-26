import React from 'react';
import { useHistory } from 'react-router-dom';

function RecipeInProgress() {
  const history = useHistory();

  return (
    <div>
      <img src="lilica.com" alt="Recipe Pic" data-testid="recipe-photo" />
      <h2 data-testid="recipe-title">titulo</h2>
      <h4 data-testid="recipe-category">Categoria</h4>
      <img
        src="../images/whiteHeartIcon.svg"
        alt="favorite button"
        onClick={ () => console.log('clicou favorite') }
        aria-hidden
      />
      <img
        src="../images/shareIcon.svg"
        alt="share button"
        data-testid="share-btn"
        onClick={ () => console.log('clicou') }
        aria-hidden
      />
      <p data-testid="instructions">Instruções</p>
      <button
        type="button"
        onClick={ () => console.log('clicou finalizar') }
        testid="finish-recipe-btn"
      >
        Finish Recipe

      </button>
    </div>
  );
}

export default RecipeInProgress;
