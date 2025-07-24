import React, { useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import CourseForm from './CourseForm';
import CourseItem from './CourseItem';
import Modal from '../Common/Modal';
import Button from '../Common/Button';
import { generateId } from '../../utils/helpers';

const CourseList = () => {
  const [courses, setCourses] = useLocalStorage('courses', []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const handleCreate = (courseData) => {
    const newCourse = {
      id: generateId(),
      ...courseData,
      createdAt: new Date().toISOString()
    };
    setCourses([...courses, newCourse]);
    setIsModalOpen(false);
  };

  const handleUpdate = (courseData) => {
    setCourses(courses.map(course => 
      course.id === editingCourse.id 
        ? { ...course, ...courseData, updatedAt: new Date().toISOString() }
        : course
    ));
    setEditingCourse(null);
    setIsModalOpen(false);
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter(course => course.id !== id));
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCourse(null);
  };

  return (
    <div className="section">
      <div className="section-header">
        <h2 className="section-title">Courses</h2>
        <Button onClick={() => setIsModalOpen(true)}>
          + Add Course
        </Button>
      </div>

      <div className="content-grid">
        {courses.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📖</div>
            <h3>No Courses Yet</h3>
            <p>Create your first course to get started.</p>
            <Button onClick={() => setIsModalOpen(true)}>
              Create Course
            </Button>
          </div>
        ) : (
          courses.map(course => (
            <CourseItem
              key={course.id}
              course={course}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingCourse ? 'Edit Course' : 'Create Course'}
      >
        <CourseForm
          course={editingCourse}
          onSubmit={editingCourse ? handleUpdate : handleCreate}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

export default CourseList;