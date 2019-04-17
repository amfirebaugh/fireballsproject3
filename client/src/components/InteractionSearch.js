import React, { Component } from 'react';
import API from '../utils/ApiCalls';
import { Input, FormBtn } from './FormInteractions';
//import InteractionResults from './InteractionResults';

class InteractionSearch extends Component {
  //local state for now
  state = {
    drug1: '',
    drug2: '',
    interactions: []
  };

  // this works
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState(
      {
        [name]: value
      },
      () => {
        console.log(
          'this drug1 and this drug2 are:',
          this.state.drug1,
          this.state.drug2
        );
      }
    );
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.drug1 && this.state.drug2) {
      API.getDrugInteractions({
        drug1: this.state.drug1,
        drug2: this.state.drug2
      })
        .then(res =>
          // setState includes a callback for console.log of state to see if I got the drugs
          this.setState({ interactions: res.data }, () => {
            console.log('local state is', this.state.interactions);
          })
        )
        .catch(err => console.log(err));
    }
    // I need to reset the form value submit
  };

  render() {
    return (
      <div className="container jumbotron">
        <div className="row">
          <div className="col-md-6">
            <h4 className="mb-3 text-success">Drug Interaction Search</h4>
            <form>
              <Input
                value={this.state.drug1}
                onChange={this.handleInputChange}
                name="drug1"
                placeholder="drug name 1 (required)"
              />
              <Input
                value={this.state.drug2}
                onChange={this.handleInputChange}
                name="drug2"
                placeholder="drug name 2 (required)"
              />
              <FormBtn
                disabled={!this.state.drug1 || !this.state.drug2}
                onClick={this.handleFormSubmit}
              >
                Submit Interaction Search
              </FormBtn>
            </form>
          </div>
          <div className="col-md-6 pl-3">
            <h4 className="text-primary">Saved Searches!</h4>
            <ul>
              <li>Eye of Newt | Polyjuice Potion</li>
              <li>Caffiene | More Caffiene</li>
              <li>Mentos | Dr Pepper</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default InteractionSearch;
