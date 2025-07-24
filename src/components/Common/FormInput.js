import React from 'react';

const FormInput = ({
  label,
  type = 'text',
  value,
  onChange,
  error,
  required = false,
  placeholder = '',
  name
}) => {
  return (
    <div className="form-group">
      <label className="form-label">
        {label}
        {required && <span className="required">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`form-input ${error ? 'error' : ''}`}
        required={required}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default FormInput;