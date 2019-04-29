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
              <img src={RX_icon} alt="RX" height="22px" />
              act! Please take a moment to read the statements below.
            </h4>
            <br />
            <p className="lead">
              The information you will receive using this website represents the
              most common results based on your form inputs. They are of not an
              exhaustive list potential side-effects and interactions between
              medications.
              <br />
              <br />
              All information, content, and material of this website is for
              informational purposes only and are not intended to serve as a
              substitute for the consultation, diagnosis, and/or medical
              treatment of a qualified physician or healthcare provider.
            </p>
            {/* <a className="" > */}
            <Link
              className="vbBtn btn btn-warning float-right"
              role="button"
              to="/profile"
            >
              View Dashboard
            </Link>
            {/* </a> */}
          </div>
        </div>
      </div>
    );
  }
}

export default CallbackBanner;
