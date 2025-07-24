import React, { useState, useEffect } from 'react';
import FormInput from '../Common/FormInput';
import Button from '../Common/Button';
import { validateRequired } from '../../utils/helpers';

const CourseForm = ({ course, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration: '',
    level: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (course) {
      setFormData({
        name: course.name || '',
        description: course.description || '',
        duration: course.duration || '',
        level: course.level || ''
      });
    }
  }, [course]);

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
    
    if (!validateRequired(formData.name)) {
      newErrors.name = 'Course name is required';
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
      <FormInput
        label="Course Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        required
        placeholder="e.g., Hindi, English, Urdu"
      />
      
      <FormInput
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Brief description of the course"
      />

      <FormInput
        label="Duration"
        name="duration"
        value={formData.duration}
        onChange={handleChange}
        placeholder="e.g., 3 months, 6 weeks"
      />

      <div className="form-group">
        <label className="form-label">Level</label>
        <select
          name="level"
          value={formData.level}
          onChange={handleChange}
          className="form-input"
        >
          <option value="">Select Level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      <div className="form-actions">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {course ? 'Update' : 'Create'}
        </Button>
      </div>
    </form>
  );
};

export default CourseForm;