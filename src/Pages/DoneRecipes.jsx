import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import DoneRecipesCard from '../components/DoneRecipesCard';

function DoneRecipes() {
  const [filterBy, setFilterBy] = useState('');
  const [doneRecipes, setDoneRecipes] = useState([]);

  const handleClick = ({ target }) => {
    const { name } = target;
    setFilterBy(name);
  };

  const getDoneList = () => {
    const doneRecipesList = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipes(doneRecipesList);
  };

  useEffect(() => {
    if (!localStorage.getItem('doneRecipes')) {
      localStorage.setItem('doneRecipes', JSON.stringify(
        [{
          id: '',
          type: '',
          nationality: '',
          category: '',
          alcoholicOrNot: '',
          name: '',
          image: '',
          doneDate: '',
          tags: [],
        }],
      ));
    }
    getDoneList();
  }, []);

  return (
    <>
      <Header />
      <main>
        <nav>
          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ handleClick }
            name=""
          >
            All
          </button>
          <button
            type="button"
            data-testid="filter-by-meal-btn"
            onClick={ handleClick }
            name="meal"
          >
            Meals
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ handleClick }
            name="drink"
          >
            Drinks
          </button>
        </nav>
        <section>
          {doneRecipes.filter((item) => item.type.includes(filterBy))
            .map((recipe, index) => (
              <DoneRecipesCard
                key={ recipe.id }
                recipe={ recipe }
                index={ index }
              />
            ))}
        </section>
      </main>
    </>
  );
}

export default DoneRecipes;
