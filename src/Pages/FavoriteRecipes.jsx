import { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import copy from 'clipboard-copy';

import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeContext from '../context/RecipeContext';

// Obrigado Caren e Henryk

function FavoriteRecipes() {
  const history = useHistory();
  const { favoriteRecipes, setFavoriteRecipes } = useContext(RecipeContext);
  const [backupfavoriteRecipes, setBackupFavoriteRecipes] = useState([]);
  const [showCopyMessage, setShowCopyMessage] = useState(false);
  useEffect(() => {
    setBackupFavoriteRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')));
    setFavoriteRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }, []);

  const tempo = 3000;
  const shareBTN = (elements) => {
    setShowCopyMessage(true);
    copy(`http://localhost:3000/${elements.type}s/${elements.id}`);
    setTimeout(() => setShowCopyMessage(false), tempo);
  };

  const handleFilterByAll = () => {
    setFavoriteRecipes(backupfavoriteRecipes);
  };

  const handleFilterByMeal = () => {
    setFavoriteRecipes(backupfavoriteRecipes
      .filter((elementos) => elementos.type === 'meal'));
  };

  const handleFilterByDrink = () => {
    setFavoriteRecipes(backupfavoriteRecipes
      .filter((element) => element.type === 'drink'));
  };

  const goToDetailPage = (element) => {
    history.push(`/${element.type}s/${element.id}`);
  };

  const unfavoriteRecipe = (ximboca) => {
    const newFiltred = favoriteRecipes.filter((element) => element.id !== ximboca.id);
    // const michaelJacksonDoAgresteBaiano
    setBackupFavoriteRecipes(newFiltred);
    setFavoriteRecipes(newFiltred);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFiltred));
  };

  // useEffect(() => {
  //   localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  // }, [favoriteRecipes]);

  return (
    <div>
      <Header title="Favorite Recipes" hasSearchIcon={ false } />
      <div>
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ handleFilterByAll }
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          type="button"
          onClick={ handleFilterByMeal }
        >
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ handleFilterByDrink }
        >
          Driks
        </button>
      </div>
      <div>
        { showCopyMessage && (
          <p>Link copied!</p>
        )}
        {favoriteRecipes?.map((element, index) => (
          <div key={ element.name }>
            <button
              type="button"
              onClick={ () => goToDetailPage(element) }
            >
              <img
                width={ 100 }
                data-testid={ `${index}-horizontal-image` }
                src={ element.image }
                alt="imagem da receita"
              />
              <p data-testid={ `${index}-horizontal-name` }>{element.name}</p>
            </button>
            <p data-testid={ `${index}-horizontal-top-text` }>{element.category}</p>
            <p data-testid={ `${index}-horizontal-done-date` }>{element.doneDate}</p>
            <button
              type="button"
              onClick={ () => shareBTN(element) }
            >
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt="compartilhar"
              />
            </button>
            <button
              type="button"
              onClick={ () => unfavoriteRecipe(element) }
            >
              <img
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ blackHeartIcon }
                alt="favoritar"
              />
            </button>
            <p data-testid={ `${index}-horizontal-top-text` }>
              {`${element.nationality} - ${element.category}`}
            </p>
            <p data-testid={ `${index}-horizontal-top-text` }>{element.alcoholicOrNot}</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default FavoriteRecipes;
