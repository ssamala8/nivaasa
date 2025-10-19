import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="app-footer">
      <p>&copy; {new Date().getFullYear()} Large Scale Project. All rights reserved.</p>
    </footer>
  );
};

export default Footer;