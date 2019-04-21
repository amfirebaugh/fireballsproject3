import React from 'react';

export function InteractionResultsB(props) {
  // console.log('in results component....', props.interactions_results[0]);
  return (
    <div className="container rxBlue mt-5">
      <div className="row">
        <div className="col-md-12">
          <h4>Drug Interaction Results</h4>
          <br />
          <p className="lead rxBlue">
            MOST LIKELY HEALTH RISKS FOR ENTERED AGE AND SEX:
          </p>
          <p className="rxBlue">{props.interactions_results[0]}</p>
          <p className="lead rxBlue">
            <br />
            ALL POSSIBLE HEALTH RISKS FOR ENTERED AGE AND SEX:
          </p>
          <p className="rxBlue">{props.interactions_results[1]}</p>
        </div>
      </div>
    </div>
  );
}
