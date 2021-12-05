import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import PrivateRoute from "./routing/PrivateRoute";

import store from "./store";

import Buckets from './pages/contents/buckets/Buckets';


function App() {
  useEffect(() => {
    // store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <div className="App">
        
        <Router>
         
            <PrivateRoute
              exact
              path="/contents/buckets/:id"
              component={Buckets}
            ></PrivateRoute>
            
        </Router>
      </div>
    </Provider>
  );
}

export default App;
