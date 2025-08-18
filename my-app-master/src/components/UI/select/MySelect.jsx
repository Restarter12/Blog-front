import React from "react";
import '../../header/header.css'
const MySelect = ({ options = [], defaultValue = "", value, onChange }) => {
  return (
    <select
      value={value}
      className='select-list'
      name="state"
      id="state"
      onChange={event => onChange(event.target.value)}
    >
      <option disabled value="">{defaultValue}</option>
      {options.map(option =>
        <option key={option.value} className='select-list-option' value={option.value}>
          {option.name}
        </option>
      )}
    </select>
  );
};

export default MySelect;