import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signUpUser } from '../../features/auth/authSlice';
import '../LoginPage/LoginPage.scss';
// 1. Import our validators
import { validateEmail, validatePassword, validateRequired } from '../../utils/validators';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // 2. Add state for errors
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
    tempErrors.name = validateRequired(name, 'Name'); // Use the generic one
    tempErrors.email = validateEmail(email);
    tempErrors.password = validatePassword(password); // Checks length 6
    
    setErrors(tempErrors);
    
    return Object.values(tempErrors).every(err => !err);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 4. Validate first!
    if (handleValidation()) {
      dispatch(signUpUser({ name, email, password }));
    }
  };

  return (
    <div className="auth-container">
      {/* ... (auth-promo-panel) ... */}
      <div className="auth-promo-panel">
        <div className="promo-content">
          <h2>Join Us</h2>
          <p>Create your account to get started on a new adventure.</p>
        </div>
      </div>
      <div className="auth-form-panel">
        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <h2>Create Account</h2>
          
          {apiError && <div className="error-message">{apiError}</div>}
          
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
            />
            {/* 5. Show inline error */}
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
            />
            {/* 6. Show inline error */}
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
            />
            {/* 7. Show inline error */}
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>
          
          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Sign Up'}
          </button>
          
          <p className="auth-switch">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;