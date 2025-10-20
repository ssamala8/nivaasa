import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../Header/Header'; // <-- 1. UPDATED PATH
import Footer from '../Footer/Footer'; // <-- 2. UPDATED PATH
import './Layout.scss';

const Layout = ({ children }) => {
  const theme = useSelector((state) => state.theme.mode);

  return (
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