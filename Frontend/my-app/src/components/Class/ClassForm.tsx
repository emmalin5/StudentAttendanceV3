import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle,
  Button, TextField, MenuItem, Select, InputLabel, FormControl, Checkbox, ListItemText
} from '@mui/material';
import type { UniversityClass } from '../../types/index';

interface ClassFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<UniversityClass, 'id'>, id?: string) => void;
  universityClass?: UniversityClass;
  initialData?: UniversityClass; 
}

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const ClassForm: React.FC<ClassFormProps> = ({ open, onClose, onSubmit, universityClass }) => {
  const [name, setName] = useState('');
  const [programId, setProgramId] = useState('');
  const [levelId, setLevelId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [collegePeriodId, setCollegePeriodId] = useState('');
  const [days, setDays] = useState<string[]>([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    if (universityClass) {
      setName(universityClass.name);
      setProgramId(universityClass.programId);
      setLevelId(universityClass.levelId);
      setCourseId(universityClass.courseId);
      setCollegePeriodId(universityClass.collegePeriodId);
      setDays(universityClass.schedule.days);
      setStartTime(universityClass.schedule.startTime);
      setEndTime(universityClass.schedule.endTime);
      setLocation(universityClass.schedule.location);
    } else {
      setName('');
      setProgramId('');
      setLevelId('');
      setCourseId('');
      setCollegePeriodId('');
      setDays([]);
      setStartTime('');
      setEndTime('');
      setLocation('');
    }
  }, [universityClass]);

  const handleSubmit = () => {
    const newClass: Omit<UniversityClass, 'id'> = {
      name,
      programId,
      levelId,
      courseId,
      collegePeriodId,
      registeredStudentIds: [],
      schedule: { days, startTime, endTime, location },
    };
    onSubmit(newClass, universityClass?.id);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{universityClass ? 'Edit Class' : 'Create Class'}</DialogTitle>
      <DialogContent>
        <TextField fullWidth label="Class Name" value={name} onChange={(e) => setName(e.target.value)} sx={{ mb: 2 }} />
        <TextField fullWidth label="Program ID" value={programId} onChange={(e) => setProgramId(e.target.value)} sx={{ mb: 2 }} />
        <TextField fullWidth label="Level ID" value={levelId} onChange={(e) => setLevelId(e.target.value)} sx={{ mb: 2 }} />
        <TextField fullWidth label="Course ID" value={courseId} onChange={(e) => setCourseId(e.target.value)} sx={{ mb: 2 }} />
        <TextField fullWidth label="College Period ID" value={collegePeriodId} onChange={(e) => setCollegePeriodId(e.target.value)} sx={{ mb: 2 }} />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Days</InputLabel>
          <Select
            multiple
            value={days}
            onChange={(e) => setDays(e.target.value as string[])}
            renderValue={(selected) => selected.join(', ')}
          >
            {weekDays.map((day) => (
              <MenuItem key={day} value={day}>
                <Checkbox checked={days.includes(day)} />
                <ListItemText primary={day} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField fullWidth label="Start Time" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} sx={{ mb: 2 }} />
        <TextField fullWidth label="End Time" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} sx={{ mb: 2 }} />
        <TextField fullWidth label="Location" value={location} onChange={(e) => setLocation(e.target.value)} sx={{ mb: 2 }} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">{universityClass ? 'Update' : 'Create'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClassForm;