import React from 'react';

export function Input(props) {
  return (
    <div className="form-group">
      <input className="form-control" {...props} />
    </div>
  );
}

export function SelectGender(props) {
  return (
    <div className="form-group">
      <select
        name={props.name}
        value={props.value}
        onChange={props.handleChangeSex}
      >
        <option value="" disabled>
          {props.placeholder}
        </option>
        {props.options.map(option => {
          return (
            <option key={option} value={option} label={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export function SelectAge(props) {
  return (
    <div className="form-group">
      <select
        name={props.name}
        value={props.value}
        onChange={props.handleChangeAge}
      >
        <option value="" disabled>
          {props.placeholder}
        </option>
        {props.options.map(option => {
          return (
            <option key={option} value={option} label={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export function FormBtn(props) {
  return (
    <button
      {...props}
      style={{ float: 'right', marginBottom: 10 }}
      className="btn rxGold"
    >
      {props.children}
    </button>
  );
}
