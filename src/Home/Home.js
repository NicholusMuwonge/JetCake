import React, { Fragment } from "react";
import "./Home.scss";

const Home = () => (
  <Fragment>
    <header className="hero">
      <div className="center-content">
        <h1 className="text-center">A Demo website</h1>
        <h5 className="text-center">
          This application will allow a user to create a new profile.
          <br />
          signup below to get started.
        </h5>
        <br />
        <br />
        <a href="/signup" className="button">
          Getting Started
        </a>
      </div>
    </header>
  </Fragment>
);

export default Home;
