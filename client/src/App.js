import React, { Component } from 'react';
import Navbar from './components/Navbar';
import './App.css';
// react router imports
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

// import pages
import Login from './pages/Login';
import Profile from './pages/Profile';

// auth imports
import AuthContext from './Auth/AuthContext';
import Auth from './Auth/Auth';
import PrivateRoute from './Auth/PrivateRoute';
import Callback from './Auth/Callback';

class App extends Component {
  // have to create new Auth() to have access to that class we created in Auth.js
  constructor(props) {
    super(props);
    this.state = {
      auth: new Auth(this.props.history),
      tokenRenewalComplete: false
    };
  }

  componentDidMount() {
    this.state.auth.renewToken(() => {
      this.setState({ tokenRenewComplete: true });
    });
  }

  render() {
    const { auth } = this.state;

    return (
      <AuthContext.Provider value={auth}>
        <Router>
          <div className="App">
            <Navbar branding="Dummy Navbar" auth={auth} />
            <Route
              exact
              path="/"
              render={props => <Login auth={auth} {...props} />}
            />
            <Redirect
              path="/callback"
              render={props => <Callback auth={auth} {...props} />}
            />
            <PrivateRoute path="/profile" component={Profile} />
          </div>
        </Router>
      </AuthContext.Provider>
    );
  }
}

// alternative callback for profile component::::    render={props => <Profile auth={auth} {...props}

export default App;
