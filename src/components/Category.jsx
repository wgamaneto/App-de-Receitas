import React, { useContext, useEffect, useState } from 'react';

import RecipesProvider from '../context/RecipeProvider';

function Category() {
  const base = (mealOrDrinks) => (
    mealOrDrinks === 'meals' ? 'https://www.themealdb.com/api/json/v1/1' : 'https://www.thecocktaildb.com/api/json/v1/1'
  );

  const getCategories = async (mealOrDrinks) => {
    const magicNumber = 5;
    const response = await fetch(`${base(mealOrDrinks)}/list.php?c=list`);
    const json = await response.json();
    const result = mealOrDrinks && json[mealOrDrinks].slice(0, magicNumber);
    return result;
  };

  const { mealOrDrinks, setCategory, category } = useContext(RecipesProvider);
  const [categories, setCategories] = useState([]);

  function handleSetCategory(strCategory) {
    setCategory(category === strCategory ? '' : strCategory);
  }

  useEffect(() => {
    let marked = true;

    const handleGetCategories = async () => {
      const result = await getCategories(mealOrDrinks);
      if (marked) setCategories(result);
    };

    handleGetCategories();

    return () => {
      marked = false;
    };
  }, [getCategories, mealOrDrinks]);

  return (
    <div className="category-list">
      <button
        onClick={ () => handleSetCategory('') }
        type="button"
        className="category"
        data-testid="All-category-filter"
      >
        All
      </button>
      {categories.map(({ strCategory }) => (
        <button
          type="button"
          onClick={ () => handleSetCategory(strCategory) }
          data-testid={ `${strCategory}-category-filter` }
          key={ strCategory }
        >
          {strCategory}
        </button>
      ))}
    </div>
  );
}

export default Category;
