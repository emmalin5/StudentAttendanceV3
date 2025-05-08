// src/components/Curriculum/Course/CourseCard.tsx
import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import type { Course } from '../../../types';

interface CourseCardProps {
  course: Course;
  onEdit: (course: Course) => void;
  onDelete: (course: Course) => void;
}

const CourseModal: React.FC<CourseCardProps> = ({ course, onEdit, onDelete }) => {
  return (
    <Box
      borderBottom={1}
      borderColor="divider"
      mb={2}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Typography variant="subtitle1">{course.name}</Typography>
      <Box>
        <Button size="small" onClick={() => onEdit(course)}>
          <EditIcon fontSize="small" /> Edit
        </Button>
        <Button size="small" color="error" onClick={() => onDelete(course)}>
          <DeleteIcon fontSize="small" /> Delete
        </Button>
      </Box>
    </Box>
  );
};

export default CourseModal;
