import React from 'react';
// import OneResult from './OneResult';

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
    // number of side-effects returned:
    // console.log('results length: ' + props.interactions_results[0].length);
    // console.log('length /4: ' + props.interactions_results[0].length / 4);
    // console.log(
    //   'length /4 rounded: ' +
    //     Math.floor(props.interactions_results[0].length / 4)
    // );
    // // number of rows needed:
    // console.log(
    //   'length /4 rounded + 1: ' +
    //     Math.floor(props.interactions_results[0].length / 4 + 1)
    // );

    var oneResultColumn = props.interactions_results[0].map(singleResult => (
      <div className="col-md-3">
        <p className="rxBlue">{singleResult}</p>
      </div>
    ));

    return (
      <div className="container rxBlue mt-5">
        <h4>Search Results:</h4>
        <br />
        <div className="row">{oneResultColumn}</div>
      </div>
    );
  }
}
