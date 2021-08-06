import React from 'react';
import PropTypes from 'prop-types';
import style from './Filter.module.css';

const Filter = ({ value, onChange }) => {
  return (
    <label className={style.Label}>
      <p className={style.LabelText}>Filter:</p>{' '}
      <input
        type="text"
        value={value}
        onChange={({ target: { value } }) => onChange(value)}
        className={style.Input}
      ></input>
    </label>
  );
};

Filter.propType = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
