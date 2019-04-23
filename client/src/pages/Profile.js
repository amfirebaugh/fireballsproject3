import React, { Component } from 'react';
import ApiCalls from '../utils/ApiCalls';
import { MyProvider } from '../context';
import NewDrugSearch from '../components/NewDrugSearch';
import InteractionSearch from '../components/InteractionSearch';
import Results from '../components/Results';
import { Footer } from '../components/Footer';

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
      <MyProvider>
        <div>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h4>Dummy profile page</h4>
                <p className="text-danger">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
                  vitae facere unde accusantium sit nulla. Minima sequi in
                  tempora officiis.
                </p>
                <p>Name: {profile.name}</p>
                <p>Email: {profile.email}</p>
                <pre>{JSON.stringify(profile, null, 2)}</pre>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <NewDrugSearch />
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <InteractionSearch />
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <Results />
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </MyProvider>
    );
  }
}

export default Profile;
