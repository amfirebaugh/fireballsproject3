import React from 'react';
// import bootstrap from node_modules
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContext from '../Auth/AuthContext';
import { Link } from 'react-router-dom';
import RX_icon from '../images/RX_icon.png';

// <ion-icon name="menu"></ion-icon>  --> hamburger icon in case bootstrap isn't playing nice

const Header = props => {
  // destructure (else enter: props.branding into <h3> )
  const { branding, auth } = props;
  const { isAuthenticated, logout, login } = auth;
  console.log('authed?>:::: ', isAuthenticated());
  return (
    <div>
      {/* inline style */}
      <nav className="navbar navbar-expand-md rxStyles mb-3 p-2 sticky navBorder">
        <div className="container">
          <a href="/" className="navbar-brand">
            <span>
              Inte
              <img src={RX_icon} height="20px" />
              act
            </span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto d-flex justify-content-end">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              {isAuthenticated() && (
                <li className="nav-item">
                  <Link to="/profile" className="nav-link">
                    Dashboard
                  </Link>
                </li>
              )}
              <li className="ml-3">
                <button
                  className="btn rxLogBtn"
                  onClick={isAuthenticated() ? logout : login}
                >
                  {isAuthenticated() ? 'Logout' : 'Login'}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
// this is a function-based 'dumb' component
const HeaderAuth = props => {
  return (
    <AuthContext.Consumer>
      {auth => <Header {...props} auth={auth} />}
    </AuthContext.Consumer>
  );
};

// create a default branding in-case no props are passed in
// props from App.js will supercede default
Header.defaultProps = {
  branding: 'app is cool'
};

export default HeaderAuth;
