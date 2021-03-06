import React, { Component } from 'react';
import CallbackBanner from './CallbackBanner';
import { Footer } from '../components/Footer';

export default class Callback extends Component {
  componentDidMount() {
    // Handle authentication if expected values are in the URL
    if (/access_token|id_token|error/.test(this.props.location.hash)) {
      this.props.auth.handleAuthentication();
    } else {
      throw new Error('Invalid callback URL');
    }
  }
  render() {
    return (
      <div className="rxGrey mt-5 py-3">
        <div className="container mt-3">
          <div className="row">
            <div className="col-md-12">
              <CallbackBanner />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
