import React, { Component } from 'react';
import API from '../utils/ApiCalls';
import { Input, FormBtn } from './Form';
import DrugNameResults from './DrugNameResults';

class NewSearch extends Component {
  //local state for now
  state = {
    drugname: '',
    drugs: []
  };

  // this works
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    if (this.state.drugname) {
      API.getDrugNames({ drugname: this.state.drugname })
        .then(res =>
          // setState includes a callback for console.log of state to see if I got the drugs
          this.setState({ drugs: res.data }, () => {
            console.log('local state is', this.state.drugs);
          })
        )
        .catch(err => console.log(err));
    }
  };

  handleFormSubmit = event => {
    event.preventDefault();
    // I need to reset the form value submit
  };

  render() {
    return (
      <div className="container jumbotron">
        <div className="row">
          <div className="col-md-12">
            <h3 className="mb-3 text-success">Drug Name Search</h3>
            <form>
              <Input
                value={this.state.drugname}
                onChange={this.handleInputChange}
                name="drugname"
                placeholder="drug name (required)"
                list="drugs"
              />
              <datalist id="drugs">
                {this.state.drugs.map(drug => (
                  <option value={drug} key={drug} />
                ))}
              </datalist>
              <FormBtn
                disabled={!this.state.drugname}
                onClick={this.handleFormSubmit}
              >
                Submit Drug Search
              </FormBtn>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default NewSearch;
