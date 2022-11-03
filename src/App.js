import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Pages/Login';
import Meals from './Pages/Meals';
import RecipeProvider from './context/RecipeProvider';
import Profile from './Pages/Profile';
import DoneRecipes from './Pages/DoneRecipes';
import FavoriteRecipes from './Pages/FavoriteRecipes';
import Drinks from './Pages/Drinks';
import Header from './components/Header';
import RecipeInProgress from './Pages/RecipeInProgress';
// import Recipes from './components/Recipes';
import RecipeDetails from './Pages/RecipeDetails';

function App() {
  return (
    <RecipeProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Meals } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route exact path="/header" component={ Header } />
        {/* <Route exact path="/Meals/:id-da-receita" component={ RecipeDetails } /> */}
        {/* <Route exact path="/drinks/:id-da-receita" component={ RecipeDetails } /> */}
        <Route exact path="/meals/:id/in-progress" component={ RecipeInProgress } />
        <Route
          exact
          path="/drinks/:id/in-progress"
          component={ RecipeInProgress }
        />
        <Route exact path="/meals/:id" component={ RecipeDetails } />
        <Route exact path="/drinks/:id" component={ RecipeDetails } />
        <Route path="/meals/:id" component={ RecipeDetails } />
        <Route path="/drinks/:id" component={ RecipeDetails } />

      </Switch>
    </RecipeProvider>

  );
}

export default App;
