import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import Card from '../components/Card';

import RecipeContext from '../context/RecipeContext';

function Drinks() {
  const history = useHistory();
  const { drinkData, setDrinkData } = useContext(RecipeContext);
  const [drinkCategories, setDrinkCategories] = useState([]);
  const [filterButton, setFilterButton] = useState({
    filter: false,
    click: 0,
  });

  const drinkToRender = [];
  const maxCards = 12;
  const categoriesToRender = [];
  const maxCategories = 4;
  const timer = 2000;

  const fetchCategories = async (URL) => {
    try {
      const response = await fetch(URL);
      const json = await response.json();
      return json;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const drinksByName = async (name) => {
    try {
      const response = await fetch(`${'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='}${name}`);
      console.log(response);
      const json = await response.json();
      return json;
    } catch (error) {
      throw Error(error.message);
    }
  };

  const drinksByCategory = async (category) => {
    try {
      const response = await fetch(`${'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c='}${category}`);
      const json = await response.json();
      return json;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const fetchAllDrinks = () => {
    const allData = drinksByName('');
    allData.then((json) => {
      setDrinkData([
        ...json.drinks,
      ]);
    });
  };

  const getDrinksByCategory = async ({ target: { value } }) => {
    if (value === 'All') {
      fetchAllDrinks();
      setTimeout(() => {
        setFilterButton({
          filter: false,
        });
      }, timer);
    } else if (filterButton.click === 1) {
      fetchAllDrinks();
      setTimeout(() => {
        setFilterButton({
          filter: false,
          click: 0,
        });
      }, timer);
    } else {
      const results = await drinksByCategory(value);
      setFilterButton({
        filter: true,
        click: filterButton.click + 1,
      });
      console.log(results.drinks);
      await setDrinkData([
        ...results.drinks,
      ]);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      const data = await fetchCategories(url);
      setDrinkCategories(
        data.drinks,
      );
    };
    fetchData();
  }, []);

  if (drinkCategories.length > 0) {
    drinkCategories.forEach((data, i) => {
      if (i <= maxCategories) {
        categoriesToRender.push(data.strCategory);
      }
    });
    categoriesToRender.push('All');
  }

  if (drinkData.length > 0) {
    drinkData.forEach((data, i) => {
      if (i < maxCards) drinkToRender.push(data);
    });
  }
  return (
    <div>
      <Header />
      {categoriesToRender.length > 0 && categoriesToRender.map((category, i) => (
        <button
          key={ i }
          type="button"
          data-testid={ `${category}-category-filter` }
          value={ category }
          onClick={ getDrinksByCategory }
        >
          { category }
        </button>
      ))}

      {drinkData.length === 0 && fetchAllDrinks()}

      {drinkToRender.length === 1 && !filterButton.filter
        ? history.push(`/drinks/${drinkToRender[0].idDrink}`)
        : drinkToRender.map((drink, i) => (
          <Card
            key={ i }
            index={ i }
            thumbnail={ drink.mealThumb }
            name={ drink.nameMeal }
            id={ drink.idDrink }
            recipe="drinks"
          />))}
      <Recipes />
      <Footer />
    </div>
  );
}

export default Drinks;
