import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/FeatureCard.scss';

const FeatureCard = ({ icon, title, text }) => {
  return (
    <div className="feature-card clay-card">
      <div className="feature-card__icon">
        <FontAwesomeIcon icon={icon} />
      </div>
      <h3 className="feature-card__title">{title}</h3>
      <p className="feature-card__text">{text}</p>
    </div>
  );
};

export default FeatureCard;