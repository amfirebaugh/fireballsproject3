import React, { Component } from 'react';
// context api wrapper to provide state to other components
import { MyProvider } from '../context';
import Home2Banner from '../components/Home2Banner';
import { Footer } from '../components/Footer';

// import bootstrap from node_modules
import 'bootstrap/dist/css/bootstrap.min.css';

class Home2 extends Component {
  render() {
    return (
      // Anything that needs access to the state data will need to be wrapped in the Provider Component.
      <MyProvider>
        <div className="rxGrey mt-5 py-3">
          <div className="container mt-3">
            <div className="row">
              <div className="col-md-12">
                <Home2Banner />
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
