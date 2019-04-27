import React, { Component } from 'react';
import API from '../utils/ApiCalls';
import { Input, FormBtn, SelectGender, SelectAge } from './FormInteractions';
import { InteractionResultsB } from '../components/InteractionResultsB';
import { SavedSearches } from './SavedSearches';

class InteractionSearch extends Component {
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
    //console.log('sub is', this.props);
    this.loadSearches();
  }

  ///// function to run searches from saved search UI component /////
  searchFromTable = (drug1, drug2, age, sex) => {
    console.log('hello test function', drug1, drug2, age, sex);
    API.getDrugInteractions({
      // send drugs aga and sex into interaction query.
      // wil not be interaction with DB so sub = 'table' and not user's authId
      drug1: drug1,
      drug2: drug2,
      age: age,
      sex: sex,
      sub: 'table'
    })
      .then(res =>
        // setState includes a callback for console.log of state to see if I got the drugs
        this.setState({ interactions: res.data }, () => {
          console.log('local interactions are', this.state.interactions);
          this.loadSearches();
        })
      )
      .catch(err => console.log(err));
  };

  ///// loads all saved searches for user from MongoDB /////
  loadSearches = () => {
    // pass in user 'sub' into loadSearches to get searches for authenticated user
    API.getSavedSearches(this.props)
      .then(res =>
        this.setState({ savedSearches: res.data }, () => {
          // need to deal with a blank object for new users with no saved searches
          console.log('loaded searches are:', this.state.savedSearches);
        })
      )
      .catch(err => console.log('no searches returned', err));
  };

  ///// form input handler
  handleInputSex = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  ///// form input handler
  handleInputAge = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  ///// form input handler - drug suggestion1
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

  ///// form input handler - drug suggeston2
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

  ///// form submission action for new drug interaction search
  handleFormSubmitInteraction = event => {
    event.preventDefault();
    // clear any prior interaction data from state on submit
    this.setState({
      interactions: [],
      drug1: '',
      drug2: ''
    });

    // Note: all search field are required for interaction search
    if (
      this.state.drug1 &&
      this.state.drug2 &&
      this.state.age &&
      this.state.sex
    ) {
      API.getDrugInteractions({
        // send drugs aga and sex into interaction query.  Must include users 'sub' ID which is user's authId
        drug1: this.state.drug1.toLowerCase(),
        drug2: this.state.drug2.toLowerCase(),
        age: this.state.age,
        sex: this.state.sex,
        sub: this.props.sub
      })
        .then(res =>
          // setState includes a callback for console.log of state to see if I got the drugs
          this.setState({ interactions: res.data }, () => {
            console.log('local interactions are', this.state.interactions);
            // reload saved searches, refresh table in UI
            this.loadSearches();
          })
        )
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <div className="container jumbotron jBorder rxBlue">
        <div className="row">
          <div className="col-md-4">
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
                disabled={
                  !this.state.drug1 ||
                  !this.state.drug2 ||
                  !this.state.sex ||
                  !this.state.age
                }
                onClick={this.handleFormSubmitInteraction}
              >
                Submit Interaction Search
              </FormBtn>
            </form>
          </div>
          <div className="col-md-8 pl-2 rxBlue">
            <h4>Your Saved Searches</h4>
            {/* test for empty saved searched objects and only render if not empty, else error*/}
            {this.state.savedSearches ? (
              <table className="small table">
                <tbody>
                  <tr>
                    <th className="pl-3">
                      <i className="fas fa-prescription-bottle-alt" />
                    </th>
                    <th className="pl-1">Drug1</th>
                    <th className="pl-1">Drug2</th>
                    <th className="pl-1">Age Range</th>
                    <th className="pl-1">Sex</th>
                  </tr>
                  {/* only show the last 10 results */}
                  {this.state.savedSearches.slice(-10).map(search => {
                    return (
                      <SavedSearches
                        // added test function here
                        searchFromTable={this.searchFromTable}
                        key={search._id}
                        drug1={search.drug1}
                        drug2={search.drug2}
                        age={search.ageRange}
                        sex={search.sex}
                      />
                    );
                  })}
                </tbody>
              </table>
            ) : null}
          </div>
        </div>
        <InteractionResultsB interactions_results={this.state.interactions} />
      </div>
    );
  }
}

export default InteractionSearch;
