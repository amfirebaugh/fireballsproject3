import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CallbackBanner extends Component {
  render() {
    return (
      <div className="container jumbotron jBorder rxBlue mt-3">
        <div className="row">
          <div className="col-md-12">
            <h4>
              Welcome inside InteRXact! Please take a moment to read the
              statement below.
            </h4>
            <p className="lead">
              All information, content, and material of this website is for
              informational purposes only and are not intended to serve as a
              substitute for the consultation, diagnosis, and/or medical
              treatment of a qualified physician or healthcare provider.
            </p>
            <a className="btn btn-warning float-right" role="button">
              <Link to="/profile">View Dashboard</Link>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default CallbackBanner;
