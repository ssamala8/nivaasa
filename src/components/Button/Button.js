import React from 'react';
import './Button.scss';

/**
 * Reusable Button Component
 * @param {string} variant - 'primary', 'secondary', or 'danger'
 * @param {boolean} disabled - Is the button disabled
 * @param {string} type - 'button', 'submit'
 * @param {function} onClick - Click handler
 */
const Button = ({ children, onClick, variant = 'primary', type = 'button', disabled = false }) => {
  return (
    <button
      type={type}
      className={`btn btn--${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;