import React, { useState, useEffect } from 'react';
import FormInput from '../Common/FormInput';
import Button from '../Common/Button';
import { validateRequired } from '../../utils/helpers';

const CourseTypeForm = ({ courseType, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (courseType) {
      setFormData({
        name: courseType.name || '',
        description: courseType.description || ''
      });
    }
  }, [courseType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
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
      newErrors.name = 'Course type name is required';
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
        label="Course Type Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        required
        placeholder="e.g., Individual, Group, Special"
      />
      
      <FormInput
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        error={errors.description}
        placeholder="Brief description of this course type"
      />

      <div className="form-actions">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {courseType ? 'Update' : 'Create'}
        </Button>
      </div>
    </form>
  );
};

export default CourseTypeForm;