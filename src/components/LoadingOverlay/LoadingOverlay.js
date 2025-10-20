import React from 'react';
import Spinner from '../Spinner/Spinner';
import './LoadingOverlay.scss';

const LoadingOverlay = ({ text = 'Loading...' }) => {
  return (
    <div className="loading-overlay">
      <Spinner size="80px" text={text} />
    </div>
  );
};

export default LoadingOverlay;