import React, { Component } from 'react';

function DrugNameResults(props) {
  console.log(props);
  return (
    <div className="container jumbotron">
      <ul className="list-group search-results">
        {props.results.map(result => (
          <li key={result} className="list-group-item">
            {result}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DrugNameResults;
