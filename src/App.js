import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Pages/Login';
import Meals from './Pages/Meals';
import RecipeProvider from './context/RecipeProvider';
import Profile from './Pages/Profile';
import DoneRecipes from './Pages/DoneRecipes';
import FavoriteRecipes from './Pages/FavoriteRecipes';

function App() {
  return (
    <BrowserRouter>
      <RecipeProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/Meals" component={ Meals } />
          <Route exact path="/profile" component={ Profile } />
          {/* <Route exact path="/drinks" component={ Drinks } /> */}
          <Route exact path="/done-recipes" component={ DoneRecipes } />
          <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
          {/* <Route exact path="/Meals/:id-da-receita" component={ RecipeDetails } /> */}
          {/* <Route exact path="/drinks/:id-da-receita" component={ RecipeDetails } /> */}
          {/* <Route exact path="/Meals/:id/in-progress" component={ RecipeInProgress } /> */}
          {/* <Route
            exact
            path="/drinks/:id/in-progress"
            component={ RecipeInProgress }
          /> */}

        </Switch>
      </RecipeProvider>
    </BrowserRouter>
  );
}

export default App;
