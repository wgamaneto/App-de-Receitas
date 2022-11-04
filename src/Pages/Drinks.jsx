import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Footer from '../components/Footer';
import Header from '../components/Header';
import Card from '../components/Card';

import RecipeContext from '../context/RecipeContext';

function Drinks() {
  const history = useHistory();
  const { drinkData, setDrinkData } = useContext(RecipeContext);
  const [drinkCategories, setDrinkCategories] = useState([]);
  const [filterButton, setFilterButton] = useState({
    filter: false,
    name: '',
  });

  const drinkToRender = [];
  const maxCards = 12;
  const categoriesToRender = [];
  const maxCategories = 4;

  const fetchCategories = async (URL) => {
    const response = await fetch(URL);
    const json = await response.json();
    return json;
  };

  const drinksByName = async (name) => {
    const response = await fetch(`${'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='}${name}`);
    const json = await response.json();
    return json;
  };

  const drinksByCategory = async (category) => {
    const response = await fetch(`${'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c='}${category}`);
    const json = await response.json();
    return json;
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
      setFilterButton({
        name: value,
      });
    } if (value === filterButton.name) {
      fetchAllDrinks();
      setFilterButton({
        name: value,
      });
    } else if (value !== 'All') {
      const results = await drinksByCategory(value);
      setFilterButton({
        name: value,
      });
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
          className="category-button"
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
          <div
            key={ i }
          >
            <Card
              index={ i }
              thumbnail={ drink.strDrinkThumb }
              id={ drink.idDrink }
              recipe="drinks"
            />
            <p
              data-testid={ `${i}-card-name` }
            >
              {' '}
              { drink.strDrink }
              {' '}
            </p>
          </div>
        ))}
      {/* <Recipes /> */}
      <Footer />
    </div>
  );
}

export default Drinks;
