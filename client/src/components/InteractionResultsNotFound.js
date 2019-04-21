import React from 'react';

export function InteractionResultsNotFound(props) {
  // console.log('in results component....', props.interactions_results[0]);
  return (
    <div className="container rxBlue mt-5">
      <div className="row">
        <div className="col-md-12">
          <h4>Drug Interaction Results Not Found</h4>
          <br />
          <p className="lead rxBlue">Please consult your physician.</p>
        </div>
      </div>
    </div>
  );
}
