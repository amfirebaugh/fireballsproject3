import React, { Component } from 'react';

export default class Callback extends Component {
  componentDidMount() {
    // Handle authentication if expected values are in the URL
    // inside our if statement is checking if at least one of those three expected values are in the URL
    if (/access_token|id_token|error/.test(this.props.location.hash)) {
      this.props.auth.handleAuthentication();
      console.log('checked callbackURL:' + this.props.location.hash);
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
