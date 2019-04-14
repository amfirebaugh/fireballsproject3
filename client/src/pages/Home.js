import React, { Component } from 'react';
// context api wrapper to provide state to other components
// import { MyProvider } from '../context';
import WelcomeHome from '../components/WelcomeHome';

// import bootstrap from node_modules
import 'bootstrap/dist/css/bootstrap.min.css';

class Home extends Component {
  render() {
    return (
      // Anything that needs access to the state data will need to be wrapped in the Provider Component.
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <WelcomeHome />
          </div>
        </div>
      </div>
    );
  }
}

// export for use
export default Home;
