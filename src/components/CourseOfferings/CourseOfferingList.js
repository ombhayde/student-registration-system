import React, { useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import CourseOfferingForm from './CourseOfferingForm';
import CourseOfferingItem from './CourseOfferingItem';
import Modal from '../Common/Modal';
import Button from '../Common/Button';
import { generateId } from '../../utils/helpers';

const CourseOfferingList = () => {
  const [courseOfferings, setCourseOfferings] = useLocalStorage('courseOfferings', []);
  const [courses] = useLocalStorage('courses', []);
  const [courseTypes] = useLocalStorage('courseTypes', []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOffering, setEditingOffering] = useState(null);
  const [filterCourseType, setFilterCourseType] = useState('');

  const handleCreate = (offeringData) => {
    const newOffering = {
      id: generateId(),
      ...offeringData,
      createdAt: new Date().toISOString()
    };
    setCourseOfferings([...courseOfferings, newOffering]);
    setIsModalOpen(false);
  };

  const handleUpdate = (offeringData) => {
    setCourseOfferings(courseOfferings.map(offering => 
      offering.id === editingOffering.id 
        ? { ...offering, ...offeringData, updatedAt: new Date().toISOString() }
        : offering
    ));
    setEditingOffering(null);
    setIsModalOpen(false);
  };

  const handleEdit = (offering) => {
    setEditingOffering(offering);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this course offering?')) {
      setCourseOfferings(courseOfferings.filter(offering => offering.id !== id));
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingOffering(null);
  };

  const filteredOfferings = filterCourseType
    ? courseOfferings.filter(offering => offering.courseTypeId === filterCourseType)
    : courseOfferings;

  const getCourseName = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    return course ? course.name : 'Unknown Course';
  };

  const getCourseTypeName = (courseTypeId) => {
    const courseType = courseTypes.find(ct => ct.id === courseTypeId);
    return courseType ? courseType.name : 'Unknown Type';
  };

  return (
    <div className="section">
      <div className="section-header">
        <h2 className="section-title">Course Offerings</h2>
        <Button 
          onClick={() => setIsModalOpen(true)}
          disabled={courses.length === 0 || courseTypes.length === 0}
        >
          + Add Course Offering
        </Button>
      </div>

      {courses.length === 0 || courseTypes.length === 0 ? (
        <div className="alert alert-warning">
          <h4>Prerequisites Missing</h4>
          <p>
            You need to create at least one course and one course type before creating course offerings.
          </p>
        </div>
      ) : (
        <>
          <div className="filters">
            <div className="form-group">
              <label className="form-label">Filter by Course Type:</label>
              <select
                value={filterCourseType}
                onChange={(e) => setFilterCourseType(e.target.value)}
                className="form-input"
              >
                <option value="">All Course Types</option>
                {courseTypes.map(courseType => (
                  <option key={courseType.id} value={courseType.id}>
                    {courseType.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="content-grid">
            {filteredOfferings.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🎯</div>
                <h3>No Course Offerings Yet</h3>
                <p>Create your first course offering by combining a course with a course type.</p>
                <Button onClick={() => setIsModalOpen(true)}>
                  Create Course Offering
                </Button>
              </div>
            ) : (
              filteredOfferings.map(offering => (
                <CourseOfferingItem
                  key={offering.id}
                  offering={offering}
                  courseName={getCourseName(offering.courseId)}
                  courseTypeName={getCourseTypeName(offering.courseTypeId)}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            )}
          </div>
        </>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingOffering ? 'Edit Course Offering' : 'Create Course Offering'}
      >
        <CourseOfferingForm
          offering={editingOffering}
          courses={courses}
          courseTypes={courseTypes}
          onSubmit={editingOffering ? handleUpdate : handleCreate}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

export default CourseOfferingList;