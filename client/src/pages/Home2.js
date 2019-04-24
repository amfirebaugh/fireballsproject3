import React, { Component } from 'react';
// context api wrapper to provide state to other components
import { MyProvider } from '../context';
import WelcomeHome from '../components/WelcomeHome';
import { Footer } from '../components/Footer';

// import bootstrap from node_modules
import 'bootstrap/dist/css/bootstrap.min.css';

class Home2 extends Component {
  render() {
    return (
      // Anything that needs access to the state data will need to be wrapped in the Provider Component.
      <MyProvider>
        <div className="rxGrey mt-5">
          <div className="container mt-3">
            <div className="row">
              <div className="col-md-12">
                <WelcomeHome />
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </MyProvider>
    );
  }
}

// export for use
export default Home2;
