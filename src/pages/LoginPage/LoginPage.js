import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../features/auth/authSlice';
import './LoginPage.scss';
// 1. Import our new validators
import { validateEmail, validatePassword } from '../../utils/validators';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // 2. Add state to hold validation errors
  const [errors, setErrors] = useState({});
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { isLoading, error: apiError, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // 3. Create a validation handler
  const handleValidation = () => {
    const tempErrors = {};
    tempErrors.email = validateEmail(email);
    tempErrors.password = validatePassword(password); // Will check "required" and "length"
    
    setErrors(tempErrors);
    
    // Return true if all error values are null, false otherwise
    return Object.values(tempErrors).every(err => !err);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 4. Validate first!
    if (handleValidation()) {
      // Only dispatch if validation passes
      dispatch(loginUser({ email, password }));
    }
  };

  return (
    <div className="auth-container">
      {/* ... (auth-promo-panel) ... */}      
      <div className="auth-promo-panel">
        <div className="promo-content">
          <h2>Welcome Back</h2>
          <p>Login to continue your journey and explore our world.</p>
        </div>
      </div>

      <div className="auth-form-panel">
        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <h2>Login</h2>
          
          {/* 5. Show API error OR client errors */}
          {apiError && <div className="error-message">{apiError}</div>}
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g., user@test.com"
            />
            {/* 6. Show inline validation error */}
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="e.g., password123"
            />
            {/* 7. Show inline validation error */}
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>
          
          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
          
          <p className="auth-switch">
            No account? <Link to="/signup">Sign Up</Link>
          </p>
          <p className="mock-info">
            (Use <strong>owner@test.com</strong> & <strong>password123</strong>)
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;