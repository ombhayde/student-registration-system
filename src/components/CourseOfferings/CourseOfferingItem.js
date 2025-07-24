import React from 'react';
import Button from '../Common/Button';

const CourseOfferingItem = ({ offering, courseName, courseTypeName, onEdit, onDelete }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{courseTypeName} - {courseName}</h3>
        <div className="card-actions">
          <Button
            variant="outline"
            size="small"
            onClick={() => onEdit(offering)}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            size="small"
            onClick={() => onDelete(offering.id)}
          >
            Delete
          </Button>
        </div>
      </div>
      <div className="card-body">
        <div className="card-meta">
          {offering.schedule && <span className="meta-item">📅 {offering.schedule}</span>}
          {offering.instructor && <span className="meta-item">👨‍🏫 {offering.instructor}</span>}
          {offering.capacity && <span className="meta-item">👥 {offering.capacity} students</span>}
          {offering.price && <span className="meta-item">💰 ${offering.price}</span>}
        </div>
      </div>
      <div className="card-footer">
        <small className="text-muted">
          Created: {new Date(offering.createdAt).toLocaleDateString()}
        </small>
      </div>
    </div>
  );
};

export default CourseOfferingItem;