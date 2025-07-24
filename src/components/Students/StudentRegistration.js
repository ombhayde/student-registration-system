import React, { useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import StudentList from './StudentList';
import FormInput from '../Common/FormInput';
import Button from '../Common/Button';
import { generateId, validateEmail, validateRequired } from '../../utils/helpers';

const StudentRegistration = () => {
  const [students, setStudents] = useLocalStorage('students', []);
  const [courseOfferings] = useLocalStorage('courseOfferings', []);
  const [courses] = useLocalStorage('courses', []);
  const [courseTypes] = useLocalStorage('courseTypes', []);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    courseOfferingId: ''
  });
  const [errors, setErrors] = useState({});
  const [selectedOfferingId, setSelectedOfferingId] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!validateRequired(formData.firstName)) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!validateRequired(formData.lastName)) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!validateRequired(formData.email)) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.courseOfferingId) {
      newErrors.courseOfferingId = 'Please select a course offering';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const newStudent = {
        id: generateId(),
        ...formData,
        registeredAt: new Date().toISOString()
      };
      setStudents([...students, newStudent]);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        courseOfferingId: ''
      });
      alert('Student registered successfully!');
    }
  };

  const getOfferingName = (offeringId) => {
    const offering = courseOfferings.find(o => o.id === offeringId);
    if (!offering) return 'Unknown Offering';
    
    const course = courses.find(c => c.id === offering.courseId);
    const courseType = courseTypes.find(ct => ct.id === offering.courseTypeId);
    
    return `${courseType?.name || 'Unknown'} - ${course?.name || 'Unknown'}`;
  };

  const getStudentsForOffering = (offeringId) => {
    return students.filter(student => student.courseOfferingId === offeringId);
  };

  return (
    <div className="section">
      <h2 className="section-title">Student Registration</h2>
      
      {courseOfferings.length === 0 ? (
        <div className="alert alert-warning">
          <h4>No Course Offerings Available</h4>
          <p>Please create course offerings before registering students.</p>
        </div>
      ) : (
        <div className="registration-container">
          <div className="registration-form">
            <h3>Register New Student</h3>
            <form onSubmit={handleSubmit} className="form">
              <div className="form-row">
                <FormInput
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  error={errors.firstName}
                  required
                  placeholder="Enter first name"
                />
                <FormInput
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={errors.lastName}
                  required
                  placeholder="Enter last name"
                />
              </div>

              <FormInput
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                required
                placeholder="Enter email address"
              />

              <FormInput
                label="Phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />

              <div className="form-group">
                <label className="form-label">Course Offering <span className="required">*</span></label>
                <select
                  name="courseOfferingId"
                  value={formData.courseOfferingId}
                  onChange={handleChange}
                  className={`form-input ${errors.courseOfferingId ? 'error' : ''}`}
                  required
                >
                  <option value="">Select a course offering</option>
                  {courseOfferings.map(offering => (
                    <option key={offering.id} value={offering.id}>
                      {getOfferingName(offering.id)}
                      {offering.schedule && ` - ${offering.schedule}`}
                      {offering.price && ` - $${offering.price}`}
                    </option>
                  ))}
                </select>
                {errors.courseOfferingId && <span className="error-message">{errors.courseOfferingId}</span>}
              </div>

              <Button type="submit" className="full-width">
                Register Student
              </Button>
            </form>
          </div>

          <div className="student-lists">
            <h3>Registered Students</h3>
            <div className="form-group">
              <label className="form-label">View students for:</label>
              <select
                value={selectedOfferingId}
                onChange={(e) => setSelectedOfferingId(e.target.value)}
                className="form-input"
              >
                <option value="">All Course Offerings</option>
                {courseOfferings.map(offering => (
                  <option key={offering.id} value={offering.id}>
                    {getOfferingName(offering.id)}
                  </option>
                ))}
              </select>
            </div>

            <StudentList
              students={selectedOfferingId ? getStudentsForOffering(selectedOfferingId) : students}
              getOfferingName={getOfferingName}
              onDeleteStudent={(studentId) => {
                if (window.confirm('Are you sure you want to delete this student registration?')) {
                  setStudents(students.filter(s => s.id !== studentId));
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentRegistration;