import React, { Component } from 'react';
import API from '../utils/ApiCalls';
import { Input, FormBtn } from '../components/Form';

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
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.drugname) {
      API.getDrugNames({ drugname: this.state.drugname })
        .then(res => this.setState({ drugs: res.data }))
        .catch(err => console.log(err));

      // data was successfully passed back and saved to local state,
      // I need to figure out how to save in state as presented by the context api
      // else I need to create a dumb component and pass the drugs [] as props
      // do I need a lifecycle event?
    }
    console.log('local state: ', this.state.drugs);
  };

  render() {
    return (
      <div className="container jumbotron">
        <div className="row">
          <div className="col-md-12">
            <form>
              <Input
                value={this.state.drugname}
                onChange={this.handleInputChange}
                name="drugname"
                placeholder="drug name (required)"
              />
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
