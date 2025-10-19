import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../features/theme/themeSlice';
import { logout } from '../../features/auth/authSlice'; // 1. Import logout
import './Header.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // 2. Get auth state from Redux
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const theme = useSelector((state) => state.theme.mode);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };
  
  const handleLogout = () => {
    dispatch(logout());
    setIsMenuOpen(false); // Close menu on logout
  };

  const themeIcon = theme === 'light' ? faMoon : faSun;
  
  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="app-header">
      <Link to="/" className="logo">
        Nivaasa
      </Link>

      <div className={`app-header__links ${isMenuOpen ? 'app-header__links--open' : ''}`}>
        <nav>
          <Link to="/" onClick={closeMenu}>Home</Link>
          {/* 3. Conditional Links */}
          {isAuthenticated ? (
            <>
              <span className="welcome-user">Hi, {user.name}</span>
              <a href="#!" onClick={handleLogout} className="logout-link">Logout</a>
            </>
          ) : (
            <>
              <Link to="/login" onClick={closeMenu}>Login</Link>
              <Link to="/signup" onClick={closeMenu}>Sign Up</Link>
            </>
          )}
        </nav>

        <button onClick={handleThemeToggle} className="theme-toggle">
          <FontAwesomeIcon icon={themeIcon} />
        </button>
      </div>

      <button className="mobile-toggle" onClick={toggleMobileMenu}>
        <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
      </button>
    </header>
  );
};

export default Header;