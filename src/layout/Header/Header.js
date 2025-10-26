import React, { useState } from 'react'; // Make sure this line is exactly correct
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../features/theme/themeSlice';
import { logout } from '../../features/auth/authSlice';
import './Header.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const theme = useSelector((state) => state.theme.mode);

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
      {/* --- Logo (Left) --- */}
      <Link to="/" className="logo">
        Nivaasa
      </Link>

      {/* --- Mobile Hamburger Button --- */}
      <button className="mobile-toggle" onClick={toggleMobileMenu}>
        <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
      </button>

      {/* --- This div wraps nav and actions --- */}
      <div className={`app-header__menu ${isMenuOpen ? 'app-header__menu--open' : ''}`}>

        {/* --- Main Navigation (Center) --- */}
        <nav className="app-header__nav">
          {/* --- Home Link REMOVED --- */}
          {/* Add back other links if needed, e.g.: */}
          {/* <Link to="/about" onClick={closeMenu}>About</Link> */}
          {/* <Link to="/contact" onClick={closeMenu}>Contact</Link> */}
        </nav>

        {/* --- Actions (Right) --- */}
        <div className="app-header__actions">
          {isAuthenticated ? (
            <>
              <span className="welcome-user">Hi, {user.name}</span>
              <a href="#!" onClick={handleLogout} className="app-header__action-link">Logout</a>
            </>
          ) : (
            <>
              <Link to="/login" onClick={closeMenu} className="app-header__action-link">Login</Link>
              <Link to="/signup" onClick={closeMenu} className="app-header__action-button btn btn--primary">Sign Up</Link>
              {/* Added btn btn--primary classes here for styling */}
            </>
          )}
          <button onClick={() => dispatch(toggleTheme())} className="theme-toggle">
            <FontAwesomeIcon icon={themeIcon} />
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;