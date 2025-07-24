import React from 'react';
import Button from '../Common/Button';

const CourseItem = ({ course, onEdit, onDelete }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{course.name}</h3>
        <div className="card-actions">
          <Button
            variant="outline"
            size="small"
            onClick={() => onEdit(course)}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            size="small"
            onClick={() => onDelete(course.id)}
          >
            Delete
          </Button>
        </div>
      </div>
      <div className="card-body">
        {course.description && <p className="card-description">{course.description}</p>}
        <div className="card-meta">
          {course.duration && <span className="meta-item">📅 {course.duration}</span>}
          {course.level && <span className="meta-item">📊 {course.level}</span>}
        </div>
      </div>
      <div className="card-footer">
        <small className="text-muted">
          Created: {new Date(course.createdAt).toLocaleDateString()}
        </small>
      </div>
    </div>
  );
};

export default CourseItem;