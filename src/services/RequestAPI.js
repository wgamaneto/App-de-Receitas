const checkUrl = (pathname, id) => {
  if (pathname.includes('meals')) {
    return (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  } if (pathname.includes('drinks')) {
    return (`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  }
};

export async function fetchRecipe(pathname, id, setState) {
  const data = await fetch(checkUrl(pathname, id));
  const response = await data.json();
  if (pathname.includes('meals')) {
    setState(response.meals[0]);
  } if (pathname.includes('drinks')) {
    setState(response.drinks[0]);
  }
}

export async function fetchSugestion(pathname, setState) {
  let url = '';
  const numberSix = 6;
  if (pathname.includes('meals')) {
    url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  } else {
    url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  }
  const data = await fetch(url);
  const response = await data.json();
  if (pathname.includes('meals')) {
    const arr = response.drinks;
    const arrLimite = arr.slice(0, numberSix);
    setState(arrLimite);
  } else {
    const arr = response.meals;
    const arrLimite = arr.slice(0, numberSix);
    setState(arrLimite);
  }
}
