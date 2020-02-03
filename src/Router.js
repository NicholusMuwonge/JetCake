import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import UnderProduction from "./UderProduction";
import SignUp from "./Signup/SignUp";
import SignIn from "./Login/Login";
import NavBar from "./NavBar";
import Profile from "./Profile/Profile";
import Home from "./Home/Home";
import Footer from "./Footer/Footer";
import "./App.scss";

const Routes = () => (
  <React.Fragment>
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={SignUp} />
        <Route exact path="/login" component={SignIn} />
        <Route exact path="/profile" component={Profile} />
        <Route component={UnderProduction} />
      </Switch>
      <Footer />
    </BrowserRouter>
  </React.Fragment>
);

export default Routes;
