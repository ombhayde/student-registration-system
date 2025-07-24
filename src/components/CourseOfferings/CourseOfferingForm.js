import React, { useState, useEffect } from 'react';
import FormInput from '../Common/FormInput';
import Button from '../Common/Button';
import { validateRequired } from '../../utils/helpers';

const CourseOfferingForm = ({ offering, courses, courseTypes, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    courseId: '',
    courseTypeId: '',
    schedule: '',
    instructor: '',
    capacity: '',
    price: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (offering) {
      setFormData({
        courseId: offering.courseId || '',
        courseTypeId: offering.courseTypeId || '',
        schedule: offering.schedule || '',
        instructor: offering.instructor || '',
        capacity: offering.capacity || '',
        price: offering.price || ''
      });
    }
  }, [offering]);

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
    
    if (!formData.courseId) {
      newErrors.courseId = 'Please select a course';
    }
    
    if (!formData.courseTypeId) {
      newErrors.courseTypeId = 'Please select a course type';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label className="form-label">Course <span className="required">*</span></label>
        <select
          name="courseId"
          value={formData.courseId}
          onChange={handleChange}
          className={`form-input ${errors.courseId ? 'error' : ''}`}
          required
        >
          <option value="">Select a course</option>
          {courses.map(course => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>
        {errors.courseId && <span className="error-message">{errors.courseId}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">Course Type <span className="required">*</span></label>
        <select
          name="courseTypeId"
          value={formData.courseTypeId}
          onChange={handleChange}
          className={`form-input ${errors.courseTypeId ? 'error' : ''}`}
          required
        >
          <option value="">Select a course type</option>
          {courseTypes.map(courseType => (
            <option key={courseType.id} value={courseType.id}>
              {courseType.name}
            </option>
          ))}
        </select>
        {errors.courseTypeId && <span className="error-message">{errors.courseTypeId}</span>}
      </div>
      
      <FormInput
        label="Schedule"
        name="schedule"
        value={formData.schedule}
        onChange={handleChange}
        placeholder="e.g., Mon-Wed-Fri 10:00 AM"
      />

      <FormInput
        label="Instructor"
        name="instructor"
        value={formData.instructor}
        onChange={handleChange}
        placeholder="Instructor name"
      />

      <FormInput
        label="Capacity"
        name="capacity"
        type="number"
        value={formData.capacity}
        onChange={handleChange}
        placeholder="Maximum number of students"
      />

      <FormInput
        label="Price"
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        placeholder="Course price"
      />

      <div className="form-actions">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {offering ? 'Update' : 'Create'}
        </Button>
      </div>
    </form>
  );
};

export default CourseOfferingForm;