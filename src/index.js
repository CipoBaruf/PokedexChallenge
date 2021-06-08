import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from './pages/home.jsx';
import Pokemon from './pages/pokemon.jsx';

import './styles/index.css'

ReactDOM.render(
  <Router>
    <Switch>
    <Route path="/pokemon/:idPokemon" component={Pokemon} /> 
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  </Router>,
  document.getElementById("root")
);

