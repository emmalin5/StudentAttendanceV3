import React, { useState, useEffect } from 'react';
import { TextField, Select, MenuItem, InputLabel, FormControl, Box } from '@mui/material';
import ModalWrapper from '../ModalWrapper';

interface CollegePeriodFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CollegePeriodData) => void;
  initialData?: CollegePeriodData & { id?: number };
}

interface CollegePeriodData {
  name: string;
  shortName: string;
  startDate: string;
  endDate: string;
  restingDays: string[];
}

const CollegePeriodForm: React.FC<CollegePeriodFormProps> = ({ open, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState<CollegePeriodData>({
    name: '',
    shortName: '',
    startDate: '',
    endDate: '',
    restingDays: [],
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRestingChange = (e: any) => {
    setFormData({ ...formData, restingDays: e.target.value });
  };

  const handleSave = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <ModalWrapper title={initialData ? 'Edit' : 'Create College Period'} open={open} onClose={onClose} onSave={handleSave}>
      <TextField label="Name" name="name" value={formData.name} onChange={handleChange} fullWidth margin="normal" />
      <TextField label="Short Name" name="shortName" value={formData.shortName} onChange={handleChange} fullWidth margin="normal" />
      <TextField label="Start Date" name="startDate" type="date" value={formData.startDate} onChange={handleChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
      <TextField label="End Date" name="endDate" type="date" value={formData.endDate} onChange={handleChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
      
      {/* Fix for Resting Days select dropdown */}
      <FormControl fullWidth margin="normal">
        <InputLabel id="resting-days-label">Resting Days</InputLabel>
        <Select
          labelId="resting-days-label"
          multiple
          value={formData.restingDays}
          onChange={handleRestingChange}
          label="Resting Days"
          renderValue={(selected) => selected.join(', ')} // Show selected days as text
        >
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
            <MenuItem key={day} value={day}>
              {day}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </ModalWrapper>
  );
};

export default CollegePeriodForm;
