// src/pages/LandingPage/LandingPage.js

import React, { useState } from 'react';
import './LandingPage.scss';

const LandingPage = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="landing-page">
      <h1>Welcome to Nivaasa</h1>
      <p>This is the landing page. We are using React, SASS, Hooks, and Redux.</p>
      
      {/* Change this class name */}
      <div className="counter clay-card">
        <h3>Example Hook (useState):</h3>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
      </div>

      {/* And change this class name */}
      <div className="info-box clay-card">
        <h3>Project Features:</h3>
        <ul>
          <li>Scalable file structure</li>
          <li>Global SASS variables and styles</li>
          <li>Reusable Header, Footer, and Layout components</li>
          <li>Redux Toolkit for state management (like the theme toggle)</li>
          <li>React Router for page navigation</li>
        </ul>
      </div>
    </div>
  );
};

export default LandingPage;