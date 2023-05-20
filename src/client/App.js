import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TestComponent from "./components/TestComponent/TestComponent";
import MealsList from "./components/MealsList";

function App() {
  return (
  
    <Router>
      <Route exact path="/">
      <div>       <MealsList /><p>test</p></div>
     
      </Route>
      <Route exact path="/api/meals">
        <MealsList />
      </Route>
      <Route exact path="/test-component">
        <TestComponent></TestComponent>
      </Route>
    </Router>
  );
}

export default App;
