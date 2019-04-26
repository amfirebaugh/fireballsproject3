import React from 'react';

export function SavedSearches(props) {
  const { searchFromTable, drug1, drug2, age, sex } = props;
  return (
    // onClick, pass table row values back to parent
    <tr>
      <td
        onClick={() => searchFromTable(drug1, drug2, age, sex)}
        style={{
          cursor: 'pointer'
        }}
      >
        <i className="fas fa-play-circle" />
      </td>
      <td className="pl-3">{drug1}</td>
      <td className="pl-3">{drug2}</td>
      <td className="pl-3">{age}</td>
      <td className="pl-3">{sex}</td>
    </tr>
  );
}
