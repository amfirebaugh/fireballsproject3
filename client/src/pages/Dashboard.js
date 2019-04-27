import React, { Component } from 'react';
import ApiCalls from '../utils/ApiCalls';
import InteractionSearch from '../components/InteractionSearch';
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
              <div className="container jumbotron jBorder rxBlue mt-3">
                <div className="row">
                  <div className="col-md-12">
                    <h4>Welcome to Your Dashboard {profile.name}!</h4>
                    <p>
                      Searches require all fields below to view side effects.
                      Your searches will automatically be saved to your private
                      dashboard.
                    </p>
                    <p>
                      Don't remember how to spell your prescription? Start
                      typing in the first few letters and we'll help!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {/* pass 'sub' value to interactionSearch as props */}
              <InteractionSearch sub={this.state.profile.sub} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Dashboard;
