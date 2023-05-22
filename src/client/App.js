import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TestComponent from "./components/TestComponent/TestComponent";
import MealsList from "./components/MealsList";
import MealById from "./components/MealById";
function App() {
  return (
    <Router>
       <Route exact path="/all-meals">
        <MealsList />
      </Route>
      <Route exact path="/meals/:id">
        <MealById />
      </Route>
      <Route exact path="/test-component">
        <TestComponent></TestComponent>
      </Route>
    </Router>
  );
}
export default App;