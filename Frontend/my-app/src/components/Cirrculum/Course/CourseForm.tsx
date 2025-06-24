// src/components/Curriculum/Course/CourseForm.tsx
import React, { useEffect, useState } from 'react';
import { TextField, MenuItem } from '@mui/material';
import ProgramModalWrapper from '../ProgramModalWrapper'; // Reusing the wrapper
import type { Course, Level, Program } from '../../../types';

interface CourseFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (courseData: any, id?: number) => void;
  course?: Course | null;
  programs: Program[];
  levels: Level[];
}

const CourseForm: React.FC<CourseFormProps> = ({
  open,
  onClose,
  onSubmit,
  course,
  programs,
  levels,
}) => {
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [teachingHoursPerWeek, setTeachingHoursPerWeek] = useState('');
  const [credits, setCredits] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');

  useEffect(() => {
    if (course) {
      setCourseName(course.name);
      setCourseCode(course.code);
      setCourseDescription(course.description || '');
      setTeachingHoursPerWeek(course.teachingHoursPerWeek.toString());
      setCredits(course.credits.toString());
      setSelectedProgram(course.programId.toString());
      setSelectedLevel(course.levelId.toString());
    }
  }, [course]);

  const handleSave = () => {
    const newCourse = {
      name: courseName,
      code: courseCode,
      description: courseDescription,
      teachingHoursPerWeek: Number(teachingHoursPerWeek),
      credits: Number(credits),
      programId: Number(selectedProgram),
      levelId: Number(selectedLevel),
    };

    onSubmit(newCourse, course?.id);
    resetForm();
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setCourseName('');
    setCourseCode('');
    setCourseDescription('');
    setTeachingHoursPerWeek('');
    setCredits('');
    setSelectedProgram('');
    setSelectedLevel('');
  };

  return (
    <ProgramModalWrapper
      title={course ? 'Edit Course' : 'Create Course'}
      open={open}
      onClose={handleCancel}
      onSubmit={handleSave}
    >
      <TextField
        label="Course Name"
        fullWidth
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Course Code"
        fullWidth
        value={courseCode}
        onChange={(e) => setCourseCode(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Description"
        fullWidth
        value={courseDescription}
        onChange={(e) => setCourseDescription(e.target.value)}
        margin="normal"
        multiline
        rows={3}
      />
      <TextField
        label="Teaching Hours Per Week"
        fullWidth
        type="number"
        value={teachingHoursPerWeek}
        onChange={(e) => setTeachingHoursPerWeek(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Credits"
        fullWidth
        type="number"
        value={credits}
        onChange={(e) => setCredits(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Program"
        fullWidth
        select
        value={selectedProgram}
        onChange={(e) => setSelectedProgram(e.target.value)}
        margin="normal"
      >
        {programs.map((program) => (
          <MenuItem key={program.id} value={program.id}>
            {program.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Level"
        fullWidth
        select
        value={selectedLevel}
        onChange={(e) => setSelectedLevel(e.target.value)}
        margin="normal"
      >
        {levels.map((level) => (
          <MenuItem key={level.id} value={level.id}>
            {level.name}
          </MenuItem>
        ))}
      </TextField>
    </ProgramModalWrapper>
  );
};

export default CourseForm;
