import React, { Component } from 'react';
import API from '../utils/ApiCalls';
import { Input, FormBtn, SelectGender, SelectAge } from './FormInteractions';
import { InteractionResultsB } from '../components/InteractionResultsB';
import { SavedSearches } from './SavedSearches';

class InteractionSearch extends Component {
  //local state for now
  state = {
    drug1: '',
    drug2: '',
    drugSuggestions: [],
    interactions: [],
    ageOptions: [
      '0-1',
      '2-9',
      '10-19',
      '20-29',
      '30-39',
      '40-49',
      '50-59',
      '60+'
    ],
    age: '',
    genderOptions: ['male', 'female'],
    sex: '',
    savedSearches: []
  };

  // When the component mounts, load all saved Searches for user
  componentDidMount() {
    // will need to pass in user _id
    this.loadSearches();
  }

  // loads all saved searches for user
  loadSearches = () => {
    API.getSavedSearches()
      .then(res =>
        this.setState({ savedSearches: res.data }, () => {
          console.log('loaded searches are:', this.state.savedSearches);
        })
      )
      .catch(err => console.log(err));
  };

  handleInputSex = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleInputAge = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleInputChangeSuggestions1 = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    if (this.state.drug1) {
      API.getDrugNames({ drug1: this.state.drug1 })
        .then(res =>
          // setState includes a callback for console.log of state to see if I got the drugs
          this.setState({ drugSuggestions: res.data }, () => {
            console.log('local state is', this.state.drugSuggestions);
          })
        )
        .catch(err => console.log(err));
    }
  };

  handleInputChangeSuggestions2 = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    if (this.state.drug2) {
      API.getDrugNames({ drug2: this.state.drug2 })
        .then(res =>
          // setState includes a callback for console.log of state to see if I got the drugs
          this.setState({ drugSuggestions: res.data }, () => {
            console.log('local state is', this.state.drugSuggestions);
          })
        )
        .catch(err => console.log(err));
    }
  };

  handleFormSubmitInteraction = event => {
    event.preventDefault();
    // clear any prior interaction data from state on submit
    this.setState({
      interactions: [],
      drug1: '',
      drug2: ''
    });

    if (this.state.drug1 && this.state.drug2) {
      API.getDrugInteractions({
        drug1: this.state.drug1,
        drug2: this.state.drug2
      })
        .then(res =>
          // setState includes a callback for console.log of state to see if I got the drugs
          this.setState({ interactions: res.data }, () => {
            console.log('local interactions are', this.state.interactions);
          })
        )
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <div className="container jumbotron jBorder rxBlue">
        <div className="row">
          <div className="col-md-6">
            <h4 className="mb-3">Drug Interaction Search</h4>
            <form>
              <SelectGender
                value={this.state.sex}
                handleChangeSex={this.handleInputSex}
                name={'sex'}
                placeholder={'select sex (required)'}
                options={this.state.genderOptions}
              />
              <SelectAge
                value={this.state.age}
                handleChangeAge={this.handleInputAge}
                name={'age'}
                placeholder={'select age range (required)'}
                options={this.state.ageOptions}
              />
              <Input
                value={this.state.drug1}
                onChange={this.handleInputChangeSuggestions1}
                name="drug1"
                placeholder="drug name 1 (required)"
                list="drugs1"
              />
              <datalist id="drugs1">
                {this.state.drugSuggestions.map(drug => (
                  <option value={drug} key={drug} />
                ))}
              </datalist>
              <Input
                value={this.state.drug2}
                onChange={this.handleInputChangeSuggestions2}
                name="drug2"
                placeholder="drug name 2 (required)"
                list="drugs2"
              />
              <datalist id="drugs2">
                {this.state.drugSuggestions.map(drug => (
                  <option value={drug} key={drug} />
                ))}
              </datalist>
              <FormBtn
                disabled={!this.state.drug1 || !this.state.drug2}
                onClick={this.handleFormSubmitInteraction}
              >
                Submit Interaction Search
              </FormBtn>
            </form>
          </div>
          <div className="col-md-6 pl-3">
            <h4>Your Saved Searches </h4>
            {this.state.savedSearches.map(search => {
              return (
                <SavedSearches
                  key={search._id}
                  drug1={search.drug1}
                  drug2={search.drug2}
                  age={search.age}
                  sex={search.sex}
                />
              );
            })}
            ;
          </div>
        </div>
        <InteractionResultsB interactions_results={this.state.interactions} />
      </div>
    );
  }
}

export default InteractionSearch;
