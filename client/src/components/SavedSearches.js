import React from 'react';

export function SavedSearches(props) {
  const { drug1, drug2, age, sex } = props;
  console.log(drug1, drug2, age, sex);
  return (
    <tr>
      <td className="p-3">{drug1}</td>
      <td className="p-3">{drug2}</td>
      <td className="p-3">{age}</td>
      <td className="p-3">{sex}</td>
    </tr>
  );
}
