import React, { Component } from 'react';

export default class Callback extends Component {
  componentDidMount() {
    // Handle authentication if expected values are in the URL
    if (/access_token|id_token|error/.test(this.props.location.pathway.hash)) {
      this.props.auth.handleAuthentication();
    } else {
      throw new Error('Invalid callback URL');
    }
  }
  render() {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
}
