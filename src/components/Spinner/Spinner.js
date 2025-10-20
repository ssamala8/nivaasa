import React from 'react';
import './Spinner.scss';

/**
 * A modern, reusable "Chromatic Orbit" spinner.
 * @param {string} size - Optional: The size of the spinner (e.g., '50px').
 * @param {string} text - Optional: Text to display below the spinner.
 */
const Spinner = ({ size, text }) => {
  const spinnerStyle = size ? { '--spinner-size': size } : {};

  return (
    <div className="spinner-container">
      <div className="chromatic-spinner" style={spinnerStyle}></div>
      {text && <p className="spinner-text">{text}</p>}
    </div>
  );
};

export default Spinner;