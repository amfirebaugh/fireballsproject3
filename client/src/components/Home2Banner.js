import React, { Component } from 'react';
//import { MyConsumer } from '../context';

class Home2Banner extends Component {
  render() {
    return (
      // the component that needs to utilize the state data is wrapped in the 'Consumer' component.
      <div className="container jumbotron jBorder rxBlue mt-3">
        <div className="row">
          <div className="col-md-12">
            <h4>Welcome to InteRXact</h4>
            <p className="lead">
              Check for possible side-effects and interactions between your
              prescription medications in seconds! Login to begin.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Home2Banner;
