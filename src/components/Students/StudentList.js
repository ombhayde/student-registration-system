import React from 'react';
import Button from '../Common/Button';

const StudentList = ({ students, getOfferingName, onDeleteStudent }) => {
  if (students.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">👥</div>
        <h3>No Students Registered</h3>
        <p>No students have been registered yet.</p>
      </div>
    );
  }

  return (
    <div className="student-list">
      {students.map(student => (
        <div key={student.id} className="student-card">
          <div className="student-info">
            <h4 className="student-name">
              {student.firstName} {student.lastName}
            </h4>
            <p className="student-email">✉️ {student.email}</p>
            {student.phone && <p className="student-phone">📞 {student.phone}</p>}
            <p className="student-course">
              📚 {getOfferingName(student.courseOfferingId)}
            </p>
            <small className="student-date">
              Registered: {new Date(student.registeredAt).toLocaleDateString()}
            </small>
          </div>
          <div className="student-actions">
            <Button
              variant="danger"
              size="small"
              onClick={() => onDeleteStudent(student.id)}
            >
              Remove
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentList;