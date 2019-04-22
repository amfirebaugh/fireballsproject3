import React, { Component } from 'react';
import ApiCalls from '../utils/ApiCalls';
import Home from './Home';

class Profile extends Component {
  state = {
    profile: null,
    error: ''
  };

  componentDidMount() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.props.auth.getProfile((profile, error) =>
      //this.setState({ profile, error })
      ApiCalls.signInUser(profile)
        .then(response => {
          console.log(response);
        })
        .catch(err => console.log(err))
    );
  }

  render() {
    const { profile } = this.state;
    if (!profile) {
      return null;
    }
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h4>Dummy profile page</h4>
              <p className="text-danger">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
                vitae facere unde accusantium sit nulla. Minima sequi in tempora
                officiis.
              </p>
              <p>Name: {profile.name}</p>
              <p>Email: {profile.email}</p>
              <pre>{JSON.stringify(profile, null, 2)}</pre>
            </div>
          </div>
        </div>
        <Home />
      </div>
    );
  }
}

export default Profile;
