import React, { useState, useEffect } from 'react';
import { Button, Paper, Box, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { fetchCourses, createCourse, updateCourse, deleteCourse } from '../../../services/CirrculumService';
import CourseCard from './CourseModal';
import CourseForm from './CourseForm';
import { fetchLevels, fetchPrograms } from '../../../services/CirrculumService';
import type { Course, Level, Program } from '../../../types';

const CourseSection: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);
  
  // State for delete confirmation dialog
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);

  const loadCourses = async () => {
    const courseData = await fetchCourses();
    setCourses(courseData);
  };

  const loadProgramsAndLevels = async () => {
    const programData = await fetchPrograms();
    const levelData = await fetchLevels();
    setPrograms(programData);
    setLevels(levelData);
  };

  useEffect(() => {
    loadCourses();
    loadProgramsAndLevels();
  }, []);

  const openCreateModal = () => {
    // Ensure selectedCourse is set to null when opening create modal
    setSelectedCourse(null);
    setOpenModal(true);
  };

  const openEditModal = (course: Course) => {
    setSelectedCourse(course);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    // Reset selectedCourse to null when closing the modal
    setSelectedCourse(null);
  };

  const handleCourseSubmit = async (courseData: any, id?: number) => {
    if (id) {
      const updatedCourse = await updateCourse(id, courseData);
      setCourses((prev) =>
        prev.map((course) => (course.id === updatedCourse.id ? updatedCourse : course))
      );
    } else {
      const createdCourse = await createCourse(courseData);
      setCourses((prev) => [...prev, createdCourse]);
    }
    handleCloseModal();
  };

  const handleDeleteCourse = async (course: Course) => {
    await deleteCourse(course.id);
    setCourses((prev) => prev.filter((c) => c.id !== course.id));
    setDeleteConfirm(false); // Close the dialog after deletion
  };

  // Handle open delete confirmation
  const openDeleteConfirm = (course: Course) => {
    setCourseToDelete(course);
    setDeleteConfirm(true);
  };

  // Handle close of delete confirmation dialog
  const handleCloseDeleteConfirm = () => {
    setDeleteConfirm(false);
    setCourseToDelete(null);
  };

  return (
    <Box>
      <Button variant="contained" onClick={openCreateModal} sx={{ mb: 3 }}>
        + Create Course
      </Button>
      <Paper elevation={3} sx={{ p: 2 }}>
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onEdit={openEditModal}
            onDelete={() => openDeleteConfirm(course)} // Trigger delete confirmation
          />
        ))}
      </Paper>

      <CourseForm
        open={openModal}
        onClose={handleCloseModal}
        onSubmit={handleCourseSubmit}
        course={selectedCourse}
        programs={programs}
        levels={levels}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirm} onClose={handleCloseDeleteConfirm}>
        <DialogTitle>Delete Course</DialogTitle>
        <DialogContent>
          Are you sure you want to delete <strong>{courseToDelete?.name}</strong>?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirm}>Cancel</Button>
          <Button color="error" onClick={() => handleDeleteCourse(courseToDelete!)}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CourseSection;
