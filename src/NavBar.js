import React from "react";
import { Link } from "react-router-dom";

class UserAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
  }

  componentDidMount() {
    const loggedIn = sessionStorage.getItem("isLoggedIn");
    if (loggedIn) {
      this.setState({
        loggedIn: true
      });
    }
  }
  render() {
    const { loggedIn } = this.state;
    return NavBar(loggedIn);
  }
}

const NavBar = loggedIn => (
  <div className="container">
    <nav className="navbar navbar-expand-md navbar-light">
      <span className="navbar-brand " id="brand">
        <a href="/" style={{ textDecoration: "none" }}>
          JetCake
        </a>
      </span>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className="navbar-collapse collapse w-100 order-3 dual-collapse2"
        id="navbarSupportedContent"
      >
        <ul className="nav navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" id="login" to="/login">
              {sessionStorage.getItem("isLoggedIn") === "true" ? "" : "Login"}
            </Link>
          </li>
          <li className="nav-item">
            {loggedIn ? (
              <Link
                className="nav-link btn btn-info"
                onClick={() => {
                  sessionStorage.clear();
                  window.location.replace("/login");
                }}
                id="signup"
                to="/login"
              >
                {loggedIn ? "Logout" : "SignUp"}
              </Link>
            ) : (
              <Link
                className="nav-link btn btn-info"
                id="signup"
                to="/register"
              >
                SignUp
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  </div>
);

export default UserAuth;
