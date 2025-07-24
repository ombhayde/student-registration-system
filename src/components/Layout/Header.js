import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">
          <span className="header-icon">🎓</span>
          Student Registration System
        </h1>
        <p className="header-subtitle">Manage courses, offerings, and student registrations</p>
      </div>
    </header>
  );
};

export default Header;