import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import LandingPage from './pages/LandingPage/LandingPage';

// You can add other pages here later
// import AboutPage from './pages/AboutPage/AboutPage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/about" element={<AboutPage />} /> */}
      </Routes>
    </Layout>
  );
}

export default App;