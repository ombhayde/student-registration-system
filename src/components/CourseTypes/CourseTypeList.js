import React, { useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import CourseTypeForm from './CourseTypeForm';
import CourseTypeItem from './CourseTypeItem';
import Modal from '../Common/Modal';
import Button from '../Common/Button';
import { generateId } from '../../utils/helpers';

const CourseTypeList = () => {
  const [courseTypes, setCourseTypes] = useLocalStorage('courseTypes', []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourseType, setEditingCourseType] = useState(null);

  const handleCreate = (courseTypeData) => {
    const newCourseType = {
      id: generateId(),
      ...courseTypeData,
      createdAt: new Date().toISOString()
    };
    setCourseTypes([...courseTypes, newCourseType]);
    setIsModalOpen(false);
  };

  const handleUpdate = (courseTypeData) => {
    setCourseTypes(courseTypes.map(ct => 
      ct.id === editingCourseType.id 
        ? { ...ct, ...courseTypeData, updatedAt: new Date().toISOString() }
        : ct
    ));
    setEditingCourseType(null);
    setIsModalOpen(false);
  };

  const handleEdit = (courseType) => {
    setEditingCourseType(courseType);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this course type?')) {
      setCourseTypes(courseTypes.filter(ct => ct.id !== id));
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCourseType(null);
  };

  return (
    <div className="section">
      <div className="section-header">
        <h2 className="section-title">Course Types</h2>
        <Button onClick={() => setIsModalOpen(true)}>
          + Add Course Type
        </Button>
      </div>

      <div className="content-grid">
        {courseTypes.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📚</div>
            <h3>No Course Types Yet</h3>
            <p>Create your first course type to get started.</p>
            <Button onClick={() => setIsModalOpen(true)}>
              Create Course Type
            </Button>
          </div>
        ) : (
          courseTypes.map(courseType => (
            <CourseTypeItem
              key={courseType.id}
              courseType={courseType}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingCourseType ? 'Edit Course Type' : 'Create Course Type'}
      >
        <CourseTypeForm
          courseType={editingCourseType}
          onSubmit={editingCourseType ? handleUpdate : handleCreate}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

export default CourseTypeList;