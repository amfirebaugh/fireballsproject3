import React from 'react';

const OneResult = props => {
  return (
    <div className="container rxBlue mt-5">
      <div className="row">
        <div className="col-md-12">
          <h4>Search Results:</h4>
          <br />
          <p className="rxBlue"> {props.interactions_results[0]}</p>
        </div>
      </div>
    </div>
  );
};

export default OneResult;
