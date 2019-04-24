import React, { Component } from 'react';
//import { MyConsumer } from '../context';

class CallbackBanner extends Component {
  render() {
    return (
      <div className="container jumbotron jBorder rxBlue mt-3">
        <div className="row">
          <div className="col-md-12">
            <h4>Welcome inside InteRXact!</h4>
            <p className="lead">
              Insert disclaimer / instructions / words to user / Click View
              Dashboard to begin / etc.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default CallbackBanner;
