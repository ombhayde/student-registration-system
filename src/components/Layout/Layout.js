import React from 'react';
import Header from './Header';
import Navigation from './Navigation';

const Layout = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="layout">
      <Header />
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="main-content">
        <div className="container">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;