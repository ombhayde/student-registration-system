import React from 'react';

const Navigation = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'course-types', label: 'Course Types', icon: '📚' },
    { id: 'courses', label: 'Courses', icon: '📖' },
    { id: 'course-offerings', label: 'Course Offerings', icon: '🎯' },
    { id: 'student-registration', label: 'Student Registration', icon: '👥' }
  ];

  return (
    <nav className="navigation">
      <div className="nav-container">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;