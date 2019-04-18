import React from 'react';
// import bootstrap from node_modules
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContext from '../Auth/AuthContext';
import { Link } from 'react-router-dom';

const Header = props => {
  // destructure (else enter: props.branding into <h3> )
  const { branding, auth } = props;
  const { isAuthenticated, logout, login } = auth;
  console.log('authed?>:::: ', isAuthenticated());
  return (
    <div>
      {/* inline style */}
      <nav className="navbar navbar-expand-sm navbar-dark bg-primary mt-3 mb-3 py-0">
        <div className="container">
          <a href="/" className="navbar-brand">
            {/* js is passed into the jsx via brackets */}
            {branding}
          </a>
          <div>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              {isAuthenticated() && (
                <li className="nav-item">
                  <Link to="/profile" className="nav-link">
                    View Profile
                  </Link>
                </li>
              )}
              <li>
                <button onClick={isAuthenticated() ? logout : login}>
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
