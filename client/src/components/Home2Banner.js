import React, { Component } from 'react';
import RX_icon from '../images/RX_icon.png';

class Home2Banner extends Component {
  render() {
    return (
      // the component that needs to utilize the state data is wrapped in the 'Consumer' component.
      <div className="container jumbotron jBorder rxBlue mt-3">
        <div className="row">
          <div className="col-md-12">
            <h4>
              Welcome to Inte
              <img src={RX_icon} height="22px" />
              act
            </h4>
            <p className="lead">
              Check for possible side-effects and interactions between your
              prescription and over-the-counter medications in seconds! Login to
              begin.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Home2Banner;
