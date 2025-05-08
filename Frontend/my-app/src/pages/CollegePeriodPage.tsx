import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import CollegePeriodTable from '../components/CollegePeriod/CollegePeriodTable';
import CollegePeriodForm from '../components/CollegePeriod/CollegePeriodForm';
import { createCollegePeriod, updateCollegePeriod } from '../services/ColleagePeriodService';

interface CollegePeriodData {
  name: string;
  shortName: string;
  startDate: string;
  endDate: string;
  restingDays: string[];
}

const CollegePeriodsPage: React.FC = () => {
    console.log('CollegePeriodsPage component rendered');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<(CollegePeriodData & { id?: number }) | null>(null);

  const handleCreate = () => {
    setEditing(null);
    setOpen(true);
  };

  const handleEdit = (data: CollegePeriodData & { id: number }) => {
    setEditing(data);
    setOpen(true);
  };

  const handleSubmit = async (data: CollegePeriodData) => {
    if (editing && editing.id !== undefined) await updateCollegePeriod(editing.id, data);
    else await createCollegePeriod(data);
    window.location.reload();
  };

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom sx={{ mb: 2}}>College Periods</Typography>
      <Button variant="contained" onClick={handleCreate} sx={{ mb: 2 }}>+ Create College Period</Button>
      <CollegePeriodTable onEdit={handleEdit} />
      <CollegePeriodForm open={open} onClose={() => setOpen(false)} onSubmit={handleSubmit} initialData={editing || undefined} />
    </Box>
  );
};

export default CollegePeriodsPage;

