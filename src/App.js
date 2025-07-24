import React, { useState } from 'react';
import Layout from './components/Layout/Layout';
import CourseTypeList from './components/CourseTypes/CourseTypeList';
import CourseList from './components/Courses/CourseList';
import CourseOfferingList from './components/CourseOfferings/CourseOfferingList';
import StudentRegistration from './components/Students/StudentRegistration';
import './styles/main.css';
import './styles/components.css';
import './styles/responsive.css';

function App() {
  const [activeTab, setActiveTab] = useState('course-types');

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'course-types':
        return <CourseTypeList />;
      case 'courses':
        return <CourseList />;
      case 'course-offerings':
        return <CourseOfferingList />;
      case 'student-registration':
        return <StudentRegistration />;
      default:
        return <CourseTypeList />;
    }
  };

  return (
    <div className="App">
      <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
        {renderActiveComponent()}
      </Layout>
    </div>
  );
}

export default App;