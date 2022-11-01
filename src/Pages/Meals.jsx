import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Footer from '../components/Footer';
import Header from '../components/Header';
import Card from '../components/Card';

import RecipeContext from '../context/RecipeContext';

function Meals() {
  const history = useHistory();
  const { mealsData, setMealsData } = useContext(RecipeContext);
  const [mealsCategories, setMealsCategories] = useState([]);
  const [filterButton, setFilterButton] = useState({
    name: '',
  });

  const mealsToBeRendered = [];
  const maxCards = 12;
  const maxCategories = 4;
  const renderCategories = [];

  const fetchCategories = async (URL) => {
    try {
      const response = await fetch(URL);
      const json = await response.json();
      return json;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const handleMealsByName = async (name) => fetch(
    `${'https://www.themealdb.com/api/json/v1/1/search.php?s='}${name}`,
  ).then((response) => response.json());

  const mealsByCategory = async (category) => {
    try {
      const response = await fetch(`${'https://www.themealdb.com/api/json/v1/1/filter.php?c='}${category}`);
      const json = await response.json();
      return json;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const fetchAllMeals = () => {
    const allData = handleMealsByName('');
    allData.then((json) => {
      setMealsData([
        ...json.meals,
      ]);
    });
  };

  const getMealsByCategory = async ({ target: { value } }) => {
    if (value === 'All') {
      fetchAllMeals();
      setFilterButton({
        filter: false,
      });
    }
    if (value === filterButton.name) {
      fetchAllMeals();
      setFilterButton({
        filter: false,
      });
    } else if (value !== 'All' || value === 'Goat') {
      const results = await mealsByCategory(value);
      setFilterButton({
        name: value,
      });
      setMealsData([
        ...results.meals,
      ]);
    }
  };

  if (mealsCategories.length > 0) {
    mealsCategories.forEach((data, i) => {
      if (i <= maxCategories) {
        renderCategories.push(data.strCategory);
      }
    });
    renderCategories.push('All');
  }

  if (mealsData) {
    mealsData.forEach((data, i) => {
      if (i < maxCards) mealsToBeRendered.push(data);
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      const url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
      const data = await fetchCategories(url);
      setMealsCategories(
        data.meals,
      );
    };
    fetchData();
  }, []);

  return (
    <>
      <div>
        <Header />
        {renderCategories.length > 0 && renderCategories.map((category, i) => (
          <button
            data-testid={ `${category}-category-filter` }
            type="button"
            key={ i }
            value={ category }
            onClick={ getMealsByCategory }
          >
            { category }
          </button>
        ))}
      </div>
      <div>

        { mealsData.length === 0 && fetchAllMeals() }

        {
          mealsToBeRendered.length === 1 && !filterButton.name
            ? history.push(`/meals/${mealsToBeRendered[0].idMeal}`)
            : mealsToBeRendered.map((meals, i) => (
              <div
                key={ i }
              >
                <Card
                  index={ i }
                  thumbnail={ meals.strMealThumb }
                  id={ meals.idMeal }
                  recipe="meals"
                />
                <p
                  data-testid={ `${i}-card-name` }
                >
                  {' '}
                  { meals.strMeal }
                  {' '}
                </p>
              </div>
            ))
        }
        {/* <Recipes /> */}
        <Footer />
      </div>
    </>
  );
}

export default Meals;
