import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../features/auth/authSlice';
import './LoginPage.scss'; // We'll create new styles for this

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { isLoading, error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="auth-container">
      {/* 1. The Animated Gradient Panel */}
      <div className="auth-promo-panel">
        <div className="promo-content">
          <h2>Welcome Back</h2>
          <p>Login to continue your journey and explore our world.</p>
        </div>
      </div>

      {/* 2. The Clean Form Panel */}
      <div className="auth-form-panel">
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Login</h2>
          
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g., user@test.com"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="e.g., password123"
              required
            />
          </div>
          
          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
          
          <p className="auth-switch">
            No account? <Link to="/signup">Sign Up</Link>
          </p>
          <p className="mock-info">
            (Use <strong>user@test.com</strong> & <strong>password123</strong>)
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;