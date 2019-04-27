import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RX_icon from '../images/RX_icon.png';

class CallbackBanner extends Component {
  render() {
    return (
      <div className="container jumbotron jBorder rxBlue mt-3">
        <div className="row">
          <div className="col-md-12">
            <h4>
              Welcome inside Inte
              <img src={RX_icon} height="22px" />
              act! Please take a moment to read the statement below.
            </h4>
            <p className="lead">
              All information, content, and material of this website is for
              informational purposes only and are not intended to serve as a
              substitute for the consultation, diagnosis, and/or medical
              treatment of a qualified physician or healthcare provider.
            </p>
            <a className="btn btn-warning float-right" role="button">
              <Link className="vbBtn" to="/profile">
                View Dashboard
              </Link>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default CallbackBanner;
