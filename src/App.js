import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage'; // 1. Import Login
import SignUpPage from './pages/SignUpPage/SignUpPage'; // 2. Import Sign Up

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} /> {/* 3. Add Login Route */}
        <Route path="/signup" element={<SignUpPage />} /> {/* 4. Add Sign Up Route */}
        {/* <Route path="/about" element={<AboutPage />} /> */}
      </Routes>
    </Layout>
  );
}

export default App;