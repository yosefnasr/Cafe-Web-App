import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "./assets/sass/picasso.scss?v=1.3.0";
import "./assets/css/Style.css";

import AdminLayout from "./layouts/Admin.jsx";
import Login from "./views/Login.jsx";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/admin" render={props => <AdminLayout {...props} />} />
        <Route path="/" render={props => <Login {...props} />} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
