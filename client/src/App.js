import React, { Component } from 'react';
import Navbar from './components/Navbar';
import './App.css';
// react router imports
import { BrowserRouter as Router, Route } from 'react-router-dom';

// import pages
import Home2 from './pages/Home2';
import Dashboard from './pages/Dashboard';

// auth imports and components
import AuthContext from './Auth/AuthContext';
import Auth from './Auth/Auth';
import PrivateRoute from './Auth/PrivateRoute';
import Callback from './Auth/Callback';

class App extends Component {
  // have to create new Auth() to have access to that class we created in Auth.js
  constructor(props) {
    super(props);
    this.auth = new Auth(this.props.history);
    this.state = {
      tokenRenewalComplete: false
    };
  }

  componentDidMount() {
    this.auth.renewToken(() => {
      this.setState({ tokenRenewComplete: true });
    });
  }

  render() {
    //const { auth } = this.state;
    const auth = this.auth;
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
            <Route
              path="/callback"
              render={props => <Callback auth={auth} {...props} />}
            />
            <Route exact path="/" component={Home2} />
            <PrivateRoute exact path="/profile" component={Dashboard} />
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
