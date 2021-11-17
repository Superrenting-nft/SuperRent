import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { RentPage } from "./pages/RentPage";
import { ProfilePage } from "./pages/ProfilePage";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/" exact>
          <App />
        </Route>
        <Route path="/rent">
          <RentPage />
        </Route>
        <Route path="/profile/:profileIdx/">
          <ProfilePage />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
