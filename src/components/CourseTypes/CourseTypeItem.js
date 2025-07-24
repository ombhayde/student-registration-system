import React from 'react';
import Button from '../Common/Button';

const CourseTypeItem = ({ courseType, onEdit, onDelete }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{courseType.name}</h3>
        <div className="card-actions">
          <Button
            variant="outline"
            size="small"
            onClick={() => onEdit(courseType)}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            size="small"
            onClick={() => onDelete(courseType.id)}
          >
            Delete
          </Button>
        </div>
      </div>
      {courseType.description && (
        <div className="card-body">
          <p className="card-description">{courseType.description}</p>
        </div>
      )}
      <div className="card-footer">
        <small className="text-muted">
          Created: {new Date(courseType.createdAt).toLocaleDateString()}
        </small>
      </div>
    </div>
  );
};

export default CourseTypeItem;