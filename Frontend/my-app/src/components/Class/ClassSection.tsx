// src/components/Curriculum/Class/ClassSection.tsx
import React, { useEffect, useState } from 'react';
import { Button, Typography, Stack, Paper } from '@mui/material';
import { getClasses, createClass, updateClass, deleteClass } from '../../services/ClassService';
import ClassForm from './ClassForm';
import ClassTable from './ClassTable';
import type { UniversityClass } from '../../types';

const ClassSection: React.FC = () => {
  const [classes, setClasses] = useState<UniversityClass[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedClass, setSelectedClass] = useState<UniversityClass | undefined>(undefined);

  const fetchClasses = async () => {
    const data = await getClasses();
    setClasses(data);
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleFormSubmit = async (data: Omit<UniversityClass, 'id'>, id?: string) => {
    if (id) {
      await updateClass({ ...data, id });
    } else {
      await createClass({ ...data, id: Date.now().toString() });
    }
    fetchClasses();
    setOpenForm(false);
  };

  const handleDelete = async (id: string) => {
    await deleteClass(id);
    fetchClasses();
  };

  const handleEdit = (cls: UniversityClass) => {
    setSelectedClass(cls);
    setOpenForm(true);
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">University Classes</Typography>
        <Button variant="contained" color="primary" onClick={() => { setSelectedClass(undefined); setOpenForm(true); }}>
          Add Class
        </Button>
      </Stack>

      <ClassTable
        classes={classes}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ClassForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={handleFormSubmit}
        universityClass={selectedClass}
      />
    </Paper>
  );
};

export default ClassSection;
