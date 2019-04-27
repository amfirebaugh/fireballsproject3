import React from 'react';

/* conditions for results return:
  1. on load (no props) return null to page
  2. return physician message on a 500 error
  3. return risk data
*/

export function InteractionResultsB(props) {
  // console.log('in results component....', props.interactions_results[0]);
  if (!props.interactions_results.length) {
    return null;
  }

  if (props.interactions_results[0].length < 2) {
    return (
      <div className="container rxBlue mt-5">
        <div className="row">
          <div className="col-md-12">
            <h4>No Results Found.</h4>
            <br />
            <p className="lead rxBlue">Please consult your physician.</p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container rxBlue mt-5">
        <div className="row">
          <div className="col-md-12">
            <h4>Search Results:</h4>
            <br />
            <p className="rxBlue">{props.interactions_results[0]}</p>
          </div>
        </div>
      </div>
    );
  }
}
