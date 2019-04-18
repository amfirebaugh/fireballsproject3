import React, { Component } from 'react';
import Navbar from './components/Navbar';
// react router imports
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

// import pages
import Home from './pages/Home';
import Profile from './pages/Profile';
// import Callback from './Auth/Callback';

// auth imports and components
import AuthContext from './Auth/AuthContext';
import Auth from './Auth/Auth';
import PrivateRoute from './Auth/PrivateRoute';

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
            {/* Render Navbar */}
            <Navbar branding="Dummy Navbar" auth={auth} />
            {/* 
            set up the routes, ALL routes need to be imported at top 
            the '/' = Home and 'other routes contain '/', 
            they will be appended to home route in the browser window
            ** However **
            adding exact to '/' fixes this
          */}
            {/* <Redirect
              path="/callback"
              render={props => <Callback auth={auth} {...props} />}
            /> */}
            <Route exact path="/" component={Home} />
            <PrivateRoute exact path="/profile" component={Profile} />
            {/* 
            Profile is a placeholder route until we get auth ironed out 
            <Route exact path="/Profile" Component={Profile} /> 
          */}
          </div>
        </Router>
      </AuthContext.Provider>
    );
  }
}

export default App;
