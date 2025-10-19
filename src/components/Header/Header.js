import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../features/theme/themeSlice';
import './Header.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// 1. Make sure you import faSun, faMoon, faBars, and faTimes
import { faSun, faMoon, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  // 2. This is the logic that was incorrect in your file.
  // It MUST be faMoon for light mode, and faSun for dark mode.
  const themeIcon = theme === 'light' ? faMoon : faSun;
  
  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="app-header">
      <Link to="/" className="logo">
        MyLogo
      </Link>

      <div className={`app-header__links ${isMenuOpen ? 'app-header__links--open' : ''}`}>
        <nav>
          {/* Clicking a link should also close the mobile menu */}
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
        </nav>

        {/* 3. This button renders the themeIcon (sun or moon) */}
        <button onClick={handleThemeToggle} className="theme-toggle">
          <FontAwesomeIcon icon={themeIcon} />
        </button>
      </div>

      {/* 4. This button renders the mobile toggle (bars or times) */}
      <button className="mobile-toggle" onClick={toggleMobileMenu}>
        <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
      </button>
    </header>
  );
};

export default Header;