import React, { useState } from 'react';
import './LandingPage.scss';

const LandingPage = () => {
  // Example of using a hook (useState)
  const [count, setCount] = useState(0);

  return (
    <div className="landing-page">
      <h1>Welcome to Your Nivaasa</h1>
      <p>This is the landing page. We are using React, SASS, Hooks, and Redux.</p>
      
      <div className="counter">
        <h3>Example Hook (useState):</h3>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
      </div>

      <div className="info-box">
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