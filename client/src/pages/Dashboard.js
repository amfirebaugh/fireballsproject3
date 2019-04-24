import React, { Component } from 'react';
import ApiCalls from '../utils/ApiCalls';
import InteractionSearch from '../components/InteractionSearch';
import WelcomeHome from '../components/WelcomeHome';
import { Footer } from '../components/Footer';

class Dashboard extends Component {
  state = {
    profile: null,
    error: ''
  };

  componentDidMount() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.props.auth.getProfile((profile, error) =>
      ApiCalls.signInUser(profile)
        .then(response => {
          console.log(response);
          this.setState({ profile, error });
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
      <div className="rxGrey mt-5">
        <div className="container mt-3">
          <div className="row">
            <div className="col-md-12">
              <WelcomeHome />
            </div>
          </div>
        </div>
        <div className="container mt-3">
          <div className="row">
            <div className="col-md-12">
              <h4>
                Placeholder for name that will go into welcome banner later:{' '}
                {profile.name}
              </h4>
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
        <Footer />
      </div>
    );
  }
}

export default Dashboard;
