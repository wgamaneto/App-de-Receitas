import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Pages/Login';
import Meals from './Pages/Meals';

function App() {
  return (
    <BrowserRouter>
    <Switch>
    <Route exact path="/" component={ Login } />
    <Route exact path="/Meals" component={ Meals } />
    </Switch>
    {/* <div className="meals">
      <span className="logo">TRYBE</span>
      <object
      className="rocksGlass"
      type="image/svg+xml"
      data={ rockGlass }
      >
      Glass
      </object>
      
    </div> */}
    </BrowserRouter>
  );
}

export default App;
