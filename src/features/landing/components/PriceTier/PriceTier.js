import React from 'react';
import '../styles/PriceTier.scss'; 

const PriceTier = ({ title, description, buttonText }) => {
  return (
    <div className="price-tier clay-card">
      <h3 className="price-tier__title">{title}</h3>
      <p className="price-tier__description">{description}</p>
      <a href="#!" className="btn btn--primary">
        {buttonText}
      </a>
    </div>
  );
};

export default PriceTier;