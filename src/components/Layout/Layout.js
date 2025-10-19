import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Layout.scss';

const Layout = ({ children }) => {
  // Use a hook to get the current theme from the Redux store
  const theme = useSelector((state) => state.theme.mode);

  return (
    // Apply the theme class to the whole layout
    <div className={`layout ${theme}`}>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;